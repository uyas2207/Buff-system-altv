import * as alt from 'alt-server';

export class BuffManager {
    constructor(activeBuffsStorage, serverBuffList) {
        this.activeBuffsStorage = activeBuffsStorage;   //класс хранилище активных бафов
        this.serverBuffList = serverBuffList;       //данные о существующих бафах и их характеристиках
    }

    //выводит сообщение со списком всех бафов из ServerBuffList
    printAllBuffs(){
        alt.log('Существующие бафы:');
        this.serverBuffList.forEachBuff((buffClass) => {
            alt.log(`${buffClass.id}`);
        });
    }

    //основной метод класса, проверяет коретность данных и если все правильно записывает баф в класс ActiveBuffsStorage
    applyBuff(player, buffId, targetType, targetId, source, stacks) {
        //проверяет коретность полученных данных 
        const {buff, buffName, entity, stacksAmount, buffSource} = this.#validateAllParameters(player, buffId, targetType, targetId, source, stacks);
        const now = Date.now();     //время в которое назначен баф
        //данные которые будут записаны соответвующему entity в соответсвующий buffName
        const buffInstance = {
            buffName: buff.id,
            stacks: stacksAmount,
            appliedAt: now,
            expiresAt: now + buff.buffDuration,
            lastTickAt: now,
            tickInterval: buff.tickInterval,
            source: buffSource
        };

        this.activeBuffsStorage.addBuffToMap(entity, buffName, buffInstance);  //записывает баф в класс ActiveBuffsStorage
        buff.onApply(entity, buffInstance);
    }
    //удаляет баф из списка активных а классе хранилище ActiveBuffsStorage и вызывает соответсвующий метод бафа на случай удаления
    removeBuff(entity, buffId){
        const buff = this.serverBuffList.get(buffId);
        if (buff === undefined){
            throw new Error(`Бафа ${buffId} не существует в списке serverBuffList`);
        }
        buff.onRemove(entity, buffId);
        this.activeBuffsStorage.removeBuffFromMap(entity, buffId);
    }
    
    hasBuff(entity, buffId){
        return this.activeBuffsStorage.hasActiveBuff(entity, buffId);
    }
    
    getBuffs(entity){
        return this.activeBuffsStorage.getAllEntityBuffs(entity);
    }
    //проверяет коретность полученных данных
    #validateAllParameters(player, buffId, targetType, targetId, source, stacks){
        const buffName = String(buffId);    //medicalHelp, drunk, armor_regen, fear, invisible
        let buffTargetType = targetType;            // Player, Vehicle, Ped или сразу alt.BaseObjectType.id (0, 1, 2)
        const buffTargetId = targetId;            // id entety которому будет назначен баф (например Player с id=2)
        const buffSource = source || player || 'defaulBuffSource';    //источник бафа нужен был по тз, функционал есть только у бафа fear
        let stacksAmount = parseInt(stacks) || 1;      //изначальное значение стаков бафа

        //проверка коректности полученных данных, если данные некорректные код дальше не идет
        
        //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
        this.#validateBuffName(buffName);
        const buff = this.serverBuffList.get(buffName);
        //переводит Player, Vehicle, Ped в alt.BaseObjectType.id (при необходимости) и проверяет сущетсует ли такой alt.BaseObjectType.id в конифиге, если нет останваливает выполнение кода
        buffTargetType = this.#validateTargetType(buffTargetType, buff.allowedEntities);
        //проверяет существует ли alt.BaseObjectType с таким id на сервере, если да возвращает этот entity, если нет останваливает выполнение кода
        const entity = this.#validateTargetId(buffTargetType, buffTargetId);
        //проверяет можно ли стакать баф, если нет то стак будет = 1
        if (buff.stackable === true){
            stacksAmount = this.#calculateStacks(entity, buffName, stacksAmount, buff.maxStacks); //меняет кол-во стаков на бафе если оно не максимальное
        } else { stacksAmount = 1; }
        //если все проверки пройдены возвращает все обработанные значения
        return {buff, buffName, entity, stacksAmount, buffSource};
    }

    //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
    #validateBuffName(buffName){
       if (!this.serverBuffList.has(buffName)) {
            this.printAllBuffs(); //выводит сообщение со списком всех бафов из конфига
            throw new Error(`Бафа ${buffName} не существует`);
       }
    }

    //переводит Player, Vehicle, Ped в alt.BaseObjectType.id (при необходимости) и проверяет сущетсует ли такой alt.BaseObjectType.id в конифиге, если нет останваливает выполнение кода
    #validateTargetType(targetType, allowedEntities){
        //если targetType записан как название из alt.BaseObjectType переводит его в числовое знаенчие по данным из конфига
        if (typeof targetType === "string"){
            targetType = alt.BaseObjectType[targetType];
        }
        if (!allowedEntities.includes(targetType)){
            throw new Error(`alt.BaseObjectType ${targetType} не входит в список разрешенных типов entities`);
        }

        //если такой entity существует то возвращает его уже в числовом формате (если он был текстовым)
        return targetType;
    }

    //проверяет существует ли alt.BaseObjectType с таким id на сервере, если да возвращает этот entity, если нет останваливает выполнение кода
    #validateTargetId(targetType, targetId){
        const entity = alt.BaseObject.getByID(targetType, targetId);

        if(entity === null){
            throw new Error('Ошибка в методе #validateTargetId, запрашиваемый entity не существует');
        }

        return entity;
    }

    //добавляет к текущему кол-ву стаков то количестов стаков которое было передано как stacks
    //если после этого текщуее кол-во становится большек максимально допустимого кол-ва стаков меняет его на максимальное допустимое кол-во стаков
    #calculateStacks(entity, buffName, stacks, maxAllowedStacks){
        let stacksAmount = 0;  //изначальное кол-во стаков бафа в случае если это первая запись о бафе и у него нет никаких стаков
        
        if (this.activeBuffsStorage.hasActiveBuff(entity, buffName)){
            stacksAmount = this.#getStacksAmount(entity, buffName);    //получает текуще кол-во стаков этого бафа на entity
        }

        stacksAmount = Math.min(maxAllowedStacks, stacksAmount + stacks);

        return stacksAmount;
    }

    //получает текуще кол-во стаков бафа buffName на entity
    #getStacksAmount(entity, buffName){
        return this.activeBuffsStorage.getEntityBuff(entity, buffName).stacks;
    }
}