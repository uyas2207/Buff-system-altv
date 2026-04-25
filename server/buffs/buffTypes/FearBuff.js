import { BuffBase } from './BuffBase.js'

export class FearBuff extends BuffBase {
    static id = 'fear';
    static allowedEntities = ['Ped'];
    static stackable = false;
    static maxStacks = 1;
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        console.log(`[FearBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        console.log(`[FearBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}