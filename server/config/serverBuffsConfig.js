import ServerArmorRegenBuff from '../buffs/buffTypes/ServerArmorRegenBuff.js'
import ServerBurningBuff from '../buffs/buffTypes/ServerBurningBuff.js'
import ServerDrunkBuff from '../buffs/buffTypes/ServerDrunkBuff.js'
import ServerEmpBuff from '../buffs/buffTypes/ServerEmpBuff.js'
import ServerFearBuff from '../buffs/buffTypes/ServerFearBuff.js'
import ServerInvisibleBuff from '../buffs/buffTypes/ServerInvisibleBuff.js'
import ServerMedicalHelpBuff from '../buffs/buffTypes/ServerMedicalHelpBuff.js';
import ServerNitroBoostBuff from '../buffs/buffTypes/ServerNitroBoostBuff.js'

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
//время в ms
export const DEFAULT_TICK_INTERVAL = 10000;
export const DEFAULT_BUFF_DURATION = 20000;