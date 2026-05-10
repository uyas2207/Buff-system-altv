import * as alt from 'alt-server';
//для работы с файлами
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';
import { buffInfoList } from './config/buffsConfig.js';
import { baseObjectType } from './config/buffsConfig.js';

import { PedManager } from './peds/PedManager.js';
import { PedStorage } from './peds/PedStorage.js';
import { CommandManager } from './commands/CommandManager.js'
import { ActiveBuffsStorage } from './buffs/ActiveBuffsStorage.js'
import { BuffManager } from './buffs/BuffManager.js'
import { BuffTickManager } from './buffs/BuffTickManager.js'

import { ServerBuffList } from './buffs/ServerBuffList.js'
/*
import { MedicalHelpBuff } from '@buffTypes/MedicalHelpBuff.js'
import { DrunkBuff } from '@buffTypes/DrunkBuff.js'
import { ArmorRegenBuff } from '@buffTypes/ArmorRegenBuff.js'
import { FearBuff } from '@buffTypes/FearBuff.js'
import { InvisibleBuff } from '@buffTypes/InvisibleBuff.js'

import { testShared } from '../shared/shared.js'
*/

class BuffServer {
    constructor(){
        this.activeBuffsStorage = new ActiveBuffsStorage();
        this.pedStorage = new PedStorage();
        this.serverBuffList = new ServerBuffList();

        this.pedManager = new PedManager(defaultPedParameters, this.pedStorage, npcs);       
        
        this.buffManager = new BuffManager(this.activeBuffsStorage, buffInfoList, baseObjectType, this.pedStorage);
        this.buffTickManager = new BuffTickManager(this.activeBuffsStorage, this.buffManager, buffInfoList);


        this.commandManager = new CommandManager(this.buffTickManager, this.serverBuffList);
        //MedicalHelpBuff.onApply();
        this.#init();
    }

    #init(){
        alt.on('playerConnect', (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);

            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emitClient(player, 'client:reciveBuffsMetaKeys', );
            //this.printPedInfo(player);
            //alt.emit('add_buff', null, ['invisible', player, 1, 1 ]);
            //this.activeBuffsStorage.printAllActiveBuffs();
        });

        alt.on('resourceStart', () => {
            this.commandManager.registerCommands();
            this.createDemonstrationScene();
            this.registerAllBuffs('./resources/buff-system/server/buffs/buffTypes');

            //alt.emit('add_buff', null, ['medicalHelp', 'Ped', 1, 1, 1, 1]);
            

            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //this.buffTickManager.create_GlobalBuffTick();
            //alt.emit('add_buff', null, ['fear', 'Ped', 1, 1, 1, 1]);
            
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            //alt.emit('add_buff', null, ['armor_regen', 'Ped', 2, 1 ]);

            //alt.emit('add_buff', null, ['фыв', 'Player', 1, 1 ]);
            this.activeBuffsStorage.printAllActiveBuffs();
            
            
            //this.buffManager.validate_targetId(1, 1);

            
            //alt.log('Object.keys(baseObjectType).length', Object.keys(baseObjectType).length);

            //const tempConst = "Ped";
            //alt.log('baseObjectType.Ped', baseObjectType[tempConst]);
            const ped =  alt.BaseObject.getByID(2, 1);
            //alt.log('ped.id',ped.id);//this.activeBuffsStorage.printSingleBuff(ped);
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

    registerAllBuffs(buffTypesPath){
        //'./resources/buff-system/server/buffs/buffTypes'
        
        //защита от передачи некорректного buffTypesPath, что бы код продолжил работать даже если был передан некорректный адрес расположения классов бафов
        try {
            path.resolve(buffTypesPath);
        } catch (error) {
            alt.logError('error:', error);
        }
        
        const folderpath = path.resolve(buffTypesPath);
        const files = fs.readdirSync(folderpath);

        files.forEach( async file => {
            if (file.endsWith('Buff.js')){
                const calss = await import(`@buffTypes/${file}`);
                this.serverBuffList.register(calss.default);
            };
        });
    }
}

new BuffServer;