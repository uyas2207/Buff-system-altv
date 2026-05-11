import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';

import { drunkAnimDictionary } from '../../config/AnimationConfig.js' 

export default class ClientDrunkBuff extends ClientBuffBase {
    static id = 'drunk';

    static onEntityCreate(entity, value) {
        console.log('[DrunkBuffClient] onEntityCreate:', entity, value);
        if(value === false){
            this.removeDrunkBuffVisuals(entity);
            return;
        }
        this.addDrunkBuffVisuals(entity, value);
    }

    static onMetaChange(entity, value, oldValue) {
        console.log('[DrunkBuffClient] onMetaChange:', entity, value, oldValue);
        if(value === false){
            this.removeDrunkBuffVisuals(entity);
            return;
        }
        this.addDrunkBuffVisuals(entity, value);
    }
    
    static addDrunkBuffVisuals(entity, value){
        native.setPedMovementClipset(entity, drunkAnimDictionary[value], 1.0);
        if (entity.type === 18) { // entity.type === 18 это LocalPlayer
            native.shakeGameplayCam("DRUNK_SHAKE", value);
        }
    }

    static removeDrunkBuffVisuals(entity){
        native.resetPedMovementClipset(entity, 1.0);
        if (entity.type === 18) { // entity.type === 18 это LocalPlayer
            native.shakeGameplayCam(false);
        }
    }
/*
    static onMetaRemove(entity) {
        console.log('[DrunkBuffClient] onMetaRemove:', entity);
        native.resetPedMovementClipset(entity, 1.0);
    }
*/
}

//native.shakeGameplayCam("DRUNK_SHAKE", intesity);
