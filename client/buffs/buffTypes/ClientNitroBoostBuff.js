import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientNitroBoostBuff extends ClientBuffBase {
    get id () { return BuffIds.NITROBOOST; }

    onEntityCreate(entity) {
        native.setOverrideNitrousLevel(
            entity.scriptID,
            true,
            100,
            100, 
            99999999999, 
            false
        );
    }

    onMetaChange(entity) {
        native.setOverrideNitrousLevel(
            entity.scriptID,
            true,
            100,
            100, 
            99999999999, 
            false
        );
    }

    onMetaDelete(entity) {
        native.setOverrideNitrousLevel(entity.scriptID, false, 0, 0, 0, false);
    }
}