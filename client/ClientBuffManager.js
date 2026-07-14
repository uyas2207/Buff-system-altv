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

        alt.on('streamSyncedMetaChange', (entity, metaKey, value, oldValue) => {
            this.#handleStreamSyncedMetaChange(entity, metaKey, value, oldValue);
        });
    }

    #handleEntityCreate(entity){
        this.clientBuffList.forEachBuff((handler, metaKey) => {
            //если в будующем SyncMeta будет использоваться не только для системы бафов 
            if (!entity.hasStreamSyncedMeta(metaKey)) return;

            const value = entity.getStreamSyncedMeta(metaKey);
            if (value === undefined) return;

            handler.onEntityCreate(entity, value);
        });
    }

    #handleStreamSyncedMetaChange(entity, metaKey, value, oldValue){
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