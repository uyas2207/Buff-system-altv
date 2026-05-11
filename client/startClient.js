import * as alt from 'alt-client';
import * as native from 'natives';
 
//import { ClientBuffStorage } from './ClientBuffStorage.js'

import { AnimationManager } from './AnimationManager.js';
import { ClientBuffManager } from './ClientBuffManager.js'

import { default as ClientBuffList } from '@shared/BuffList.js'
//import { BuffIds } from '@shared/SharedConfig.js'

class BuffClient {
    constructor(){
        this.animationManager = new AnimationManager();
        this.clientBuffList = new ClientBuffList();
        this.clientBuffManager = new ClientBuffManager(this.clientBuffList);
        this.#init();
    }

    #init(){
        alt.onServer('print_ped_info', (entity) => {
            console.log('entity, entity');
            native.taskReactAndFleePed(entity, entity);
        });

        alt.onServer('print_ped_info_2', (entity) => {
            console.log('entity, alt.Player.local');
            native.taskReactAndFleePed(entity, alt.Player.local);
        });       

        alt.onServer('buffs:registerClientBuffs', async (clientBuffFilesNames) => {
            console.log('Пришел ивент с сервера на регистрацию бафов:', clientBuffFilesNames);
            await this.clientBuffList.registerAllBuffTypes(clientBuffFilesNames);
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
        alt.on('consoleCommand', async (command, ...arg) => {
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

            if(command === 'test_bufflist'){
                alt.log('buffList');
                alt.log('Существующие бафы:');
                this.clientBuffList.forEachBuff((buffClass) => {
                    alt.log(`${buffClass.id}`);
                });
            }

            if(command === 'test_import'){
                /* const buffClass = */ await import(`@BuffTypes/ClientInvisibleBuff.js`);
            }
            if(command === 'test_import_2'){
                /* const buffClass = */ await import(`./buffs/buffTypes/ClientInvisibleBuff.js`);
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