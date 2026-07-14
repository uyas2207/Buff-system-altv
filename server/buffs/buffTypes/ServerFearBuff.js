import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class FearBuff extends ServerBuffBase {
    get id () { return BuffIds.FEAR; }
    get allowedEntities () { return [alt.BaseObjectType.Ped]; }
    get stackable () { return false; }
    get maxStacks () { return 1; }

    onApply(entity, instance) {
        console.log(`TestLog onApply ${this.id}`);
        entity.setStreamSyncedMeta(`${this.id}`, instance.source);
    }
    //метод onRemove у этого бафа стандартный (просто удаляет StreamSyncedMeta) и берется из ServerBuffBase
}