import * as alt from 'alt-client';

export class ClientBuffManager {
    constructor(clientBuffList){
        this.clientBuffList = clientBuffList;
        this.#registerEventListeners();
    }

    #registerEventListeners(){
        alt.on('gameEntityCreate', (entity) => {
            this.#handleEntityCreate(entity);
        });

        alt.on('syncedMetaChange', (entity, metaKey, value, oldValue) => {
            //Если объект не находится в стрим зоне у него scriptID === 0 и к нему нет смысла применять нативные функции которые применялись бы если бы он был в стрим зоне
            if (entity.scriptID === 0) return;
            this.#handleSyncedMetaChange(entity, metaKey, value, oldValue);
        });
    }

    #handleEntityCreate(entity){
        this.clientBuffList.forEachBuff((handler, metaKey) => {
            //если в будующем SyncMeta будет использоваться не только для системы бафов 
            if (!entity.hasSyncedMeta(metaKey)) return;

            const value = entity.getSyncedMeta(metaKey);
            if (value === undefined) return;

            handler.onEntityCreate(entity, value);
        });
    }

    #handleSyncedMetaChange(entity, metaKey, value, oldValue){
        const handler = this.clientBuffList.get(metaKey);
        //если SyncMeta была установлена не для системы бафов
        if (!handler) return;
        //если проврка проходит значит на сервере было выполнено удаление SyncMeta (прошлое значение было, а новое знаечние отсутсвует)
        if(oldValue !== undefined && value === undefined){
            handler.onMetaDelete(entity, value, oldValue);
        }
        else {
            handler.onMetaChange(entity, value, oldValue);
        }
    }
}