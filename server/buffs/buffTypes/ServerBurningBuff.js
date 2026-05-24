import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class BurningBuff extends ServerBuffBase {
    static id = BuffIds.BURNING;
    static allowedEntities = [baseObjectType.Player, baseObjectType.Ped, baseObjectType.Vehicle];
    static stackable = false;
    static maxStacks = 1;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, true);
        console.log(`[InvisibleBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.deleteSyncedMeta(`${this.id}`);
        console.log(`[InvisibleBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}