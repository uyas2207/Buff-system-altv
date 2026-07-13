import { default as ServerArmorRegenBuff } from '../server/buffs/buffTypes/ServerArmorRegenBuff.js'
import { default as ServerBurningBuff } from '../server/buffs/buffTypes/ServerBurningBuff.js'
import { default as ServerDrunkBuff } from '../server/buffs/buffTypes/ServerDrunkBuff.js'
import { default as ServerEmpBuff } from '../server/buffs/buffTypes/ServerEmpBuff.js'
import { default as ServerFearBuff } from '../server/buffs/buffTypes/ServerFearBuff.js'
import { default as ServerInvisibleBuff } from '../server/buffs/buffTypes/ServerInvisibleBuff.js'
import { default as ServerMedicalHelpBuff } from '../server/buffs/buffTypes/ServerMedicalHelpBuff.js';
import { default as ServerNitroBoostBuff } from '../server/buffs/buffTypes/ServerNitroBoostBuff.js'

export const ServerBuffs = {
    ServerArmorRegenBuff,
    ServerBurningBuff,
    ServerDrunkBuff,
    ServerEmpBuff,
    ServerFearBuff,
    ServerInvisibleBuff,
    ServerMedicalHelpBuff,
    ServerNitroBoostBuff
};

export const BuffIds = {
    ARMOR_REGEN: 'armor_regen',
    DRUNK: 'drunk',
    FEAR: 'fear',
    INVISIBLE: 'invisible',
    MEDICALHELP: 'medical_help',
    BURNING: 'burning',
    NITROBOOST: 'nitro_boost',
    EMP: 'emp'
};
