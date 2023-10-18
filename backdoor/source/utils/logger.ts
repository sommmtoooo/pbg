import { logger } from "express-winston";
import { transports, format, createLogger } from "winston";
import { Console } from "winston/lib/winston/transports";

const { combine, timestamp, printf, prettyPrint } = format;

const timestampFormat = "hh:mm:ss.sss";

const loggingFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level.toUpperCase()} | ${message}`;
});

export default logger({
  transports: [new transports.Console()],
  format: combine(
    timestamp({
      format: timestampFormat,
    }),
    prettyPrint(),
    loggingFormat,
  ),
  meta: false,
  msg: "HTTP  ",
  expressFormat: true,
  colorize: true,
  ignoreRoute: function (req, res) {
    return false;
  },
});

export const logging = createLogger({
  transports: [new Console()],
  format: combine(
    timestamp({
      format: timestampFormat,
    }),
    prettyPrint(),
    loggingFormat,
  ),
});
