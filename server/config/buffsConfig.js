//import * as alt from 'alt-server';

import { MedicalHelpBuff } from '../buffs/buffTypes/MedicalHelpBuff.js'
import { DrunkBuff } from '../buffs/buffTypes/DrunkBuff.js'
import { ArmorRegenBuff } from '../buffs/buffTypes/ArmorRegenBuff.js'
import { FearBuff } from '../buffs/buffTypes/FearBuff.js'
import { InvisibleBuff } from '../buffs/buffTypes/InvisibleBuff.js'

//не забыть изменить на 10 секунд
export const defaultTickInterval = 1000;    //время в ms
export const defaultbuffDuration = 2000;    // 60 000 ms = 1 min

export const baseObjectType = {
    Player: 0,
    Vehicle: 1,
    Ped: 2
}

export const buffInfoList = {
[MedicalHelpBuff.id]: MedicalHelpBuff,
[DrunkBuff.id]: DrunkBuff,
[ArmorRegenBuff.id]: ArmorRegenBuff,
[FearBuff.id]: FearBuff,
[InvisibleBuff.id]: InvisibleBuff,
};