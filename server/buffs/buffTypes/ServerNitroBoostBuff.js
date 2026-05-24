import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class NitroBoost extends ServerBuffBase {
    static id = BuffIds.NITROBOOST;
    static allowedEntities = [baseObjectType.Vehicle];
    static stackable = false;
    static maxStacks = 1;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, true);
        console.log(`[NitroBoost] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.deleteSyncedMeta(`${this.id}`);
        console.log(`[NitroBoost] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}