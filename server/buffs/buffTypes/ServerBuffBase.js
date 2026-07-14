import { DEFAULT_TICK_INTERVAL } from '../../config/serverBuffsConfig.js'
import { DEFAULT_BUFF_DURATION } from '../../config/serverBuffsConfig.js'

export class ServerBuffBase {

    get id () { return 'defaultServerBuffName'; }
    get allowedEntities () { return []; }
    get stackable () { return false; }
    get maxStacks () { return 1; }
    get tickInterval () { return DEFAULT_TICK_INTERVAL; }
    get buffDuration () { return DEFAULT_BUFF_DURATION; }

    onApply(entity) {
        console.log(`TestLog onApply ${this.id}`);
        entity.setStreamSyncedMeta(`${this.id}`, true);
    }

    onRemove(entity) {
        console.log(`TestLog onRemove ${this.id}`);
        entity.deleteStreamSyncedMeta(`${this.id}`);
    }

    test(){
        console.log(`${this.id}, Test`);
    }
}