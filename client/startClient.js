import * as alt from 'alt-client';

import { AnimationManager } from './AnimationManager.js';
import { ClientBuffManager } from './ClientBuffManager.js';

import ClientBuffList from '@shared/BuffList.js';
import { ClientBuffs } from './config/clientBuffsConfig.js'

class BuffClient {
    constructor(){
        this.animationManager = new AnimationManager(); //при создании пытается загрузить все нужные анимации из конфига анимаций
        this.clientBuffList = new ClientBuffList(); //хрнаит все себе все существующие на клиенте бафы (бафы у которых существует файл для клиентской логики)
        this.clientBuffManager = new ClientBuffManager(this.clientBuffList); //реагриует на изменения syncmeta или создания entity с syncmeta и передает задачу классу с соответвующим id = syncmeta
        this.#init();
    }

    #init(){
        this.clientBuffList.registerAllBuffTypes(ClientBuffs);
    }
}

new BuffClient;