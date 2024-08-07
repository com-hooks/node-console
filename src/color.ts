
export const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m"
} as const;

export class Color {
    constructor() {
    }
    public static setColor(color: string, msg: string) {
        return `${color}${msg}${colors.reset}`;
    }
    public static red(msg: string) {
        return `${colors.red}${msg}${colors.reset}`;
    }
    public static green(msg: string) {
        return `${colors.green}${msg}${colors.reset}`;
    }
    public static yellow(msg: string) {
        return `${colors.yellow}${msg}${colors.reset}`;
    }
    public static blue(msg: string) {
        return `${colors.blue}${msg}${colors.reset}`;
    }
    public static magenta(msg: string) {
        return `${colors.magenta}${msg}${colors.reset}`;
    }
    public static cyan(msg: string) {
        return `${colors.cyan}${msg}${colors.reset}`;
    }
    public static white(msg: string) {
        return `${colors.white}${msg}${colors.reset}`;
    }

}