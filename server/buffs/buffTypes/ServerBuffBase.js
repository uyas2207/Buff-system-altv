import { DEFAULT_TICK_INTERVAL } from '../../config/buffsConfig.js'
import { DEFAULT_BUFF_DURATION } from '../../config/buffsConfig.js'

export class ServerBuffBase {
    static id = 'defaultBuffName';
    static allowedEntities = [];
    static stackable = false;
    static maxStacks = 1;
    static tickInterval = DEFAULT_TICK_INTERVAL;
    static buffDuration = DEFAULT_BUFF_DURATION;

    static onApply(entity) {
        entity.setSyncedMeta(`${this.id}`, true);
    }

    static onRemove(entity) {
        entity.deleteSyncedMeta(`${this.id}`);
    }
}