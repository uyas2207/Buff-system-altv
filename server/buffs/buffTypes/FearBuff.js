import { BuffBase } from './BuffBase.js'

export default class FearBuff extends BuffBase {
    static id = 'fear';
    static allowedEntities = ['Ped'];
    static stackable = false;
    static maxStacks = 1;
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, true, instance.source);
        console.log(`[FearBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, false);
        console.log(`[FearBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
        
}

console.log('Файл FearBuff импортировался');