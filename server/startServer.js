import * as alt from 'alt-server';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';
import { buffInfoList } from './config/buffsConfig.js';
import { baseObjectType } from './config/buffsConfig.js';

import { PedManager } from './peds/PedManager.js';
import { PedStorage } from './peds/PedStorage.js';
import { CommandManager } from './commands/CommandManager.js'
import { BuffStorage } from './buffs/BuffStorage.js'
import { BuffManager } from './buffs/BuffManager.js'
import { BuffTickManager } from './buffs/BuffTickManager.js'

class BuffServer {
    constructor(){
        this.buffStorage = new BuffStorage();
        this.pedStorage = new PedStorage();  
        this.pedManager = new PedManager(defaultPedParameters, this.pedStorage, npcs);       
        
        this.buffManager = new BuffManager(this.buffStorage, buffInfoList, baseObjectType, this.pedStorage);
        this.buffTickManager = new BuffTickManager(this.buffStorage, this.buffManager, buffInfoList);
        
        this.commandManager = new CommandManager(this.buffTickManager);
        
        this.#init();
    }

    #init(){
        alt.on('playerConnect', async (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);
            
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emitClient(player, 'client:reciveBuffsMetaKeys', );
            //this.printPedInfo(player);
            //alt.emit('add_buff', null, ['invisible', player, 1, 1 ]);
            //this.buffStorage.printAllActiveBuffs();
        });

        alt.on('resourceStart', async () => {
            this.commandManager.registerCommands();
            this.createDemonstrationScene();

            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //this.buffTickManager.create_GlobalBuffTick();
            //alt.emit('add_buff', null, ['fear', 'Ped', 1, 1, 1, 1]);
            
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            alt.emit('add_buff', null, ['medicalHelp', 'Ped', 1, 1, 1, 1]);
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            //alt.emit('add_buff', null, ['armor_regen', 'Ped', 2, 1 ]);

            //alt.emit('add_buff', null, ['фыв', 'Player', 1, 1 ]);
            this.buffStorage.printAllActiveBuffs();
            
            
            //this.buffManager.validate_targetId(1, 1);

            
            //alt.log('Object.keys(baseObjectType).length', Object.keys(baseObjectType).length);

            //const tempConst = "Ped";
            //alt.log('baseObjectType.Ped', baseObjectType[tempConst]);
            const ped =  alt.BaseObject.getByID(2, 1);
            //alt.log('ped.id',ped.id);//this.buffStorage.printSingleBuff(ped);
            //alt.log("\n alt.Ped.getByID(1)", ped.);
            //this.printPedInfo(ped);
            //alt.log('ped.type', ped.type);
            //alt.log('BaseObjectType', alt.BaseObject.getByID(2, 1));
            //alt.log(`\n ped.type = ${baseObjectType[ped.type]}`);

            //const range = 10;
            //const allowedTypes = 2;
            //const dimension = ped.dimension;
            //const position = ped.pos;
//            alt.getEntitiesInRange(position, range, dimension, allowedTypes);
            //alt.log('alt.getEntitiesInRange(position, range, dimension, allowedTypes).count =', alt.getEntitiesInRange(position, range, dimension, allowedTypes).length);
        });
    }

    printPedInfo(data){
        alt.log("=== ВСЁ О PED ===");
        for (let key in data) {
            try {
                alt.log(`${key} = ${data[key]}`);
            } catch (error) {
                // нужно что бы код продолжил выполняться после ошибки если она будет
            }
        }
    }

    createDemonstrationScene(){
        this.pedManager.spawnDefaultNpcs();
        // можно в будущем добавить vehicleManager
        //new alt.Vehicle('benson', -1275.78, -1434.56, 4.54, 0, 0, 0.56621);
    }
}

new BuffServer;