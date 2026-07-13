import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class DrunkBuff extends ServerBuffBase {
    get id () { return BuffIds.DRUNK; }
    get allowedEntities () { return [alt.BaseObjectType.Player]; }
    get stackable () { return true; }
    get maxStacks () { return 3; }

    onApply(entity, instance) {
        console.log(`TestLog onApply ${this.id}`);
        entity.setSyncedMeta(`${this.id}`, instance.stacks);
    }
    //метод onRemove у этого бафа стандартный (просто удаляет SyncedMeta) и берется из ServerBuffBase
}