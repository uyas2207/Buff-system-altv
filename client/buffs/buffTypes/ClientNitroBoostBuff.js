import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientNitroBoostBuff extends ClientBuffBase {
    static id = BuffIds.NITROBOOST;

    static onEntityCreate(entity) {
        native.setOverrideNitrousLevel(
            entity.scriptID,
            true,
            100,
            100, 
            99999999999, 
            false
        );
    }

    static onMetaChange(entity) {
        native.setOverrideNitrousLevel(
            entity.scriptID,
            true,
            100,
            100, 
            99999999999, 
            false
        );
    }

    static onMetaDelete(entity) {
        native.setOverrideNitrousLevel(entity.scriptID, false, 0, 0, 0, false);
    }
}