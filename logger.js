import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const log4js = require("log4js");

log4js.configure({
  appenders: {
    error: { type: "file", filename: "log/rooms_error.log" },
    info: { type: "file", filename: "log/rooms_info.log" },
  },
  categories: {
    default: {
      appenders: ["info"],
      level: "info",
    },
    error: {
      appenders: ["error"],
      level: "error",
    },
    info: {
      appenders: ["info"],
      level: "info",
    },
  },
});

export const infoLogger = log4js.getLogger("info");
export const errorLogger = log4js.getLogger("error");