import * as native from 'natives';
import { ClientBuffBase } from './ClientBuffBase.js';
import { BuffIds } from '@shared/SharedConfig.js';

export default class ClientFearBuff extends ClientBuffBase {
    static id = BuffIds.FEAR;

    static onEntityCreate(entity, source) {
        native.taskReactAndFleePed(entity.scriptID, source.scriptID);
    }

    static onMetaChange(entity, source) {
        native.taskReactAndFleePed(entity.scriptID, source.scriptID);
    }

    static onMetaDelete(entity) {
        native.clearPedTasksImmediately(entity.scriptID);
    }
}