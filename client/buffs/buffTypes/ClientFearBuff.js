import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';

export default class ClientFearBuff extends ClientBuffBase {
    static id = 'fear';

    static onEntityCreate(entity, valueAndSource) {
        const value = valueAndSource[0];
        const source = valueAndSource[1];
        this.#handleFearToggle(entity, value, source);
    }

    static onMetaChange(entity, valueAndSource, oldValue) {
        const value = valueAndSource[0];
        const source = valueAndSource[1];
        this.#handleFearToggle(entity, value, source);
    }

    static #handleFearToggle(entity, value, source){
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