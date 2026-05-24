import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';
import { baseObjectType } from '@shared/SharedConfig.js'

import { drunkAnimDictionary } from '../../config/AnimationConfig.js' 

export default class ClientDrunkBuff extends ClientBuffBase {
    static id = BuffIds.DRUNK;

    static onEntityCreate(entity, value) {
        console.log('[DrunkBuffClient] onEntityCreate:', entity, value);
        this.addDrunkBuffVisuals(entity, value);
    }

    static onMetaChange(entity, value, oldValue) {
        console.log('[DrunkBuffClient] onMetaChange:', entity, value);
        this.addDrunkBuffVisuals(entity, value);
    }

    static onMetaDelete(entity, value, oldValue) {
        console.log('[DrunkBuffClient] onMetaDelete:', entity, value, oldValue);
        this.removeDrunkBuffVisuals(entity);
    }
    
    static addDrunkBuffVisuals(entity, value){
        native.setPedMovementClipset(entity.scriptID, drunkAnimDictionary[value], 1.0);
        if (entity.type === baseObjectType.LocalPlayer) {
            native.shakeGameplayCam("DRUNK_SHAKE", value);
        }
    }

    static removeDrunkBuffVisuals(entity){
        native.resetPedMovementClipset(entity.scriptID, 1.0);
        if (entity.type === baseObjectType.LocalPlayer) {
            native.shakeGameplayCam(false);
        }
    }
}