import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class InvisibleBuff extends ServerBuffBase {
    get id () { return BuffIds.INVISIBLE; }
    get allowedEntities () { return [alt.BaseObjectType.Player, alt.BaseObjectType.Ped]; }
    get stackable () { return false; }
    get maxStacks () { return 1; }
    //методы onApply и onRemove у этого бафа стандартные (просто добавляет и удаляет StreamSyncedMeta) и берутся из ServerBuffBase
}