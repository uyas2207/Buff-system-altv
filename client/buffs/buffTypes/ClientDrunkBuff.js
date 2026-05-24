import * as native from 'natives';

import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

import { drunkAnimDictionary } from '../../config/AnimationConfig.js' 

export default class ClientDrunkBuff extends ClientBuffBase {
    static id = BuffIds.DRUNK;

    static onEntityCreate(entity, value) {
        this.#addDrunkBuffVisuals(entity, value);
    }

    static onMetaChange(entity, value) {
        this.#addDrunkBuffVisuals(entity, value);
    }

    static onMetaDelete(entity) {
        this.#removeDrunkBuffVisuals(entity);
    }
    
    static #addDrunkBuffVisuals(entity, value){
        native.setPedMovementClipset(entity.scriptID, drunkAnimDictionary[value], 1.0);
        native.shakeGameplayCam("DRUNK_SHAKE", value);
    }

    static #removeDrunkBuffVisuals(entity){
        native.resetPedMovementClipset(entity.scriptID, 1.0);
        native.shakeGameplayCam(false);
    }
}