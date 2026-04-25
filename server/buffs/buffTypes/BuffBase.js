//import { defaultTickInterval } from '../../config/buffsConfig.js'
//import { defaultbuffDuration } from '../../config/buffsConfig.js'
//все методы и переменные статик что бы не нужно было создавать экземпляр класса и передавать его в другие классы
export class BuffBase {
    static id = 'defaultBuffName';
    static allowedEntities = [];
    static stackable = false;
    static maxStacks = 1;
    static tickInterval = 1000;
    static buffDuration = 5000;

    static onApply(entity, instance) {
        console.log(`[Buff ${id}] empty onApply`);
    }

    static onRemove(entity, instance) {
        console.log(`[Buff ${id}] empty onRemove`);
    }
}