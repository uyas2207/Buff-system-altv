import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class InvisibleBuff extends ServerBuffBase {
    static id = BuffIds.INVISIBLE;
    static allowedEntities = [alt.BaseObjectType.Player, alt.BaseObjectType.Ped];
    static stackable = false;
    static maxStacks = 1;
    //методы onApply и onRemove у этого бафа стандартные (просто добавляет и удаляет SyncedMeta) и берутся из ServerBuffBase
}