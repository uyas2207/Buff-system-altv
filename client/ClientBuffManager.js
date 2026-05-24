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
            if (entity.scriptID === 0) return;
            this.#handleSyncedMetaChange(entity, metaKey, value, oldValue);
        });
    }

    #handleEntityCreate(entity){
        this.clientBuffList.forEachBuff((handler, metaKey) => {
            if (!entity.hasSyncedMeta(metaKey)) return;

            const value = entity.getSyncedMeta(metaKey);
            if (value === undefined) return;

            handler.onEntityCreate(entity, value);
        });
    }

    #handleSyncedMetaChange(entity, metaKey, value, oldValue){
        const handler = this.clientBuffList.get(metaKey);
        if (!handler) return;
        if(oldValue !== undefined && value === undefined){
            handler.onMetaDelete(entity, value, oldValue);
        }
        else {
            handler.onMetaChange(entity, value, oldValue);
        }
    }
}