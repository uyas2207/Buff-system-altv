import * as alt from 'alt-server';

export class BuffTickManager {
    #globalBuffTick;

    constructor(buffStorage, buffManager, buffInfoList) {
        this.buffStorage = buffStorage;
        this.buffManager = buffManager;
        this.buffInfoList = buffInfoList;

        //можно будет вынести в конфиг
        this.system_tick_ms = 500;  //стандартное значение времени с каким промежутком выполняется тик бафов

        this.#globalBuffTick = null;

        this.create_GlobalBuffTick();
    }

    create_GlobalBuffTick() {
        this.#globalBuffTick = alt.setInterval(() =>{
            this.tick();
        }, this.system_tick_ms);
    }

    remove_GlobalBuffTick() {
        alt.clearInterval(this.#globalBuffTick);
        this.#globalBuffTick = null;
    }
//        alt.log('tick');
    tick() {

        const now = Date.now();

        const toRemove = [];

        this.buffStorage.forEachBuff((entity, buffName, instance) => {
            
            if (!entity.valid) {
                toRemove.push({ entity, buffName });
                return;
            }

            if (now >= instance.expiresAt + 100) {
                toRemove.push({ entity, buffName });
                return;
            }

            const buffInfo = this.buffInfoList[buffName];

            if (now - instance.lastTickAt >= instance.tickInterval) {
                buffInfo.onTick(entity, instance);
                instance.lastTickAt = now;
            }

        });

        toRemove.forEach(({ entity, buffName }) => {
            this.buffManager.removeBuff(entity, buffName);
        });
    }
    //          if (!buffInfo?.onTick) return;
}