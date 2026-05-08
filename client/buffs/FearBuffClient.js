import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';

export class FearBuffClient extends ClientBuffBase {
    static metaKey = 'fear';

    static onEntityCreate(entity, value, source) {
        handleFearToggle(entity, value, source);
    }

    static onMetaChange(entity, value, oldValue, source) {
        handleFearToggle(entity, value, source);
    }

    handleFearToggle(entity, value, source){
        if(value === true){
            native.taskReactAndFleePed(entity, source);
        }
        else{
            native.clearPedTasksImmediately(entity);
        }
    }
/*
    static onMetaRemove(entity) {
        native.setEntityVisible(entity, true, true);
    }
*/
}
//clearPedTasksImmediately