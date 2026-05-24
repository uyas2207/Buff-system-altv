import * as alt from 'alt-server';

export class ActiveBuffsStorage {
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
        return entityBuffs.get(buffName);
    }
    //передает данные о всех активных бафах на определенном entity
    getAllEntityBuffs(entity){
        return this.#allEntitiesActiveBuffsMap.get(entity);
    }

    //перебор всех бафов с колбэком
    forEachBuff(callback){
        this.#allEntitiesActiveBuffsMap.forEach((buffs, entity) => {
            buffs.forEach((instance, buffName) => {
                callback(entity, buffName, instance);
            });
        });
    }
    
    //удаляет баф с названием buffName у переданного entity
    removeBuffFromMap(entity, buffName) {
        const entityBuffs = this.#allEntitiesActiveBuffsMap.get(entity);
        if (!entityBuffs){
            alt.logError('Ошибка, попытка удалить баф у несуществующего в allEntitiesActiveBuffsMap entity');
            return;
        }

        entityBuffs.delete(buffName);

        //удаляет entity если баффов больше нет
        if (entityBuffs.size === 0) {
            this.#allEntitiesActiveBuffsMap.delete(entity);
        }
    }
}