import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class MedicalHelpBuff extends ServerBuffBase {
    static id = BuffIds.MEDICALHELP;
    static allowedEntities = [alt.BaseObjectType.Player];
    static stackable = true;
    static maxStacks = 3;
    
    static playersSearchRange = 10;
    static allowedGetEntitiesInRangeTypes = [alt.BaseObjectFilterType.Player]; //Player: 1, Vehicle: 2, Ped: 4, Object: 8 (BaseObjectFilterType)
    static hpPerTick = 5;

    static onApply(entity, instance) {
        this.onTick(entity, instance);
    }

    //так как по тз кол-во стаков бафа зависит от кол-ва игроков, но при этом как и у остальных бафов кол-во стаков так же может выстаялться вручную
    //берется максимальное значение, либо кол-во стаков выставленное в ручную либо кол-во игроков в радиусе 10 метров (не больше максимального значения стаков прописанное в конфиге)
    static onTick(entity, instance) {
        const playersInRange = alt.getEntitiesInRange(entity.pos, this.playersSearchRange, entity.dimension, this.allowedGetEntitiesInRangeTypes).length;
        const currentStacksAmmount = Math.min(this.maxStacks, Math.max(playersInRange, instance.stacks));
        if (entity.health < entity.maxHealth) {
            entity.health = Math.min(entity.maxHealth, entity.health + this.hpPerTick * currentStacksAmmount);
        }
    }

    static onRemove() {
        return;
    }
}