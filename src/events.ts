type EventCallback = (...data: any[]) => void;
export class Bus {
    maps: Map<string, EventCallback[]>;
    constructor(maps = new Map()) {
        this.maps = maps;
    }
    on(key: string, event: EventCallback) {
        if (this.maps.has(key)) {
            const source = this.maps.get(key)!;
            source.push(event);
            this.maps.set(key, source);
        } else {
            this.maps.set(key, [event]);
        }
        return this;
    }
    off(key: string, event?: EventCallback) {
        if (typeof event === "function") {
            const source = this.maps.get(key)! || [];
            this.maps.set(key, source.filter(e => e !== event));
        } else {
            this.maps.delete(key);
        }
        return this;
    }
    emit(key: string, ...args: any[]) {
        const events = this.maps.get(key) || [];
        events.forEach(event => event(...args));
        return this;
    }
}