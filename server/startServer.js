import * as alt from 'alt-server';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';
import { baseObjectType } from './config/buffsConfig.js';

import { PedManager } from './peds/PedManager.js';
import { PedStorage } from './peds/PedStorage.js';
import { CommandManager } from './commands/CommandManager.js'
import { ActiveBuffsStorage } from './buffs/ActiveBuffsStorage.js'
import { BuffManager } from './buffs/BuffManager.js'
import { BuffTickManager } from './buffs/BuffTickManager.js'

import { ServerBuffList } from './buffs/ServerBuffList.js'

import { BuffIds } from '@shared/SharedConfig.js'

class BuffServer {
    constructor(){
        this.activeBuffsStorage = new ActiveBuffsStorage();
        this.pedStorage = new PedStorage();
        this.serverBuffList = new ServerBuffList();

        this.pedManager = new PedManager(defaultPedParameters, this.pedStorage, npcs);       
        
        this.buffManager = new BuffManager(this.activeBuffsStorage, this.serverBuffList, baseObjectType, this.pedStorage);
        this.buffTickManager = new BuffTickManager(this.activeBuffsStorage, this.buffManager, this.serverBuffList);


        this.commandManager = new CommandManager(this.buffTickManager, this.serverBuffList, this.buffManager);

        //MedicalHelpBuff.onApply();
        this.#init();
        console.log('BuffIds.ARMOR_REGEN', BuffIds.ARMOR_REGEN);
    }

    #init(){
        alt.on('playerConnect', (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);
            this.serverBuffList.sendClientBuffList(player);
            //this.serverBuffList.scanBuffFiles('./resources/buff-system/client/buffs/buffTypes', BuffClient);
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emitClient(player, 'client:reciveBuffsMetaKeys', );
            //this.printPedInfo(player);
            //alt.emit('add_buff', null, ['invisible', player, 1, 1 ]);
            //this.activeBuffsStorage.printAllActiveBuffs();
        });

        alt.on('resourceStart', () => {
            this.commandManager.registerCommands();
            this.serverBuffList.processAllbuffsFiles('./resources/buff-system/server/buffs/buffTypes', './resources/buff-system/client/buffs/buffTypes');
            this.createDemonstrationScene();
            //this.serverBuffList.registerAllServerBuffs('./resources/buff-system/server/buffs/buffTypes');
            
            //this.registerAllBuffs('./resources/buff-system/server/buffs/buffTypes');


            //alt.emit('add_buff', null, ['medical_help', 'Ped', 1, 1, 1, 1]);
            

            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //this.buffTickManager.create_GlobalBuffTick();
            //alt.emit('add_buff', null, ['fear', 'Ped', 1, 1, 1, 1]);
            
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            //alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            //alt.emit('add_buff', null, ['armor_regen', 'Ped', 2, 1 ]);

            //alt.emit('add_buff', null, ['фыв', 'Player', 1, 1 ]);
            //this.activeBuffsStorage.printAllActiveBuffs();
            
            
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
/* 
    registerAllBuffs(buffTypesPath){

        const files = this.#scanBuffFiles(buffTypesPath, 'Buff.js');

        files.forEach( async file => {
                const calss = await import(`@BuffTypes/${file}`);
                this.serverBuffList.register(calss.default);
        });
    }

    #scanBuffFiles(buffTypesPath, endOfFileName){
        const folderpath = path.resolve(buffTypesPath);
        return fs.readdirSync(folderpath).filter(file => file.endsWith(endOfFileName));
    }
     */
}

new BuffServer;