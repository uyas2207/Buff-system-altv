import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class InvisibleBuff extends ServerBuffBase {
    static id = BuffIds.INVISIBLE;
    static allowedEntities = [baseObjectType.Player, baseObjectType.Ped];
    static stackable = false;
    static maxStacks = 1;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, true);
        console.log(`[InvisibleBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, false);
        console.log(`[InvisibleBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}