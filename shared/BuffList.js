export default class BuffList {
    #buffList;

    constructor(){
        this.#buffList = new Map();
    }
    
    register(buffClass) {
        if (this.#buffList.has(buffClass.id)) {
            throw new Error(`Buff ${buffClass.id} already registered`);
        }
        this.#buffList.set(buffClass.id, buffClass);
    }

    get(buffId) {
        return this.#buffList.get(buffId);
    }

    has(buffId) {
        return this.#buffList.has(buffId);
    }

    getAll() {
        return this.#buffList;
    }
    //импортирует все файлы с названиями переданными в массиве files (все файлы должны находится в одной папке)
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
        this.#buffList.forEach((value, key) => {
            callback(value, key);
        });
    }
}