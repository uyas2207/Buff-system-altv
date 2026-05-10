//import * as alt from 'alt-server';
import { default as MedicalHelpBuff } from '@buffTypes/MedicalHelpBuff.js'
import { default as DrunkBuff } from '@buffTypes/DrunkBuff.js'
import { default as ArmorRegenBuff } from '@buffTypes/ArmorRegenBuff.js'
import { default as FearBuff } from '@buffTypes/FearBuff.js'
import { default as InvisibleBuff } from '@buffTypes/InvisibleBuff.js'
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
