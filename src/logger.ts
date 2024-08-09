import { colors, Color } from './color';
import { BusPlus } from 'bus-plus';

let defaultLoggerConfig = {
    log: true,
    debug: true,
    info: true,
    warn: true,
    error: true,
    table: true,
};
export type LoggerConfig = {
    log?: boolean,
    debug?: boolean,
    info?: boolean,
    warn?: boolean,
    error?: boolean,
    table?: boolean,
};
type LogHandlerReturn = Promise<{ enabled: Boolean, result: any[] }>;
export class Logger extends BusPlus {
    logger: Console;
    caches: { [key: string]: Function } = {};
    loggerConfig: LoggerConfig = JSON.parse(JSON.stringify(defaultLoggerConfig));
    constructor(_logger = console) {
        super();
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
    setConfig(config: LoggerConfig = {}) {
        this.loggerConfig = Object.assign({}, this.loggerConfig, config);
        this.caches = {};
        this.logger.log(Color.green('设置【CONFIG】Successify'));
    }
    getCaches() {
        return this.caches;
    }
    get instance() {
        return this.logger;
    }
    log(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    success(..._message: any[]): LogHandlerReturn {
        return this.log.call(this.logger, ..._message);
    }
    error(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    warn(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    info(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    debug(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    table(..._message: any[]): LogHandlerReturn {
        return Promise.resolve({ enabled: true, result: [] });
    }
    default(..._message: any[]): LogHandlerReturn {
        return this.log.call(this.logger, ..._message);
    }
}

const tags = [
    'log',
    'error',
    'warn',
    'info',
    'debug',
    'table',
    'success',
] as const;

const tagMapColors = {
    [tags[0]]: colors.white,
    [tags[1]]: colors.red,
    [tags[2]]: colors.yellow,
    [tags[3]]: colors.blue,
    [tags[4]]: colors.magenta,
    [tags[5]]: colors.green,
    [tags[6]]: colors.green,
    default: colors.green,
}
type TagType = typeof tags[number] | 'default';
type HandlerMapsType = {
    [x in TagType | 'default']?: (tag: TagType, ...message: any[]) => {
        result: any[];
        source: any[];
    };

}

function createPrint(type: TagType) {
    return function (_tag: TagType, ...message: any[]) {
        const time = Logger.getLocaleDateTime();
        const timeString = Logger.decoratorTime(time);
        const endRestCode = typeof window ? '' : colors.reset; // 浏览器环境不收尾
        const upperCaseTagName = `【${ _tag.toLocaleUpperCase()}】`;
        const result = [`${timeString}${tagMapColors[_tag]}${upperCaseTagName}`, ...message, endRestCode];
        // @ts-ignore
        const _logger = (this as any).logger as InstanceType<typeof Logger>;
        const log = _logger[_tag] ?? _logger.log; // suceess 新增的tag 使用log

        if (type === 'table') {
            log.call(_logger, ...message);
            const printMessage = [`${timeString}${colors.green}${upperCaseTagName}${colors.reset}`, message[0]];
            _logger.log(...printMessage); // 表格多打印一条源数据
        } else {
            log.call(_logger, ...result);
        }
        return {
            result,
            source: [time, upperCaseTagName, ...message],
        };
    }
}
const handlerMaps: HandlerMapsType = {
    table: createPrint('table'),
    default: createPrint('default')
}

function useCache(tag: TagType, ...message: string[]) {
    const handler = handlerMaps[tag] ?? handlerMaps.default!;
    // @ts-ignore
    return handler.call(this, tag, ...message);
}


tags.forEach(tag => {
    Object.defineProperty(Logger.prototype, tag, {
        enumerable: false,
        value: function (...message: string[]) {
            let data = {
                result: [],
                source: [],
            };
            if (this.loggerConfig[tag] === false) {
                return Promise.resolve({ endabled: false, ...data, });
            }
            if (this.caches[tag]) {
                data = this.caches[tag].call(this, ...message);
            } else {
                this.caches[tag] = useCache.bind(this, tag);
                data = this.caches[tag](...message);
            }
            const busData = { endabled: true, ...data, };
            // 只有打印的才触发bus emit
            this.emit('data', busData);
            return Promise.resolve(busData);
        },
    })
});

export const logger = new Logger();