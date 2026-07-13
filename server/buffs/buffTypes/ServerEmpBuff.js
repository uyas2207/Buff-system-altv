import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class EmpBuff extends ServerBuffBase {
    get id () { return BuffIds.EMP; }
    get allowedEntities () { return [alt.BaseObjectType.Vehicle]; }
    get stackable () { return false; }
    get maxStacks () { return 1; }
//так как у двигателя хп = 0 игрок не сможет завести двигатель автомобиля
    onApply(entity) {
        console.log(`TestLog onApply ${this.id}`);
        entity.engineHealth = 0;
        entity.engineOn = false;
    }

    onRemove(entity) {
        console.log(`TestLog onRemove ${this.id}`);
        entity.engineHealth = 1000;
        entity.engineOn = true;
    }
}