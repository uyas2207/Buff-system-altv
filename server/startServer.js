import * as alt from 'alt-server';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';
import { buffInfoList } from '../shared/buffsConfig.js';

import { PedManager } from './classes/peds/PedManager.js';
import { PedStorage } from './classes/peds/PedStorage.js';
import { CommandManager } from './commands/CommandManager.js'
import { BuffStorage } from './classes/buffs/BuffStorage.js'
import { BuffManager } from './classes/buffs/BuffManager.js'

class BuffServer {
    constructor(){
        this.pedStorage = new PedStorage();
        this.pedManager = new PedManager(defaultPedParameters, this.pedStorage, npcs);
        this.commandManager = new CommandManager();
        this.buffStorage = new BuffStorage();
        this.buffManager = new BuffManager(this.buffStorage, buffInfoList, this.pedStorage);


        this.#init();
    }

    #init(){
        alt.on('playerConnect', (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);
        });

        alt.on('resourceStart', async () => {
            this.commandManager.registerCommands();
            this.createDemonstrationScene();
            await new Promise(resolve => alt.setTimeout(resolve, 1000));
            
            alt.emit('add_buff', null, ['fear', 'Ped', 1, 1 ]);
            
            //this.buffStorage.addBuffToMap(1, 'medicalHelp', 1 );
            
            //await new Promise(resolve => alt.setTimeout(resolve, 1000));
            alt.emit('add_buff', null, ['invisible', 'Ped', 1, 1 ]);
            alt.emit('add_buff', null, ['armor_regen', 'Ped', 2, 1 ]);
            this.buffStorage.printAllActiveBuffs();
        });
    }

    createDemonstrationScene(){
        this.pedManager.spawnDefaultNpcs();
        // можно в будущем добавить vehicleManager
        //new alt.Vehicle('benson', -1275.78, -1434.56, 4.54, 0, 0, 0.56621);
    }
}

new BuffServer;