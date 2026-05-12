import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class ArmorRegenBuff extends ServerBuffBase {
    static id = BuffIds.ARMOR_REGEN;
    static allowedEntities = [baseObjectType.Player, baseObjectType.Ped];
    static stackable = true;
    static maxStacks = 3;
    static maxArmour = 150;
    static defaultRegeneration = 5;

    static onApply(entity, instance) {
        console.log(`[ArmorRegenBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
        this.onTick(entity, instance);
    }

    static onTick(entity, instance) {
        if (entity.armour < this.maxArmour) {
            entity.armour = Math.min(this.maxArmour, entity.armour + instance.stacks * this.defaultRegeneration);
        }
        console.log('entity.armour', entity.armour);
    }

    static onRemove(entity, instance) {
        console.log(`[ArmorRegenBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}