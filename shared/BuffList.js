export default class BuffList {
    #buffListServer;

    constructor(){
        this.#buffListServer = new Map();
    }
    
    register(buffClass) {
        if (this.#buffListServer.has(buffClass.id)) {
            throw new Error(`Buff ${buffClass.id} already registered`);
        }
        this.#buffListServer.set(buffClass.id, buffClass);
    }

    get(buffId) {
        return this.#buffListServer.get(buffId);
    }

    has(buffId) {
        return this.#buffListServer.has(buffId);
    }

    getAll() {
        return this.#buffListServer;
    }

    async registerAllBuffTypes(files){
        await Promise.all(
            files.map(async file => {
                const buffClass = await import(`@BuffTypes/${file}`);
                this.register(buffClass.default);
            })
        );
    }

    // перебор всех бафов с колбэком
    forEachBuff(callback) {
        this.#buffListServer.forEach((value, key) => {
            callback(value, key);
        });
    }
}