import { DrunkBuffClient } from './buffs/DrunkBuffClient.js'
import { InvisibleBuffClient } from './buffs/InvisibleBuffClient.js'

const handlers = [
    DrunkBuffClient,
    InvisibleBuffClient,
];
export const ClientBuffStorage = new Map(
    //handlers.map(({ handler }) => ({ [key.metaKey]: key }))
    handlers.map((handler) => [handler.metaKey, handler])
);
