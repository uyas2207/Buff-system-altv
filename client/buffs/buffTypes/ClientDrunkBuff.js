import * as native from 'natives';

import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

import { drunkAnimDictionary } from '../../config/AnimationConfig.js' 

export default class ClientDrunkBuff extends ClientBuffBase {
    get id () { return BuffIds.DRUNK;}

    onEntityCreate(entity, value) {
        this.#addDrunkBuffVisuals(entity, value);
    }

    onMetaChange(entity, value) {
        this.#addDrunkBuffVisuals(entity, value);
    }

    onMetaDelete(entity) {
        this.#removeDrunkBuffVisuals(entity);
    }
    
    #addDrunkBuffVisuals(entity, value){
        native.setPedMovementClipset(entity.scriptID, drunkAnimDictionary[value], 1.0);
        native.shakeGameplayCam("DRUNK_SHAKE", value);
    }

    #removeDrunkBuffVisuals(entity){
        native.resetPedMovementClipset(entity.scriptID, 1.0);
        native.shakeGameplayCam(false);
    }
}