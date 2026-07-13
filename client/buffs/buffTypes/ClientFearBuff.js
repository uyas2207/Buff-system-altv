import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientFearBuff extends ClientBuffBase {
    get id () { return BuffIds.FEAR;}

    onEntityCreate(entity, source) {
        native.taskReactAndFleePed(entity.scriptID, source.scriptID);
    }

    onMetaChange(entity, source) {
        native.taskReactAndFleePed(entity.scriptID, source.scriptID);
    }

    onMetaDelete(entity) {
        native.clearPedTasksImmediately(entity.scriptID);
    }
}