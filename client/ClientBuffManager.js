/*
import * as alt from 'alt-client';

export class ClientBuffManager {
    constructor(clientBuffStorage){
        this.clientBuffStorage = clientBuffStorage;
        this.awaitingEntities = new Map(); //Map<'type:id', Array<Function>>
        this.#registerEventListeners();
    }

    #registerEventListeners(){
        alt.on('gameEntityCreate', (entity) => {
            this.#handleEntityCreate(entity);
        });

        alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
            this.#handleSyncedMetaChange(entity, key, value, oldValue);
        });
    }

    #handleEntityCreate(entity){
        this.clientBuffStorage.forEach((handler, metaKey) => {
            if (!entity.hasSyncedMeta(metaKey)) return;

            const value = entity.getSyncedMeta(metaKey);
            if (!value) return;

            handler.onEntityCreate(entity, value);
        });

        this.#executeAwaitingActions(entity);
    }
    //выполнение отложенных команд и удаление их из map после выполнения
    #executeAwaitingActions(entity){
        const key = this.#getEntityKey(entity);
        const actions = this.awaitingEntities.get(key);
        if (actions.length === 0) return;

        actions.forEach(action => action(entity));
        this.awaitingEntities.delete(key);
    }
    
    #handleSyncedMetaChange(entity, key, value, oldValue) {
        const handler = this.#clientBuffStorage.get(key);
        if (!handler) return;

        // Ped без netOwner — откладываем действие до gameEntityCreate
        if (this.#isPedWithoutOwner(entity)) {
            this.#deferAction(entity, handler, value, oldValue);
            return;
        }

        this.#applyHandler(handler, entity, value, oldValue);
    } 
    // Откладываем действие — сохраняем функцию а не результат её вызова
    #deferAction(entity, handler, value, oldValue) {
        const entityId = entity.id;

        if (!this.#pendingActions.has(entityId)) {
            this.#pendingActions.set(entityId, []);
        }

        // Сохраняем замыкание — выполнится позже в gameEntityCreate
        this.#pendingActions.get(entityId).push((freshEntity) => {
            this.#applyHandler(handler, freshEntity, value, oldValue);
        });

        alt.log(`[ClientBuffManager] Deferred action for ped id=${entityId}`);
    }

    #applyHandler(handler, entity, value, oldValue) {
        if (!value || value === 0) {
            handler.onMetaRemove(entity);
        } else {
            handler.onMetaChange(entity, value, oldValue);
        }
    }

    #isPedWithoutOwner(entity) {
        return entity.type === 2 && entity.netOwner === null;
    }
/*
    /*
    #handleSyncedMetaChange(entity, key, value, oldValue){
        alt.log('handleSyncedMetaChange:', entity, key, value, oldValue);
        const handler = this.clientBuffStorage.get(key);
        if (!handler) return;
        //метод для работы с ped без netOwner (т.к для педов без netOwner нельзя применить нативки)
        if(entity.netOwner === null && entity.type === 2){
            this.#regulateEmptyPeds(handler, entity, key, value, oldValue);
            return;
        }

        if (!value || value === 0) {
            handler.onMetaRemove(entity);
        }
        else{
            handler.onMetaChange(entity, value, oldValue);
        }
    }

    #regulateEmptyPeds(handler, entity, key, value, oldValue){
        
        if (!value || value === 0) {
            this.awaitingPeds.push(handler.onMetaRemove(entity));
            alt.log(' this.awaitingPeds', this.awaitingPeds);
        }
        else{
            this.awaitingPeds.push(handler.onMetaChange(entity, value, oldValue));
            alt.log(' this.awaitingPeds', this.awaitingPeds);
        }
    }
*/
/*  
    //получение ключа состоящего из строки type:id для map
    #getEntityKey(entity){
        return `${entity.type}:${entity.id}`;
    }
}
    */
import * as alt from 'alt-client';

export class ClientBuffManager {
    constructor(clientBuffStorage){
        this.clientBuffStorage = clientBuffStorage;
        this.#registerEventListeners();
    }

    #registerEventListeners(){
        alt.on('gameEntityCreate', (entity) => {
            this.#handleEntityCreate(entity);
        });

        alt.on('syncedMetaChange', (entity, metaKey, value, oldValue) => {
            this.#handleSyncedMetaChange(entity, metaKey, value, oldValue);
        });
    }

    #handleEntityCreate(entity){
        this.clientBuffStorage.forEach((handler, metaKey) => {
            if (!entity.hasSyncedMeta(metaKey)) return;

            const value = entity.getSyncedMeta(metaKey);
            if (value === undefined) return;

            handler.onEntityCreate(entity, value);
        });
    }

    #handleSyncedMetaChange(entity, metaKey, value, oldValue){
        const handler = this.clientBuffStorage.get(metaKey);
        if (!handler) return;
        
        handler.onMetaChange(entity, value, oldValue);
    }

}