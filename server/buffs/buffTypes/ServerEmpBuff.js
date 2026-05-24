import * as alt from 'alt-server';

import { ServerBuffBase } from './ServerBuffBase.js'
import { BuffIds } from '@shared/SharedConfig.js'

export default class EmpBuff extends ServerBuffBase {
    static id = BuffIds.EMP;
    static allowedEntities = [alt.BaseObjectType.Vehicle];
    static stackable = false;
    static maxStacks = 1;
//так как у двигателя хп = 0 игрок не сможет завести двигатель автомобиля
    static onApply(entity) {
        entity.engineHealth = 0;
        entity.engineOn = false;
    }

    static onRemove(entity) {
        entity.engineHealth = 1000;
        entity.engineOn = true;
    }
}