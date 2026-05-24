import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientFearBuff extends ClientBuffBase {
    static id = BuffIds.FEAR;

    static onEntityCreate(entity, source) {
        native.taskReactAndFleePed(entity.scriptID, source);
    }

    static onMetaChange(entity, source, oldValue) {
        native.taskReactAndFleePed(entity.scriptID, source);
    }

    static onMetaDelete(entity, value, oldValue) {
        native.clearPedTasksImmediately(entity.scriptID);
    }

/*     static #handleFearToggle(entity, value, source){
        if(value === true){
            native.taskReactAndFleePed(entity.scriptID, source);
        }
        else{
            native.clearPedTasksImmediately(entity.scriptID);
        }
    } */
}