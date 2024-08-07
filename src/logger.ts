import { colors, Color } from './color';
import merge from 'lodash-es/merge';

let defaultLoggerConfig = {
    log: true,
    debug: true,
    info: true,
    warn: true,
    error: true,
    table: true,
};
export type LoggerConfig = typeof defaultLoggerConfig;
export class Logger {
    logger: Console;
    caches: { [key: string]: Function } = {};
    loggerConfig: LoggerConfig = JSON.parse(JSON.stringify(defaultLoggerConfig));
    constructor(_logger = console) {
        this.logger = _logger;
    }
    public static decoratorTime(msg: string) {
        return Color.cyan(msg);
    }
    public static getLocaleDateTime() {
        return new Date().toLocaleString();
    }
    public static printDateTime() {
        const timeString = Logger.decoratorTime(`${Logger.getLocaleDateTime()}`);
        console.log(timeString);
    }
    /**
     * 设置loggerConfig.logger 控制对应函数是否打印
     * @param config 
     */
    setConfig(config: LoggerConfig) {
        this.loggerConfig = merge({}, this.loggerConfig, config);
        this.caches = {};
        this.logger.log(Color.green('设置【CONFIG】Successify'));
    }
    getCaches() {
        return this.caches;
    }
    get instance() {
        return this.logger;
    }
    log() { }

    error() { }

    warn() { }

    info() { }

    debug() { }

    table() { }
}

const tags = [
    'log',
    'error',
    'warn',
    'info',
    'debug',
    'table',
] as const;

const tagMapColors = {
    [tags[0]]: colors.white,
    [tags[1]]: colors.red,
    [tags[2]]: colors.yellow,
    [tags[3]]: colors.blue,
    [tags[4]]: colors.magenta,
    [tags[5]]: colors.green,
}
type TagType = typeof tags[number];

const handlerMaps = {
    table: function (_tag: TagType, ...message: string[]) {
        const timeString = Logger.decoratorTime(`${Logger.getLocaleDateTime()}`);
        this.logger[_tag](...message);
        const result = [`${timeString}${colors.green}【${_tag.toLocaleUpperCase()}】${colors.reset}`, message[0]];
        this.logger.log(...result);
        return result;
    },
    default: function (_tag: TagType, ...message: string[]) {
        const timeString = Logger.decoratorTime(`${Logger.getLocaleDateTime()}`);
        const result = [`${timeString}${tagMapColors[_tag]}【${_tag.toLocaleUpperCase()}】`, ...message, colors.reset];
        this.logger[_tag](...result);
        return result;
    }
}

function useCache(tag: TagType, ...message: string[]) {
    const handler = handlerMaps[tag] ?? handlerMaps.default;
    return handler.call(this, tag, ...message);
}


tags.forEach(tag => {
    Object.defineProperty(Logger.prototype, tag, {
        enumerable: false,
        value: function (...message: string[]) {
            let result = [];
            if (this.loggerConfig[tag] === false) {
                return Promise.resolve({ endabled: false, result, });
            }
            if (this.caches[tag]) {
                result = this.caches[tag].call(this, ...message);
            } else {
                this.caches[tag] = useCache.bind(this, tag);
                result = this.caches[tag](...message);
            }
            return Promise.resolve({ endabled: true, result });
        },
    })
});

export const logger = new Logger();
console.log(Color.green('initialized'));