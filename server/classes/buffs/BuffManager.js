import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class BuffManager {
    constructor(buffStorage, buffInfoList, pedStorage) {
        this.buffStorage = buffStorage;
        this.buffInfoList = buffInfoList;

        this.pedStorage = pedStorage;   //для тестов потом надо убрать

        this.#registerEventListeners();
    }
    
    #registerEventListeners(){
        alt.on('add_buff', (player, arg) => {
            this.add_buff(player, arg);
        });
        alt.on('remove_buff', (player, arg) => {
            
        });
        alt.on('remove_buff_all', (player, arg) => {
            
        });
        alt.on('get_buffs', (player, arg) => {
            
        });
        //метод для дебага (потом можно убрать)
        alt.on('get_buffs_all', () => {
            this.buffStorage.printAllActiveBuffs();
        });
    }

    add_buff(player, arg) {
        const buffName = String(arg[0]);
        const targetType = arg[1];
        const targetId = arg[2];

        const now = Date.now();

        if (this.isValidBuff(buffName) !== true) {
            alt.log(`{eb4034}Бафа ${buffName} не существует`);
            alt.log('Существующие бафы:');

            Object.keys(this.buffInfoList).forEach(buff => {
                alt.log(`${buff}`);
            });

            return;
        }

        const buffParameters = this.buffInfoList[buffName];

        if (!buffParameters.allowedEntities.includes(targetType)){
            alt.logError(`Передан неправильный targetType = ${targetType} для бафа ${buffName}`);
            return;
        }

        if(targetType === 'Ped'){
            alt.log(targetType === 'Ped');
            const ped = this.pedStorage.getPed(targetId);
        

        //if (){}
        const instance = {
            buffName: buffParameters.name,
            stacks: 1,
            appliedAt: now,
            expiresAt: now + buffParameters.buffDuration,
            tickInterval: buffParameters.tickInterval,
        };

        this.buffStorage.addBuffToMap(ped, buffName, instance);
        }
    }



    isValidBuff(buffName) {
        return buffName in this.buffInfoList;
    }
}