import * as alt from 'alt-server';

export class BuffTickManager {
    #globalBuffTick;
    
    static #SYSTEM_TICK_MS = 500;   //стандартное значение времени с каким промежутком выполняется тик бафов

    constructor(activeBuffsStorage, buffManager, serverBuffList) {
        this.activeBuffsStorage = activeBuffsStorage;
        this.buffManager = buffManager;
        this.serverBuffList = serverBuffList;
        this.#globalBuffTick = null;

        //this.create_GlobalBuffTick();
    }

    create_GlobalBuffTick() {
        this.#globalBuffTick = alt.setInterval(() =>{
            this.tick();
        }, BuffTickManager.#SYSTEM_TICK_MS);
    }

    remove_GlobalBuffTick() {
        alt.clearInterval(this.#globalBuffTick);
        this.#globalBuffTick = null;
    }
    
    tick() {
        const now = Date.now();
        const TICK_TOLERANCE_MS = 100;
        const toRemove = [];

        this.activeBuffsStorage.forEachBuff((entity, buffName, instance) => {
            if (!entity.valid) {
                toRemove.push({ entity, buffName });
                return;
            }

            if (now >= instance.expiresAt + TICK_TOLERANCE_MS) {
                toRemove.push({ entity, buffName });
                return;
            }

            const buffInfo = this.serverBuffList.get(buffName);
            
            if (now + TICK_TOLERANCE_MS - instance.lastTickAt >= instance.tickInterval) {
                
                //alt.log('now', new Date(now).toLocaleString());
                //alt.log('instance.lastTickAt', new Date(instance.lastTickAt).toLocaleString());
                //alt.log('instance.tickInterval', new Date(instance.tickInterval).toLocaleString());
                //alt.log('instance.expiresAt', new Date(instance.expiresAt).toLocaleString());
                
                buffInfo.onTick?.(entity, instance);
                instance.lastTickAt = now;
            }
            
        });

        toRemove.forEach(({ entity, buffName }) => {
            this.buffManager.removeBuff(entity, buffName);
        });
    }
    //if(typeof buffInfo.onTick !== 'function')
    
}