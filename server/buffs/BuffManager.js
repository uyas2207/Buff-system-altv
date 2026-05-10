import * as alt from 'alt-server';

export class BuffManager {
    constructor(activeBuffsStorage, serverBuffList, baseObjectType, pedStorage) {
        this.activeBuffsStorage = activeBuffsStorage;
        this.serverBuffList = serverBuffList;       //данные из конфига о существующих бафах и их характеристиках
        this.baseObjectType = baseObjectType;   //данные из конфига о BaseObjectType.id соответвующие Player, Vehicle, Ped

        this.#registerEventListeners();
    }
    
    #registerEventListeners(){
        alt.on('add_buff', (player, arg) => {
            try {
                this.add_buff(player, arg);
            } catch (error) {
                alt.logError('Ошибка при добавлении баффа:', error.message);
            }
        });
        alt.on('remove_buff', (player, arg) => {
            
        });
        alt.on('remove_buff_all', (player, arg) => {
            
        });
        alt.on('get_buffs', (player, arg) => {
            
        });
        //метод для дебага (потом можно убрать)
        alt.on('get_buffs_all', () => {
            this.activeBuffsStorage.printAllActiveBuffs();
        });

        alt.on('test_stackable', (buffName) => {
            //this.testStacks(buffName);
            const buffClass = this.serverBuffList.get(buffName);
            //buffClass.onApply();
/* 
            console.log('buffClass.stackable', buffClass.stackable);
            console.log('buffClass.id', buffClass.id);
            console.log('buffClass.buffDuration', buffClass.buffDuration);
            console.log('buffClass.tickInterval', buffClass.tickInterval);
            console.log('buffClass.maxStacks', buffClass.maxStacks);
 */
        });
    }

    testStacks(buffName){
        this.serverBuffList.testStackable(buffName);
    }

    //выводит сообщение со списком всех бафов из ServerBuffList
    printAllExistingMessage(){
        alt.log('Существующие бафы:');
        this.serverBuffList.forEachBuff((buffClass) => {
            alt.log(`${buffClass.id}`);
        });
    }
    //основной метод класса, проверяет коретность данных и если все правильно записывает баф в класс ActiveBuffsStorage
    add_buff(player, args) {
        const buffName = String(args[0]);    //medicalHelp, drunk, armor_regen, fear, invisible
        let targetType = args[1];            // Player, Vehicle, Ped или сразу BaseObjectType.id (0, 1, 2)
        const targetId = args[2];            // id entety которому будет назначен баф (например Player с id=2)
        let stacksAmmount = parseInt(args[3]) || 1;      //изначальное значение стаков бафа
        const source =  args[4] || player;    //источник бафа нужен был по тз, функционал есть только у бафа fear
        const now = Date.now();     //время в которое назначен баф

        //проверка коректности полученных данных, если данные некорректные код дальше не идет
        
        //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
        this.#validate_BuffName(buffName);  
        //переводит Player, Vehicle, Ped в BaseObjectType.id (при необходимости) и проверяет сущетсует ли такой BaseObjectType.id в конифиге, если нет останваливает выполнение кода
        targetType = this.#validate_TargetType(targetType);
        //проверяет существует ли BaseObjectType с таким id на сервере, если да возвращает этот entity, если нет останваливает выполнение кода
        const entity = this.#validate_TargetId(targetType, targetId);

        const buff = this.serverBuffList.get(buffName);

        //проверяет можно ли стакать баф, если нет то стак будет = 1
        if (buff.stackable === true){
            stacksAmmount = this.#handleBuffStacking(entity, buffName, stacksAmmount, buff.maxStacks); //меняет кол-во стаков на бафе если оно не максимальное
        } else { stacksAmmount = 1; }
        //данные которые будут записаны соответвующему entity в соответсвующий buffName
        const instance = {
            buffName: buff.id,
            stacks: stacksAmmount,
            appliedAt: now,
            expiresAt: now + buff.buffDuration,
            lastTickAt: now,
            tickInterval: buff.tickInterval,
            source: source
        };

        this.activeBuffsStorage.addBuffToMap(entity, buffName, instance);  //записывает баф в класс ActiveBuffsStorage
        buff.onApply(entity, instance);
    }

    removeBuff(entity, buffName){
        const buff = this.serverBuffList.get(buffName);
        buff.onRemove(entity, buffName);
        this.activeBuffsStorage.removeBuffFromMap(entity, buffName);
    }
    //изменяет кол-во стаков у бафа в ActiveBuffsStorage при этом не изменяя его время завершения
    changeStacksAmmountInMap(entity, buffName, newStacks){
        this.activeBuffsStorage.changeStacksAmmount(entity, buffName, newStacks);
    }

    //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
    #validate_BuffName(buffName){
       if (!this.serverBuffList.has(buffName)) {
            this.printAllExistingMessage(); //выводит сообщение со списком всех бафов из конфига
            throw new Error(`Бафа ${buffName} не существует`);
       }
    }
    //переводит Player, Vehicle, Ped в BaseObjectType.id (при необходимости) и проверяет сущетсует ли такой BaseObjectType.id в конифиге, если нет останваливает выполнение кода
    #validate_TargetType(targetType){
        //если targetType записан как название из baseObjectType переводит его в числовое знаенчие по данным из конфига
        if (typeof targetType === "string"){
            targetType = this.baseObjectType[targetType];
        }
        //проверяет существует ли такой тип entity в конфиге если нет выдает ошибку и код дальше не идет 
        if(!(Object.values(this.baseObjectType).includes(targetType))){
            throw new Error(` targetType ${targetType} не существует в baseObjectType`);
        }
        //если такой entity существует то возвращает его уже в числовом формате (если он был текстовым)
        return targetType;
    }
    //проверяет существует ли BaseObjectType с таким id на сервере, если да возвращает этот entity, если нет останваливает выполнение кода
    #validate_TargetId(targetType, targetId){
        const entity = alt.BaseObject.getByID(targetType, targetId);

        if(entity === null){
            throw new Error('Ошибка в методе #validate_TargetId, запрашиваемый entity не существует');
        }

        return entity;
    }

    #validate_stacksAmmount(stacksAmmount){
        alt.log('stacksAmmount', stacksAmmount);
        alt.log('typeof stacksAmmount', typeof stacksAmmount);
        if (typeof stacksAmmount !== "number"){
            throw new Error('Ошибка в методе #validate_stacksAmmount, stacksAmmount !== "number"');
        }
    }
    //добавляет к текущему кол-ву стаков то количестов стаков которое было передано как stacks
    //если после этого текщуее кол-во становится большек максимально допустимого кол-ва стаков меняет его на максимальное допустимое кол-во стаков
    #handleBuffStacking(entity, buffName, stacks, maxAllowedStacks){
        let stacksAmmount = 0;  //изначальное кол-во стаков бафа в случае если это первая запись о бафе и у него нет никаких стаков
        //const maxAllowedStacks = this.buffInfoList[buffName].maxStacks;
        if (this.activeBuffsStorage.hasActiveBuff(entity, buffName)){
            stacksAmmount = this.#getBuffStacksAmmount(entity, buffName);    //получает текуще кол-во стаков этого бафа на entity
        }

        stacksAmmount = Math.min(maxAllowedStacks, stacksAmmount + stacks);

        return stacksAmmount;
    }
    //получает текуще кол-во стаков бафа buffName на entity
    #getBuffStacksAmmount(entity, buffName){
        return this.activeBuffsStorage.getEntityBuff(entity, buffName).stacks;
    }
    //проверяет можно ли стакать баф с таким buffName
    #isStackableBuff(buffName){
        //return this.buffInfoList[buffName].stackable;
    }
}