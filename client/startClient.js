import * as alt from 'alt-client';
import * as native from 'natives';
 
//import { ClientBuffStorage } from './ClientBuffStorage.js'

import { AnimationManager } from './AnimationManager.js';
import { ClientBuffManager } from './ClientBuffManager.js'

import { default as ClientBuffList } from '@shared/BuffList.js'

class BuffClient {
    constructor(){
        this.animationManager = new AnimationManager(); //при создании пытается загрузить все нужные анимации из конфига анимаций
        this.clientBuffList = new ClientBuffList(); //хрнаит все себе все существующие на клиенте бафы (бафы у которых существует файл для клиентской логики)
        this.clientBuffManager = new ClientBuffManager(this.clientBuffList); //реагриует на изменения syncmeta или создания entity с syncmeta и передает задачу классу с соответвующим id = syncmeta
        this.#init();
        // не забыть удалить ↓
        this.fxHandle = null;
    }

    #init(){
        alt.onServer('buffs:registerClientBuffs', async (clientBuffFilesNames) => {
            await this.clientBuffList.registerAllBuffTypes(clientBuffFilesNames);
        });
/* 
        alt.on('enteredVehicle', (vehicle, seat) => {
            console.log(`Вы сели в транспорт на место ${seat}`);
        });

        
        alt.on('leftVehicle', (vehicle, seat) => {
            console.log(`Вы вышли из транспорта с места ${seat}`);
        }); */

        alt.on('consoleCommand', async (command, ...arg) => {

            if(command === 'setVehicleConfigFlag'){
               native.setVehicleConfigFlag(alt.Player.local.vehicle, 8, true);
            }

            if(command === 'setVehicleEngineHealth'){
                if( arg[0] !== undefined){
                    native.setVehicleEngineHealth(alt.Player.local.vehicle, arg[0]);
                }
            }

            if(command === 'getVehicleEngineHealth'){
                console.log('enginehealth =',native.getVehicleEngineHealth(alt.Player.local.vehicle));
            }

            if(command === 'stopEntityFire'){
               native.stopEntityFire(alt.Player.local.vehicle);
            }

            if(command === 'setflagtrue'){
                native.setPedConfigFlag(alt.Player.local, 429, true);
            }
            if(command === 'setflagfalse'){
                native.setPedConfigFlag(alt.Player.local, 429, false);
            }

            
            if(command === 'setVehicleEngineOff'){
                native.setVehicleEngineOn(alt.Player.local.vehicle, false, true, true);
            }
            if(command === 'setVehicleEngineOn'){
                native.setVehicleEngineOn(alt.Player.local.vehicle, true, true, false);
            }
            if(command === 'frozen'){
                alt.Player.local.vehicle.frozen = true;
            }
            if(command === 'on'){
                alt.Player.local.vehicle.engineOn = true;
            }
            if(command === 'off'){
                alt.Player.local.vehicle.engineOn = false;
            }
            if(command === 'unfrozen'){
                alt.Player.local.vehicle.frozen = false;
            }
            if(command === 'vehnetowner'){
                alt.log(alt.Player.local.vehicle.netOwner);
            }
            if(command === 'netownerf'){
                alt.Player.local.vehicle.netOwner = null;
            }
            if(command === 'validf'){
                alt.Player.local.vehicle.valid = false;
            }
/*         alt.on('syncedMetaChange', (entity, metaKey, value, oldValue) => {
            if (metaKey === 'asd') {
                alt.log('entity', entity);
                alt.log('metaKey', metaKey);
                alt.log('value', value);
                alt.log('oldValue', oldValue);
            }
        }); */

            if(command === 'test_bufflist'){
                alt.log('buffList');
                alt.log('Существующие бафы:');
                this.clientBuffList.forEachBuff((buffClass) => {
                    alt.log(`${buffClass.id}`);
                });
            }
//                native.requestNamedPtfxAsset('veh_xs_vehicle_mods');
            if(command === 'load'){
                native.requestNamedPtfxAsset('veh_xs_vehicle_mods');
                await new Promise(resolve => alt.setTimeout(resolve, 800));
                alt.log(native.hasNamedPtfxAssetLoaded('veh_xs_vehicle_mods'));
            }
            if(command === 'core'){
                native.requestNamedPtfxAsset('core');
            }
            if(command === 'check_load'){
                alt.log(native.hasNamedPtfxAssetLoaded('core'));
            }        
/*             if(command === 'use_veh_nitrous'){
                native.useParticleFxAsset('veh_nitrous');
            } */
/*             if(command === 'use_startNetworkedParticleFxNonLoopedAtCoord'){
                native.startNetworkedParticleFxNonLoopedAtCoord
                ('veh_xs_vehicle_mods', 
                 alt.Player.local.vehicle.pos.x, 
                 alt.Player.local.vehicle.pos.y, 
                 alt.Player.local.vehicle.pos.z, 
                 alt.Player.local.vehicle.rot.x, 
                 alt.Player.local.vehicle.rot.y, 
                 alt.Player.local.vehicle.rot.z, 
                1,
                true,
                true,
                true,
                true
                );
            } */
            if(command === 'local'){
                console.log('local');
                const entity =  alt.Player.local;
                console.log('entity scriptID =', entity.scriptID);
/*                 console.log("=== Player ===");
                for (let key in entity) {
                    try {
                        console.log(`${key} = ${entity[key]}`);
                    } catch (error) {
                        
                    }
                } */
            }
            
        });
    }

    testAttach(vehicle, boneName){
        
        const boneIndex = native.getEntityBoneIndexByName(vehicle.scriptID, boneName);
        console.log('boneIndex', boneIndex);   
/*         const fxHandle = native.startParticleFxLoopedOnEntityBone( //startNetworkedParticleFxLoopedOnEntityBone
            'fire_vehicle', // название эффекта огня
            vehicle.scriptID,
            0.0, 0.0, 0.2,       // offset от кости
            0.0, 0.0, 0.0,       // rotation
            100,                 // scale
            false, false, false,
            boneIndex
        ); */
        native.useParticleFxAsset('core');
        this.fxHandle = native.startParticleFxLoopedOnEntityBone( //startNetworkedParticleFxLoopedOnEntityBone   
            'fire_vehicle', 
            vehicle.scriptID,
            0.0, 0.0, 0.2,       // offset от кости
            0.0, 0.0, 0.0,       // rotation
            boneIndex, 
            1,
            false, false, false
        );
    }
}

new BuffClient;

                    //native.setVehicleEngineHealth(alt.Player.local.vehicle.scriptID, -4000);
                    //native.setVehiclePetrolTankHealth(alt.Player.local.vehicle.scriptID, -1);