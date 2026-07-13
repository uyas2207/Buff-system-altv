import * as native from 'natives';
import * as alt from 'alt-client';

import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientBurningBuff extends ClientBuffBase {
    get id () { return BuffIds.BURNING; }

    get #BONE_NAME () { return 'bonnet';} //кость автомобиля к которой будет привязан огонь

    onEntityCreate(entity) {
        this.#applyFire(entity);
    }

    onMetaChange(entity) {
        this.#applyFire(entity);
    }

    onMetaDelete(entity) {
        this.#stopFire(entity);
    }
    
    #applyFire(entity){
        if (entity.type === alt.BaseObjectType.LocalPlayer || entity.type === alt.BaseObjectType.Ped) {
            native.startEntityFire(entity.scriptID);
        }
        if(entity.type === alt.BaseObjectType.Vehicle){
            const fxHandle = this.#setVehicleOnFire(entity, this.#BONE_NAME);
            entity.setMeta('vehFire', fxHandle);
        }
    }

    #stopFire(entity){
        if (entity.type === alt.BaseObjectType.LocalPlayer || entity.type === alt.BaseObjectType.Ped) {
            native.stopEntityFire(entity.scriptID);
        }
        if(entity.type === alt.BaseObjectType.Vehicle){
            const fxHandle = entity.getMeta('vehFire');
            this.#stopAttachedVehicleFire(fxHandle);
            entity.deleteMeta('vehFire');
        }     
    }

    #setVehicleOnFire(vehicle, boneName){
        const boneIndex = native.getEntityBoneIndexByName(vehicle.scriptID, boneName); 
        native.useParticleFxAsset('core');
        const fxHandle = native.startParticleFxLoopedOnEntityBone(
            'fire_vehicle', 
            vehicle.scriptID,
            0.0, 0.5, 0.0,  // offset от кости
            0.0, 0.0, 0.0,  // rotation
            boneIndex, 
            1,  //scale
            false, false, false //xAxis, yAxis, zAxis
        )
        return fxHandle;
    }

    #stopAttachedVehicleFire(fxHandle) {
        native.stopParticleFxLooped(fxHandle, false);
        native.removeParticleFx(fxHandle, false);
    }

}