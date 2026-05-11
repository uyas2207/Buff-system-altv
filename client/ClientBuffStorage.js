import { DrunkBuffClient } from './buffs/buffTypes/ClientDrunkBuff.js'
import { InvisibleBuffClient } from './buffs/buffTypes/ClientInvisibleBuff.js'

const handlers = [
    DrunkBuffClient,
    InvisibleBuffClient,
];
export const ClientBuffStorage = new Map(
    //handlers.map(({ handler }) => ({ [key.metaKey]: key }))
    handlers.map((handler) => [handler.metaKey, handler])
);
