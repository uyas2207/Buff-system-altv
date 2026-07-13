import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class MedicalHelpBuff extends ServerBuffBase {
    get id () { return BuffIds.MEDICALHELP; }
    get allowedEntities () { return [alt.BaseObjectType.Player]; }
    get stackable () { return true; }
    get maxStacks () { return 3; }
    
    get playersSearchRange () { return 10; }
    get allowedGetEntitiesInRangeTypes () { return [alt.BaseObjectFilterType.Player]; } //Player: 1, Vehicle: 2, Ped: 4, Object: 8 (BaseObjectFilterType)
    get hpPerTick () { return 5; }

    onApply(entity, instance) {
        console.log(`TestLog onApply ${this.id}`);
        this.onTick(entity, instance);
    }

    //так как по тз кол-во стаков бафа зависит от кол-ва игроков, но при этом как и у остальных бафов кол-во стаков так же может выстаялться вручную
    //берется максимальное значение, либо кол-во стаков выставленное в ручную либо кол-во игроков в радиусе 10 метров (не больше максимального значения стаков прописанное в конфиге)
    onTick(entity, instance) {
        console.log(`TestLog onTick ${this.id}`);
        const playersInRange = alt.getEntitiesInRange(entity.pos, this.playersSearchRange, entity.dimension, this.allowedGetEntitiesInRangeTypes).length;
        const currentStacksAmmount = Math.min(this.maxStacks, Math.max(playersInRange, instance.stacks));
        if (entity.health < entity.maxHealth) {
            entity.health = Math.min(entity.maxHealth, entity.health + this.hpPerTick * currentStacksAmmount);
        }
    }

    onRemove() {
        console.log(`TestLog onRemove ${this.id}`);
        return;
    }
}