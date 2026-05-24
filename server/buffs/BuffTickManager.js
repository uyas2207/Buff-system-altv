import * as alt from 'alt-server';

export class BuffTickManager {
    #globalBuffTick;
    
    static #SYSTEM_TICK_MS = 500;   //стандартное значение времени с каким промежутком выполняется тик бафов
    static #TICK_TOLERANCE_MS = 100; //стандартное значение погрешнисти между тиками

    constructor(activeBuffsStorage, buffManager, serverBuffList) {
        this.activeBuffsStorage = activeBuffsStorage;
        this.buffManager = buffManager;
        this.serverBuffList = serverBuffList;
        this.#globalBuffTick = null;

        this.createGlobalBuffTick();
    }

    createGlobalBuffTick() {
        if(this.#globalBuffTick !== null){
            alt.logError('Попытка задублировать globalBuffTick');
            return;
        }
        this.#globalBuffTick = alt.setInterval(() =>{
            this.#tick();
        }, BuffTickManager.#SYSTEM_TICK_MS);
    }

    removeGlobalBuffTick() {
        if(this.#globalBuffTick === null){
            alt.logError('Попытка удалить несуществующий globalBuffTick');
            return;
        }
        alt.clearInterval(this.#globalBuffTick);
        this.#globalBuffTick = null;
    }
    
    #tick() {
        const now = Date.now();
        const toRemove = [];

        this.activeBuffsStorage.forEachBuff((entity, buffName, instance) => {
            if (!entity.valid) {
                toRemove.push({ entity, buffName });
                return;
            }

            if (now >= instance.expiresAt + BuffTickManager.#TICK_TOLERANCE_MS) {
                toRemove.push({ entity, buffName });
                return;
            }

            const buffInfo = this.serverBuffList.get(buffName);
            
            if (now + BuffTickManager.#TICK_TOLERANCE_MS - instance.lastTickAt >= instance.tickInterval) {                
                buffInfo.onTick?.(entity, instance);
                instance.lastTickAt = now;
            }
        });

        toRemove.forEach(({ entity, buffName }) => {
            this.buffManager.removeBuff(entity, buffName);
        });
    }        
}