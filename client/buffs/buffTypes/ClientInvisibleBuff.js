import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientInvisibleBuff extends ClientBuffBase {
    get id () { return BuffIds.INVISIBLE;}

    onEntityCreate(entity, value) {
        native.setEntityVisible(entity.scriptID, !value, 0);
    }

    onMetaChange(entity, value) {
        native.setEntityVisible(entity.scriptID, !value, 0);
    }

    onMetaDelete(entity) {
        native.setEntityVisible(entity.scriptID, true, 0);
    }
}