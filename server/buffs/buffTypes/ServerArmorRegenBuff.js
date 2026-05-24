import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class ArmorRegenBuff extends ServerBuffBase {
    static id = BuffIds.ARMOR_REGEN;
    static allowedEntities = [alt.BaseObjectType.Player];
    static stackable = true;
    static maxStacks = 3;
    
    static maxArmour = 150;
    static armourPerTick = 5;

    static onApply(entity, instance) {
        this.onTick(entity, instance);
    }

    static onTick(entity, instance) {
        if (entity.armour < this.maxArmour) {
            entity.armour = Math.min(this.maxArmour, entity.armour + instance.stacks * this.armourPerTick);
        }
    }

    static onRemove() {
        return;
    }
}