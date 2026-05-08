import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';

export class InvisibleBuffClient extends ClientBuffBase {
    static metaKey = 'invisible';

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