interface Logger {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
  debug: (message: string) => void;
}

class ConsoleLogger implements Logger {
  info(message: string) {
    console.log(message);
  }

  warn(message: string) {
    console.warn(message);
  }

  error(message: string) {
    console.error(message);
  }

  debug(message: string) {
    console.debug(message);
  }
}

class LoggerManager {
  private name: string = "";
  private logger: Logger = new ConsoleLogger();

  registerLogger(name: string, customLogger?: Logger) {
    this.name = name;
    if (customLogger) {
      this.logger = customLogger;
    }
  }

  info(message: string) {
    this.logger.info(`[${this.name}] ${message}`);
  }

  warn(message: string) {
    this.logger.warn(`[${this.name}] ${message}`);
  }

  error(message: string) {
    this.logger.error(`[${this.name}] ${message}`);
  }

  debug(message: string) {
    this.logger.debug(`[${this.name}] ${message}`);
  }
}

export default new LoggerManager();
