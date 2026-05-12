import * as alt from 'alt-server';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';
import { baseObjectType } from '@shared/SharedConfig.js';

import { PedManager } from './peds/PedManager.js';
import { CommandManager } from './commands/CommandManager.js'
import { ActiveBuffsStorage } from './buffs/ActiveBuffsStorage.js'
import { BuffManager } from './buffs/BuffManager.js'
import { BuffTickManager } from './buffs/BuffTickManager.js'

import { ServerBuffList } from './buffs/ServerBuffList.js'

class BuffServer {
    constructor(){
        this.activeBuffsStorage = new ActiveBuffsStorage();
        this.serverBuffList = new ServerBuffList();

        this.pedManager = new PedManager(defaultPedParameters, npcs);       
        
        this.buffManager = new BuffManager(this.activeBuffsStorage, this.serverBuffList, baseObjectType);
        this.buffTickManager = new BuffTickManager(this.activeBuffsStorage, this.buffManager, this.serverBuffList);


        this.commandManager = new CommandManager(this.buffTickManager, this.serverBuffList, this.buffManager);
        this.#init();
    }

    #init(){
        alt.on('playerConnect', (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);
            this.serverBuffList.sendClientBuffList(player);
        });

        alt.on('resourceStart', () => {
            this.commandManager.registerCommands();
            this.serverBuffList.processAllbuffsFiles('./resources/buff-system/server/buffs/buffTypes', './resources/buff-system/client/buffs/buffTypes');
            this.createDemonstrationScene();
        });
    }

    createDemonstrationScene(){
        this.pedManager.spawnDefaultNpcs();
        // можно в будущем добавить vehicleManager
        //new alt.Vehicle('benson', -1275.78, -1434.56, 4.54, 0, 0, 0.56621);
    }
}

new BuffServer;