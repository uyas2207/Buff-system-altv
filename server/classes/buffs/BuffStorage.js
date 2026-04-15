import * as alt from 'alt-server';

export class BuffStorage {
    #allEntitiesActiveBuffsMap;

    constructor() {
        this.#allEntitiesActiveBuffsMap = new Map(); // entety
    }
    //добавить данные о бафе в map
    addBuffToMap(entity, targetId, instance) {
        //если первый раз приходит такой entity
        if (!this.#allEntitiesActiveBuffsMap.has(entity)) {
            this.#allEntitiesActiveBuffsMap.set(entity, new Map());
        }
        //записывает под соответсвующий entity какому targetId назначен какой buffName 
        this.#allEntitiesActiveBuffsMap.get(entity).set(targetId, instance);
    }
    //передать данные о бафе в другой класс
    getEntityBuff(buff) {
        return this.#allEntitiesActiveBuffsMap.get(entity);
    }
    //удалить бафф из обей map
    removeBuffFromMap() {

    }
    //метод для дебага (потом можно убрать)
    printAllActiveBuffs() {
        this.#allEntitiesActiveBuffsMap.forEach((value, buffRecepient) => {
            alt.log(`\n buffRecepient = ${buffRecepient.ped.id}\n`);
            value.forEach((data, buffName) => {
                const recalculatedTime = {
                    ...data,
                    appliedAt: new Date(data.appliedAt).toLocaleString(),
                    expiresAt: new Date(data.expiresAt).toLocaleString()
                };
                alt.log(`Buff: ${buffName}`, recalculatedTime);
            });
        });
    }

    // перебор всех маршрутов с колбэком
    forEachBuff(callback){

    }
}