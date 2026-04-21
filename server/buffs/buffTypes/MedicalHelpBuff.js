import { BuffBase } from './BuffBase.js'

export class MedicalHelpBuff extends BuffBase {
    static id              = 'medicalHelp';
    static allowedEntities = ['Player', 'Ped'];
    static stackable       = true;
    static maxStacks       = 3;
//    static tickInterval    = defaultTickInterval;
//    static buffDuration    = defaultBuffDuration;

    static onApply(entity, instance) {
        console.log(`[medicalHelp] Applied to ${entity.id}, stacks: ${instance.stacks}`);
        this.onTick(entity, instance);
    }

    static onTick(entity, instance) {
        if (entity.health < entity.maxHealth) {
            entity.health = Math.min(entity.maxHealth, entity.health + 5 * instance.stacks);
        }
        console.log('entity.health', entity.health);
    }

    static onRemove(entity, instance) {
        console.log(`[medicalHelp] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}