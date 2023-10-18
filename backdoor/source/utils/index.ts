export function getPort(): number | void {
  if (process.argv.length == 2) return;

  const port__index = process.argv.indexOf("--port");

  if (port__index > -1) return parseInt(process.argv[port__index + 1]);
}
