import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class DrunkBuff extends ServerBuffBase {
    static id = BuffIds.DRUNK;
    static allowedEntities = [baseObjectType.Player, baseObjectType.Ped];
    static stackable = true;
    static maxStacks = 3;

    static onApply(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, instance.stacks);
        console.log(`[DrunkBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.setSyncedMeta(`${this.id}`, false);
        console.log(`[DrunkBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
        const log = entity.getSyncedMeta(`${this.id}`);
        console.log(log);
    }
}