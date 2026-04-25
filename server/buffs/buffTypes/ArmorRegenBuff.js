import { BuffBase } from './BuffBase.js'

export class ArmorRegenBuff extends BuffBase {
    static id = 'armorRegen';
    static allowedEntities = ['Player', 'Ped'];
    static stackable = true;
    static maxStacks = 3;
    static maxArmour = 150;
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        console.log(`[ArmorRegenBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
        this.onTick(entity, instance);
    }

    static onTick(entity, instance) {
        if (entity.armour < ArmorRegenBuff.maxArmour) {
            entity.armour = Math.min(ArmorRegenBuff.maxArmour, entity.armour + 5 * instance.stacks);
        }
        console.log('entity.armour', entity.armour);
    }

    static onRemove(entity, instance) {
        console.log(`[ArmorRegenBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}