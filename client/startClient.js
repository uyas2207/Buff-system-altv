import * as alt from 'alt-client';
import * as native from 'natives';

import { clientBuffStorage } from './ClientBuffStorage.js'

import { AnimationManager } from './AnimationManager.js';
import { ClientBuffManager } from './ClientBuffManager.js'


class BuffClient {
    constructor(){
        this.animationManager = new AnimationManager();
        this.clientBuffManager = new ClientBuffManager(clientBuffStorage);
        this.#init();
    }

    #init(){
        alt.onServer('print_ped_info', (entity) => {
            alt.log("=== ВСЁ О PED ===");
            for (let key in entity) {
                try {
                    alt.log(`${key} = ${entity[key]}`);
                } catch (error) {
                    // нужно что бы код продолжил выполняться после ошибки если она будет
                }
            }
        });
        
        /*
        alt.on('gameEntityCreate', (entity) => {

            if (entity.hasSyncedMeta('visible')) {
                const visibleState = entity.getSyncedMeta('visible');
                native.setEntityVisible(entity, visibleState, visibleState);
            }
            alt.log('visible =', entity.visible);
        });
*/
        alt.on('consoleCommand', (command, ...arg) => {
            if (command === 'shakeGameplayCam'){
                
                const intesity = parseFloat(arg[0]);

                if(typeof intesity === 'number'){
                    alt.log('intesity', intesity);
                    native.shakeGameplayCam("DRUNK_SHAKE", intesity);
                    alt.log('intesity', intesity);
                }

            }

            if(command === 'animSet_ped'){
                const ped = alt.getByID(2, 1);
                native.resetPedMovementClipset(ped, "move_m@drunk@slightlydrunk", 1.0);
            }

            if(command === 'animSet'){
                alt.log('AnimSet');
                native.setPedMovementClipset(alt.Player.local, "move_m@drunk@slightlydrunk", 1.0);
            }

            if(command === 'resetAnim_1'){
                alt.log('resetAnim 1');
                native.resetPedMovementClipset(alt.Player.local, 1);
            }
            
            if(command === 'local'){
                console.log('local');
                const entity = alt.Player.local;
                console.log("=== Player ===");
                for (let key in entity) {
                    try {
                        console.log(`${key} = ${entity[key]}`);
                    } catch (error) {
                        
                    }
                }
            }

        });
/*        
        alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
            //if(!(entity instanceof alt.Ped)) return;
            
            alt.log('entity', entity);
            alt.log('key', key);
            alt.log('value', value);
            alt.log('oldValue', oldValue);

            if (key === 'drunk') {
                //entity.visible = value;
                native.setPedMovementClipset(entity, "move_m@drunk@slightlydrunk", 1.0);
            }
        });
        */
    }

}

new BuffClient;