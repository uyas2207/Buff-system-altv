import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientInvisibleBuff extends ClientBuffBase {
    static id = BuffIds.INVISIBLE;

    static onEntityCreate(entity, value) {
        console.log('onEntityCreate');
        native.setEntityVisible(entity.scriptID, !value, 0);
    }

    static onMetaChange(entity, value, oldValue) {
        console.log('onMetaChange');
        native.setEntityVisible(entity.scriptID, !value, 0);
    }

    static onMetaDelete(entity, value, oldValue) {
        console.log('onMetaDelete');
        native.setEntityVisible(entity.scriptID, true, 0);
    }
}