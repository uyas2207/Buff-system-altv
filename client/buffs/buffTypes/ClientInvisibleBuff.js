import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';

export default class ClientInvisibleBuff extends ClientBuffBase {
    static id = 'invisible';

    static onEntityCreate(entity, value) {
        native.setEntityVisible(entity, !value, !value);
    }

    static onMetaChange(entity, value, oldValue) {
        native.setEntityVisible(entity, !value, !value);
    }
/*
    static onMetaRemove(entity) {
        native.setEntityVisible(entity, true, true);
    }
*/
}
console.log('Произошел импорт InvisibleBuffClient');