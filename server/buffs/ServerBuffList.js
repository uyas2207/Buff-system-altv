export class ServerBuffList {
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
        //console.log('buffList = ',this.#buffList);
        return this.#buffList;
    }

    // перебор всех бафов с колбэком
    forEachBuff(callback) {
        this.#buffList.forEach((value, key) => {
            callback(value);
        });
    }

    testStackable(buffId){
        const test = this.#buffList.get(buffId);
        const testStackable = test.stackable;
        console.log('buffId', buffId);
        console.log('testStackable', testStackable);
    }
}