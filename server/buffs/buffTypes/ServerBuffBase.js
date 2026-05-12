import { defaultTickInterval } from '../../config/buffsConfig.js'
import { defaultbuffDuration } from '../../config/buffsConfig.js'

export class ServerBuffBase {
    static id = 'defaultBuffName';
    static allowedEntities = [];
    static stackable = false;
    static maxStacks = 1;
    static tickInterval = defaultTickInterval;
    static buffDuration = defaultbuffDuration;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, true);
        console.log(`[Buff ${id}] empty onApply`);
    }

    static onRemove(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, false);
        console.log(`[Buff ${id}] empty onRemove`);
    }
}