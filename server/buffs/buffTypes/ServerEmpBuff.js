import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'
import { baseObjectType } from '@shared/SharedConfig.js'

export default class EmpBuff extends ServerBuffBase {
    static id = BuffIds.EMP;
    static allowedEntities = [baseObjectType.Vehicle];
    static stackable = false;
    static maxStacks = 1;

    static onApply(entity, instance) {
        entity.engineHealth = 0;
        entity.engineOn = false;
        console.log(`[EmpBuff] Applied to ${entity.id}, stacks: ${instance.stacks}`);
    }

    static onRemove(entity, instance) {
        entity.engineHealth = 1000;
        entity.engineOn = true;
        console.log(`[EmpBuff] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}