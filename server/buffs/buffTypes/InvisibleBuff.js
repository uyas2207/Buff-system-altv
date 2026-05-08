import { BuffBase } from './BuffBase.js'

export class InvisibleBuff extends BuffBase {
    static id = 'invisible';
    static allowedEntities = ['Player', 'Ped'];
    static stackable = false;
    static maxStacks = 1;
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        //entity.visible = false;
        entity.setSyncedMeta(`${this.id}`, true);
        console.log(`[InvisibleBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        //entity.visible = true;
        entity.setSyncedMeta(`${this.id}`, false);
        console.log(`[InvisibleBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}