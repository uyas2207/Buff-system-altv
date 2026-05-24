import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';
import { baseObjectType } from '@shared/SharedConfig.js'

import * as alt from 'alt-client';

export default class ClientBurningBuff extends ClientBuffBase {
    static id = BuffIds.BURNING;

    static onEntityCreate(entity, value) {
        console.log('[BurningBuff] onEntityCreate:', entity, value);
        this.#applyFire(entity);
    }

    static onMetaChange(entity, value, oldValue) {
        console.log('[BurningBuff] onMetaChange:', entity, value, oldValue);
        this.#applyFire(entity);
    }

    static onMetaDelete(entity, value, oldValue) {
        console.log('[BurningBuff] onMetaDelete:', entity, value, oldValue);
        this.#stopFire(entity);
    }
    
    static #applyFire(entity){
        if (entity.type === baseObjectType.LocalPlayer || entity.type === baseObjectType.Ped) {
            native.startEntityFire(entity.scriptID);
        }
        if(entity.type === baseObjectType.Vehicle){
            const fxHandle = this.#setVehicleOnFire(entity, 'bonnet');
            entity.setMeta('vehFire', fxHandle);
        }
    }

    static #stopFire(entity){
        if (entity.type === baseObjectType.LocalPlayer || entity.type === baseObjectType.Ped) {
            native.stopEntityFire(entity.scriptID);
        }
        if(entity.type === baseObjectType.Vehicle){
            const fxHandle = entity.getMeta('vehFire');
            this.#stopAttachedVehicleFire(fxHandle);
            entity.deleteMeta('vehFire');
        }     
    }

    static #setVehicleOnFire(vehicle, boneName){
        const boneIndex = native.getEntityBoneIndexByName(vehicle.scriptID, boneName); 
        native.useParticleFxAsset('core');
        const fxHandle = native.startParticleFxLoopedOnEntityBone( //startNetworkedParticleFxLoopedOnEntityBone   
            'fire_vehicle', 
            vehicle.scriptID,
            0.0, 0.5, 0.0,       // offset от кости
            0.0, 0.0, 0.0,       // rotation
            boneIndex, 
            1,
            false, false, false
        )
        return fxHandle;
    }

    static #stopAttachedVehicleFire(fxHandle) {
        native.stopParticleFxLooped(fxHandle, false);
        native.removeParticleFx(fxHandle, false);
    }

}