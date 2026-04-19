import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class BuffManager {
    constructor(buffStorage, buffInfoList, baseObjectType, pedStorage) {
        this.buffStorage = buffStorage;
        this.buffInfoList = buffInfoList;
        this.baseObjectType = baseObjectType;

        this.pedStorage = pedStorage;   //для тестов потом надо убрать

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

    validate_TargetType1(targetType){
        //const targetType = parseInt(targetType);
        if(Object.values(this.baseObjectType).includes(targetType)){
            return targetType;
        }
        else{
            return undefined;
        }
        /*
        const maxObjectType = Object.keys(this.baseObjectType).length-1;
        if (isNaN(targetType) || targetType < 0 || targetType > maxObjectType){
            alt.log('Неправильный аругмент, аргументом может быть только целое число от 0 до', maxObjectType);
            return undefined;
        }
        alt.log('Корректный targetType =', targetType);
        return targetType;
        */
    }

    validate_BuffName(buffName){
       if (!(buffName in this.buffInfoList)){
            this.printAllExistingMessage(); //выводит сообщение со списком всех бафов из конфига
            throw new Error(` Бафа ${buffName} не существует`);
       }
    }

    validate_TargetType(targetType){
        if (typeof targetType === "string"){
            targetType = this.baseObjectType[targetType];
        }

        if(!(Object.values(this.baseObjectType).includes(targetType))){
            throw new Error(` targetType ${targetType} не существует в baseObjectType`);
        }
        return targetType;
    }

    validate_targetId(targetType, targetId){
        const entity = alt.BaseObject.getByID(targetType, targetId);

        if(entity === null){
            throw new Error('Ошибка в методе validate_targetId, запрашиваемый entity не существует');
        }

        return entity;
    }
    //alt.BaseObject.getByID(this.baseObjectType[targetType], targetId)
    add_buff(player, arg) {
        const buffName = String(arg[0]);
        let targetType = arg[1];
        const targetId = arg[2];

        let stacksAmmount = 1;    //изначальное значение стаков бафа
        const now = Date.now();

        this.validate_BuffName(buffName);
        targetType = this.validate_TargetType(targetType);
        const entity = this.validate_targetId(targetType, targetId);

        if ((this.isStackableBuff(buffName) === true) && (this.buffStorage.hasActiveBuff(entity, buffName))){
            stacksAmmount = this.getBuffStacksAmmount(entity, buffName) + 1;
        }
        
        const instance = {
            buffName: this.buffInfoList[buffName].name,
            stacks: stacksAmmount,
            appliedAt: now,
            expiresAt: now + this.buffInfoList[buffName].buffDuration,
            tickInterval: this.buffInfoList[buffName].tickInterval,
        };

        this.buffStorage.addBuffToMap(entity, buffName, instance);
    }

    add_buff1(player, arg) {
        const buffName = String(arg[0]);
        let targetType = arg[1];
        const targetId = arg[2];

        let stacksAmmount = 1;    //изначальное значение стаков бафа
        const now = Date.now();
/*
        if (typeof targetType === "string"){
            targetType = this.baseObjectType[targetType];
        }
        else{
            targetType = this.validateTargettype(targetType);
        }
*/
        //this.validateTargettype(targetType);

        if (this.isValidBuff(buffName) !== true) {
            alt.log(` Бафа ${buffName} не существует`);
            this.printAllExistingMessage(); //выводит сообщение со списком всех бафов из конфига
            return;
        }

        const buffParameters = this.buffInfoList[buffName];

        if (!buffParameters.allowedEntities.includes(targetType)){
            alt.logError(`Передан неправильный targetType = ${targetType} для бафа ${buffName}`);
            return;
        }
        
        const entity = alt.BaseObject.getByID(this.baseObjectType[targetType], targetId)
        
        if ((this.isStackableBuff(buffName) === true) && (this.buffStorage.hasActiveBuff(entity, buffName))){
            stacksAmmount = this.getBuffStacksAmmount(entity, buffName) + 1;
        }

        const instance = {
            buffName: buffParameters.name,
            stacks: stacksAmmount,
            appliedAt: now,
            expiresAt: now + buffParameters.buffDuration,
            tickInterval: buffParameters.tickInterval,
        };

        this.buffStorage.addBuffToMap(entity, buffName, instance);

        /*
        switch (targetType) {
            case 'Ped':
                this.add_PedBuff(buffName, targetId, stacksAmmount, buffParameters, now);
                break;
            default:
                alt.logError('Передан несуществующий targetType =', targetType);
        }
        */
    }

    changeTargetType(targetType){
        alt.log('this.baseObjectType[targetType]', this.baseObjectType[targetType]);
        return this.baseObjectType[targetType];
    }

    /*
    add_PedBuff(buffName, targetId, stacksAmmount, buffParameters, now){
        const ped = this.pedStorage.getPed(targetId);
        //const ped =  alt.Ped.getByID(targetId);
        //если баф стакаемый и уже существует то увеличвает колличество стаков на 1
        if ((this.isStackableBuff(buffName) === true) && (this.buffStorage.hasActiveBuff(ped, buffName))){
            stacksAmmount = this.getBuffStacksAmmount(ped, buffName) + 1;
        }

        const instance = {
            buffName: buffParameters.name,
            stacks: stacksAmmount,
            appliedAt: now,
            expiresAt: now + buffParameters.buffDuration,
            tickInterval: buffParameters.tickInterval,
        };

        this.buffStorage.addBuffToMap(ped, buffName, instance);
    
    }
*/
    //выводит сообщение со списком всех бафов из конфига
    printAllExistingMessage(){
        alt.log('Существующие бафы:');
        Object.keys(this.buffInfoList).forEach(buff => {
            alt.log(`${buff}`);
        });
    }

    getBuffStacksAmmount(entity, buffName){
        const currentBuff = this.buffStorage.getEntityBuff(entity, buffName);
        return currentBuff.stacks;
    }

    isStackableBuff(buffName){
        return this.buffInfoList[buffName].stackable;
    }

    isValidBuff(buffName) {
        return buffName in this.buffInfoList;
    }
}