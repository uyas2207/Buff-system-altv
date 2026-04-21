export class PedStorage {
    #pedDataMap

    constructor(){
        this.#pedDataMap = new Map();
    }

    addPed(ped){
        if (this.#pedDataMap.has(ped.id)) {
            alt.logError(`PedStorage.addPed: пед с id ${ped.id} уже существует`);
            return;
        }
        //при первом появлении ped
        this.#pedDataMap.set(ped.id, {
            ped
        });
    }

    hasPed(pedId) {
        return this.#pedDataMap.has(pedId);
    }

    getPed(pedId) {
        return this.#pedDataMap.get(pedId);
    }
    
    // перебор всех педов с колбэком
    forEachPed(callback) {
        this.#pedDataMap.forEach((ped, key) => {
            callback(ped);
        });
    }
}