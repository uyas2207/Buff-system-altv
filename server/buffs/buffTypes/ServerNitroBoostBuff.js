import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class NitroBoost extends ServerBuffBase {
    get id () { return BuffIds.NITROBOOST; }
    get allowedEntities () { return [alt.BaseObjectType.Vehicle]; }
    get stackable () { return false; }
    get maxStacks () { return 1; }

    //методы onApply и onRemove у этого бафа стандартные (просто добавляет и удаляет SyncedMeta) и берутся из ServerBuffBase
}