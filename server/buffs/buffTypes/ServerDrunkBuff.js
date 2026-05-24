import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class DrunkBuff extends ServerBuffBase {
    static id = BuffIds.DRUNK;
    static allowedEntities = [alt.BaseObjectType.Player];
    static stackable = true;
    static maxStacks = 3;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, instance.stacks);
    }
    //метод onRemove у этого бафа стандартный (просто удаляет SyncedMeta) и берется из ServerBuffBase
}