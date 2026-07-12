import * as alt from 'alt-server';
//для работы с файлами
import * as fs from 'fs';
import path from 'path';

import { default as BuffList } from '@shared/BuffList.js'

const BUFF_FILE_PATTERN = 'Buff.js';

export class ServerBuffList extends BuffList{
    #clientBuffFilesNames;
    constructor(){
        super()
        this.#clientBuffFilesNames = [];
    }
    //Собирает все файлы из указанных директорий, которые заканчиваются на Buff.js
    //запоминает клиентские файлы бафов которые лежат в клиентской директории с клиентской логикой бафов
    //для последующей переадчи на клиент где клиент импортирует файлы с переданными сервером наваниями
    async processAllbuffsFiles(serverBuffsTypesPath, clientBuffsTypesPath){
        const serverBuffsFilesNames = this.#scanBuffFiles(serverBuffsTypesPath, BUFF_FILE_PATTERN);
        this.#clientBuffFilesNames = this.#scanBuffFiles(clientBuffsTypesPath, BUFF_FILE_PATTERN);
        //импортирует все файлы с названиями переданными в массиве files (все файлы должны находится в одной папке)
        await this.registerAllBuffTypes(serverBuffsFilesNames);
    }
    //читает и запоминает фалы в указанной директории с указанным окончанием файла
    #scanBuffFiles(buffTypesPath, endOfFileName){
        const folderpath = path.resolve(buffTypesPath);
        return fs.readdirSync(folderpath).filter(file => file.endsWith(endOfFileName));
    }
    //передает на клиент названия файлов которые лежат в клиентской директории с клиентской логикой бафов что бы клиент импортировал файлы с переданными сервером наваниями
    sendClientBuffList(player){
        alt.emitClient(player, 'buffs:registerClientBuffs', this.#clientBuffFilesNames);
    }
}