import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class ArmorRegenBuff extends ServerBuffBase {
    get id () { return BuffIds.ARMOR_REGEN; }
    get allowedEntities () { return [alt.BaseObjectType.Player]; }
    get stackable () { return true; }
    get maxStacks () { return 3; }
    
    get maxArmour () { return 150; }
    get armourPerTick () { return 5; }

    onApply(entity, instance) {
        console.log(`TestLog onApply ${this.id}`);
        this.onTick(entity, instance);
    }

    onTick(entity, instance) {
        console.log(`TestLog onTick ${this.id}`);
        if (entity.armour < this.maxArmour) {
            entity.armour = Math.min(this.maxArmour, entity.armour + instance.stacks * this.armourPerTick);
        }
    }

    onRemove() {
        console.log(`TestLog onRemove ${this.id}`);
        return;
    }
}