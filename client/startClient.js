import * as alt from 'alt-client';
import * as native from 'natives';

class BuffClient {
    constructor(){
        this.#init();
    }

    #init(){
        alt.on('gameEntityCreate', (entity) => {
            //if(!(entity instanceof alt.Ped)) return;

            if (entity.hasSyncedMeta('visible')) {
                const visibleState = entity.getSyncedMeta('visible');
                native.setEntityVisible(entity, visibleState, visibleState);
            }
            alt.log('visible =', entity.visible);

            
        });

        /*
        alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
            if(!(entity instanceof alt.Ped)) return;
            
            alt.log('entity', entity);
            alt.log('key', key);
            alt.log('value', value);
            alt.log('oldValue', oldValue);

            if (key === 'visible' && (value === (true || false))) {
                //entity.visible = value;
                native.setEntityVisible(entity, value, value)
            }
        });
        */
    }

}

new BuffClient;