import * as alt from 'alt-server';

export class BuffStorage {
    #allEntitiesActiveBuffsMap;

    constructor() {
        this.#allEntitiesActiveBuffsMap = new Map(); // entity
        
        alt.on('changeStacksAmmount', (entity, buffName, stacks) => {
            this.changeStacksAmmount(entity, buffName, stacks);
        });
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
                    expiresAt: new Date(data.expiresAt).toLocaleString(),
                    lastTickAt: new Date(data.lastTickAt).toLocaleString()
                };
                alt.log(`Buff: ${buffName}`, recalculatedTime);
            });
        });
    }

    printSingleBuff(entity){
        const singleEntity = this.#allEntitiesActiveBuffsMap.get(entity);
        alt.log('singleEntity', singleEntity);    
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
        
        //Дебаг, потом удалить
        alt.log(`allEntitiesActiveBuffsMap после удаления бафа ${buffName}, у entity.type ${entity.type}, c entity.id ${entity.id}`);
        this.printAllActiveBuffs();
    }
    //изменяет кол-во стаков у бафа в allEntitiesActiveBuffsMap при этом не изменяя его время завершения
    changeStacksAmmount(entity, buffName, newStacks) {
        const instance = this.#allEntitiesActiveBuffsMap.get(entity).get(buffName);
        instance.stacks = newStacks;
    }
}