import * as alt from 'alt-server';

import { BuffBase } from './BuffBase.js'
//import { BuffRegistry } from '../BuffRegistry.js';

export default class MedicalHelpBuff extends BuffBase {
    static id = 'medicalHelp';
    static allowedEntities = ['Player', 'Ped'];
    static stackable = true;
    static maxStacks = 3;
    
    static playersSearchRange = 10;
    static allowedGetEntitiesInRangeTypes = [1]; //Player: 1, Vehicle: 2, Ped: 4, Object: 8 (BaseObjectFilterType)
    
//    static tickInterval = defaultTickInterval;
//    static buffDuration = defaultBuffDuration;

    static onApply(entity, instance) {
        alt.log(`[medicalHelp] Applied to ${entity.id}, stacks: ${instance.stacks}`);
        this.onTick(entity, instance);
    }

    //так как по тз кол-во стаков бафа зависит от кол-ва игроков, но при этом как и у остальных бафов кол-во стаков так же может выстаялться вручную
    //берется максимальное значение, либо кол-во стаков выставленное в ручную либо кол-во игроков в радиусе 10 метров (не больше максимального значения стаков прописанное в конфиге)
    static onTick(entity, instance) {
        const playersInRange = alt.getEntitiesInRange(entity.pos, this.playersSearchRange, entity.dimension, this.allowedGetEntitiesInRangeTypes).length;
        const currentStacksAmmount = Math.min(this.maxStacks, Math.max(playersInRange, instance.stacks));
        alt.log('currentStacksAmmount =', currentStacksAmmount);
        if (entity.health < entity.maxHealth) {
            entity.health = Math.min(entity.maxHealth, entity.health + 5 * currentStacksAmmount);
        }
        alt.log('entity.health', entity.health);
    }

    static onRemove(entity, instance) {
        alt.log(`[medicalHelp] Removed from entity.type:${entity.type}, entity.id:${entity.id}`);
    }
}

console.log('Файл MedicalHelpBuff импортировался');

//BuffRegistry.register(FearBuff);