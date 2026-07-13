import * as alt from 'alt-server';

import { defaultPedParameters } from './config/serverPedConfig.js';
import { npcs } from './config/serverPedConfig.js';

import { PedManager } from './peds/PedManager.js';
import { CommandManager } from './commands/CommandManager.js'
import { ActiveBuffsStorage } from './buffs/ActiveBuffsStorage.js'
import { BuffManager } from './buffs/BuffManager.js'
import { BuffTickManager } from './buffs/BuffTickManager.js'

import { default as BuffList } from '../shared/BuffList.js'
import { ServerBuffs } from '../shared/SharedConfig.js'

class BuffServer {
    constructor(){
        this.activeBuffsStorage = new ActiveBuffsStorage();
        this.buffList = new BuffList();

        this.pedManager = new PedManager(defaultPedParameters, npcs);       
        
        this.buffManager = new BuffManager(this.activeBuffsStorage, this.buffList);
        this.buffTickManager = new BuffTickManager(this.activeBuffsStorage, this.buffManager, this.buffList);

        this.commandManager = new CommandManager(this.buffTickManager, this.buffManager);
        this.#init();
    }

    #init(){
        alt.on('playerConnect', (player) => {
            player.spawn(-1269.91, -1438.64, 4.46);
            //this.buffList.sendClientbuffList(player);
        });

        alt.on('resourceStart', async () => {
            this.commandManager.registerCommands();
            //Соберает все файлы из указанных директорий
            //this.buffList.processAllbuffsFiles('./resources/buff-system/server/buffs/buffTypes', './resources/buff-system/client/buffs/buffTypes');
            this.buffList.registerAllBuffTypes(ServerBuffs);
            this.#createDemonstrationScene();
        });
    }

    #createDemonstrationScene(){
        this.pedManager.spawnDefaultNpcs();
        new alt.Vehicle('adder', -1275.78, -1434.56, 4.54, 0, 0, 0.56621);
    }
}

new BuffServer;