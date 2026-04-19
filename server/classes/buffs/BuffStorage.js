import * as alt from 'alt-server';

export class BuffStorage {
    #allEntitiesActiveBuffsMap;

    constructor() {
        this.#allEntitiesActiveBuffsMap = new Map(); // entity
    }
    //добавить данные о бафе в map
    addBuffToMap(entity, buffName, instance) {
        //если первый раз приходит такой entity
        if (!this.#allEntitiesActiveBuffsMap.has(entity)) {
            this.#allEntitiesActiveBuffsMap.set(entity, new Map());
        }
        //записывает под соответсвующий entity какому targetId назначен какой buffName 
        this.#allEntitiesActiveBuffsMap.get(entity).set(buffName, instance);
    }

    hasActiveBuff(entity, buffName){
        return this.#allEntitiesActiveBuffsMap.has(entity) && this.#allEntitiesActiveBuffsMap.get(entity).has(buffName);
    }
    
    //передать данные о бафе в другой класс
    getEntityBuff(entity, buffName) {
        const entityBuffs = this.#allEntitiesActiveBuffsMap.get(entity);
        return entityBuffs.get(buffName)
    }
    //удалить бафф из обей map
    removeBuffFromMap() {

    }
    //метод для дебага (потом можно убрать)
    printAllActiveBuffs() {
        this.#allEntitiesActiveBuffsMap.forEach((value, buffRecepient) => {
            const ent = buffRecepient;
            //alt.log(ent.id);
            alt.log(` buffRecepient.id = ${buffRecepient.id}`);
            alt.log(` buffRecepient.type = ${buffRecepient.type} \n`);
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

    printSingleBuff(entity){
        const singleEntity = this.#allEntitiesActiveBuffsMap.get(entity);
        alt.log('singleEntity', singleEntity);    
        /*
                   singleEntity.forEach((data, buffName) => {
                const recalculatedTime = {
                    ...data,
                    appliedAt: new Date(data.appliedAt).toLocaleString(),
                    expiresAt: new Date(data.expiresAt).toLocaleString()
                };
                alt.log(`Buff: ${singleEntity}`, recalculatedTime);
            });
            */
    }

    // перебор всех маршрутов с колбэком
    forEachBuff(callback){

    }
}