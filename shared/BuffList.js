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
        buffClass.test?.();
    }
    
    async registerAllBuffTypes(files){
        for (const buffClass of Object.values(files)) {
            console.log('buffClass', buffClass);
            this.register(new buffClass);
        }
    }

    get(buffId) {
        return this.#buffListServer.get(buffId);
    }

    has(buffId) {
        return this.#buffListServer.has(buffId);
    }

    getAll() {
        //так как возвращается не сама Map, а ее копия неполучится изменять значения внутри #buffListServer
        return new Map(this.#buffListServer);
    }
    //импортирует все файлы с названиями переданными в массиве files (все файлы должны находится в одной папке)
/*     async registerAllBuffTypes(files){
        await Promise.all(
            files.map(async file => {
                const buffClass = await import(`@BuffTypes/${file}`);
                this.register(new buffClass.default);
            })
        );
    }
 */


    // перебор всех бафов с колбэком
    forEachBuff(callback) {
        this.#buffListServer.forEach((value, key) => {
            callback(value, key);
        });
    }
}