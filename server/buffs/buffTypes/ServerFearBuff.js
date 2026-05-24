import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class FearBuff extends ServerBuffBase {
    static id = BuffIds.FEAR;
    static allowedEntities = [alt.BaseObjectType.Ped];
    static stackable = false;
    static maxStacks = 1;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, instance.source);
    }
    //метод onRemove у этого бафа стандартный (просто удаляет SyncedMeta) и берется из ServerBuffBase
}