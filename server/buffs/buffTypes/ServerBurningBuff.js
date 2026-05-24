import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class BurningBuff extends ServerBuffBase {
    static id = BuffIds.BURNING;
    static allowedEntities = [alt.BaseObjectType.Player, alt.BaseObjectType.Ped, alt.BaseObjectType.Vehicle];
    static stackable = false;
    static maxStacks = 1;
    //методы onApply и onRemove у этого бафа стандартные (просто добавляет и удаляет SyncedMeta) и берутся из ServerBuffBase
}