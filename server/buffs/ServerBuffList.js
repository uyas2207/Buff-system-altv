import * as alt from 'alt-server';
//для работы с файлами
import * as fs from 'fs';
import path from 'path';

import { default as BuffList } from '@shared/BuffList.js'

export class ServerBuffList extends BuffList{
    #clientBuffFilesNames;
    constructor(){
        super()
        this.#clientBuffFilesNames = [];
    }

    async processAllbuffsFiles(serverBuffsTypesPath, clientBuffsTypesPath){
        const serverBuffsFilesNames = this.#scanBuffFiles(serverBuffsTypesPath, 'Buff.js');
        this.#clientBuffFilesNames = this.#scanBuffFiles(clientBuffsTypesPath, 'Buff.js');
        await this.registerAllBuffTypes(serverBuffsFilesNames);
    }

    #scanBuffFiles(buffTypesPath, endOfFileName){
        const folderpath = path.resolve(buffTypesPath);
        return fs.readdirSync(folderpath).filter(file => file.endsWith(endOfFileName));
    }

    sendClientBuffList(player){
        alt.emitClient(player, 'buffs:registerClientBuffs', this.#clientBuffFilesNames);
    }
}