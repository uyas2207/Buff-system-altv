import { BuffBase } from './BuffBase.js'

export class DrunkBuff extends BuffBase {
    static id = 'drunk';
    static allowedEntities = ['Player', 'Ped'];
    static stackable = true;
    static maxStacks = 3;
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        console.log(`[DrunkBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        console.log(`[DrunkBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}