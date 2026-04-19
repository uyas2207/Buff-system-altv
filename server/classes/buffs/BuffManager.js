import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class BuffManager {
    constructor(buffStorage, buffInfoList, baseObjectType, pedStorage) {
        this.buffStorage = buffStorage;
        this.buffInfoList = buffInfoList;       //данные из конфига о существующих бафах и их характеристиках
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
            this.buffStorage.printAllActiveBuffs();
        });
    }

    //выводит сообщение со списком всех бафов из конфига
    printAllExistingMessage(){
        alt.log('Существующие бафы:');
        Object.keys(this.buffInfoList).forEach(buff => {
            alt.log(`${buff}`);
        });
    }
    //основной метод класса, проверяет коретность данных и если все правильно записывает баф в класс buffStorage
    add_buff(player, arg) {
        const buffName = String(arg[0]);    //medicalHelp, drunk, armor_regen, fear, invisible
        let targetType = arg[1];            // Player, Vehicle, Ped или сразу BaseObjectType.id (0, 1, 2)
        const targetId = arg[2];            // id entety которому будет назначен баф (например Player с id=2)

        let stacksAmmount = 1;      //изначальное значение стаков бафа
        const now = Date.now();     //время в которое назначен баф
        //проверка коректности полученных данных, если данные некорректные код дальше не идет
        this.#validate_BuffName(buffName);   //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
        targetType = this.#validate_TargetType(targetType);  //переводит Player, Vehicle, Ped в BaseObjectType.id (при необходимости) и проверяет сущетсует ли такой BaseObjectType.id в конифиге, если нет останваливает выполнение кода
        const entity = this.#validate_TargetId(targetType, targetId);    //проверяет существует ли BaseObjectType с таким id на сервере, если да возвращает этот entity, если нет останваливает выполнение кода
        //проверяет можно ли стакать баф и есть ли такой баф на таком энтити, если есть проверяет что количество стаков не больше максимума
        if ((this.#isStackableBuff(buffName) === true) && (this.buffStorage.hasActiveBuff(entity, buffName))){
            stacksAmmount = this.#handleBuffStacking(entity, buffName);  //если количество стаков меньше максимума вернет стак+1, если количество стаков больше или равно максимум вернет знаечние равное текущему кол-ву стаков
        }
        //данные которые будут записаны соответвующему entity в соответсвующий buffName
        const instance = {
            buffName: this.buffInfoList[buffName].name,
            stacks: stacksAmmount,
            appliedAt: now,
            expiresAt: now + this.buffInfoList[buffName].buffDuration,
            tickInterval: this.buffInfoList[buffName].tickInterval,
        };

        this.buffStorage.addBuffToMap(entity, buffName, instance);  //записывает баф в класс buffStorage
    }
    //проверяет существует ли баф с таким названием в конфиге, если нет останваливает выполнение кода
    #validate_BuffName(buffName){
       if (!(buffName in this.buffInfoList)){
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
    //проверяет кол-во стаков, если колчиество не максимальное вернет стак+1, если максимальное вернет то же самое значение которое сейчас стоит у бафа
    #handleBuffStacking(entity, buffName){
        let stacksAmmount = this.#getBuffStacksAmmount(entity, buffName);    //получает текуще кол-во стаков этого бафа на entity
        
        if (stacksAmmount < this.buffInfoList[buffName].maxStacks){
            stacksAmmount++;
        }

        return stacksAmmount
    }
    //получает текуще кол-во стаков бафа buffName на entity
    #getBuffStacksAmmount(entity, buffName){
        return this.buffStorage.getEntityBuff(entity, buffName).stacks;
    }
    //проверяет можно ли стакать баф с таким buffName
    #isStackableBuff(buffName){
        return this.buffInfoList[buffName].stackable;
    }
}