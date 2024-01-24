(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('express'), require('config'), require('cors'), require('child_process'), require('util'), require('express-async-handler'), require('path'), require('express-winston'), require('winston'), require('winston/lib/winston/transports')) :
    typeof define === 'function' && define.amd ? define(['express', 'config', 'cors', 'child_process', 'util', 'express-async-handler', 'path', 'express-winston', 'winston', 'winston/lib/winston/transports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.express, global.config, global.cors, global.child_process, global.util, global.asyncHandler, global.path, global.expressWinston, global.winston, global.transports));
})(this, (function (express, config, cors, child_process, util, asyncHandler, path, expressWinston, winston, transports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    const exec = util.promisify(child_process.exec);
    function getProcesses() {
        return __awaiter(this, void 0, void 0, function* () {
            const { stderr, stdout } = yield exec("ps -e -o comm,pid,ppid");
            if (stderr) {
                return [];
            }
            const lines = stdout.trim().split("\n");
            lines.shift();
            const programs = lines.map((line) => {
                const raw_program = line.trim().split(/\s+/);
                const program = {
                    name: raw_program[0],
                    pid: parseInt(raw_program[1]),
                    ppid: parseInt(raw_program[2]),
                };
                return program;
            });
            return programs;
        });
    }
    function getProcess(search_string) {
        return __awaiter(this, void 0, void 0, function* () {
            const processes = yield getProcesses();
            const match = processes.filter((process) => process.name.startsWith(search_string));
            return match;
        });
    }
    function killProcesses(pids) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof pids !== "object")
                throw new Error("Invalid PID");
            const range = pids.length;
            let count = 0;
            while (count != range) {
                const terminated = yield killProcess(pids[count]);
                if (!terminated)
                    throw new Error("An Error Occurred");
                count += 1;
            }
            return true;
        });
    }
    function killProcess(pid) {
        return __awaiter(this, void 0, void 0, function* () {
            const { stderr, stdout } = yield exec(`kill -9 ${pid}`);
            if (stderr) {
                throw new Error("Operation Failed");
            }
            return true;
        });
    }

    const getAllProcess = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const processes = yield getProcesses();
        const response = {
            ok: true,
            message: "",
            data: processes,
        };
        res.json(response);
    }));
    const findProcess = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { search } = req.params;
        const processes = yield getProcess(search);
        const response = {
            ok: true,
            message: "Smile",
            data: processes,
        };
        res.json(response);
    }));
    const deleteProcess = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pids } = req.body;
        yield killProcesses(pids);
        res.json({
            ok: true,
            message: "Killed Process",
        });
    }));

    const app$1 = express.Router();
    // Process Routes
    app$1.get("/process/all", getAllProcess);
    app$1.get("/process/find/:search", findProcess);
    app$1.post("/process/kill", deleteProcess);

    function errorHandler(error, req, res, next) {
        const statusCode = res.statusCode ? res.statusCode : 500;
        res.status(statusCode);
        const { message } = error;
        res.json({
            message: message ? message : "Error Occurred",
            stack: config.get("env") === "production" ? null : error.stack,
        });
    }

    function getPort() {
        if (process.argv.length == 2)
            return;
        const port__index = process.argv.indexOf("--port");
        if (port__index > -1)
            return parseInt(process.argv[port__index + 1]);
    }

    const { combine, timestamp, printf, prettyPrint } = winston.format;
    const timestampFormat = "hh:mm:ss.sss";
    const loggingFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp} | ${level.toUpperCase()} | ${message}`;
    });
    var logger = expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: combine(timestamp({
            format: timestampFormat,
        }), prettyPrint(), loggingFormat),
        meta: false,
        msg: "HTTP  ",
        expressFormat: true,
        colorize: true,
        ignoreRoute: function (req, res) {
            return false;
        },
    });
    const logging = winston.createLogger({
        transports: [new transports.Console()],
        format: combine(timestamp({
            format: timestampFormat,
        }), prettyPrint(), loggingFormat),
    });

    function openUrl(url) {
        return new Promise((resolve, reject) => {
            const command = `open ${url}`;
            child_process.exec(command, (error) => {
                if (error)
                    reject(error);
                resolve(`Opening: ${url}`);
            });
        });
    }

    const port = getPort() || config.get("port") || 8080;
    const host = config.get("host");
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(logger);
    app.use("/api", app$1);
    app.use("*", (req, res) => {
        const file = path.join(__dirname, "source/public", "index.html");
        res.sendFile(file);
    });
    app.use(errorHandler);
    app.listen(port, host, () => {
        const link = `http://${host}:${port}`;
        logging.log("info", `PBG 🔫: ${link}`);
        openUrl(link)
            .then((res) => {
            logging.log("info", `PBG 🔫: ${res}`);
        })
            .catch((err) => {
            logging.log("info", `PBG 🔫: Error Occured`);
        });
    });

}));
//# sourceMappingURL=bundle.js.map
