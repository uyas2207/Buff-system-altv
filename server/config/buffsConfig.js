//import * as alt from 'alt-server';

import { MedicalHelpBuff } from '../buffs/buffTypes/MedicalHelpBuff.js'

//не забыть изменить на 10 секунд
export const defaultTickInterval = 1000;    //время в ms
export const defaultbuffDuration = 2000; // 60 000 ms = 1 min

export const baseObjectType = {
    Player: 0,
    Vehicle: 1,
    Ped: 2
}

export const buffInfoList = {
[MedicalHelpBuff.id]: MedicalHelpBuff,
    drunk: 
        {
            id: 'drunk',
            allowedEntities: 'Vehicle',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    armor_regen: 
        {
            id: 'armor_regen',
            allowedEntities: 'Ped',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    fear:  
        {
            id: 'fear',
            allowedEntities: 'Ped',
            stackable: true,
            maxStacks: 3,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration
        },
    invisible:
        {
            id: 'invisible',
            allowedEntities: ['Player', 'Ped'],
            stackable: false,
            tickInterval: defaultTickInterval,
            buffDuration: defaultbuffDuration,
            
            onApply(entity, instance) {
                console.log(`[Buff invisible] empty onApply`);
            },

            onTick(entity, instance) {
                console.log(`[Buff invisible] empty onTick`);
            },

            onRemove(entity, instance) {
                console.log(`[Buff invisible] empty onRemove`);
            }
        }
};

