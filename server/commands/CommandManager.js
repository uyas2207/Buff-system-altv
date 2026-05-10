import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class CommandManager {
    //не забыть убрать constructor и buffTickManager
    constructor(buffTickManager, serverBuffList){
        this.buffTickManager = buffTickManager;
        this.serverBuffList = serverBuffList;
    }
    
    registerCommands() {
        chat.registerCmd('add_buff', (player, arg) => { // /add_buff [buffName],[targetType],[targetId]
            alt.emit('add_buff', player, arg);
        });
        chat.registerCmd('remove_buff', (player, arg) => { // /remove_buff [targetId],[buff] - Удалить бафф у игрока
            alt.emit('remove_buff', player, arg);
        });
        chat.registerCmd('remove_buff_all', (player, arg) => { // /remove_buff_all [buff] - Удалить бафф у всех игроков
            alt.emit('remove_buff_all', player, arg);
        });
        chat.registerCmd('get_buffs', (player, arg) => { // /get_buffs [targetStaticId] - Получить баффы игрока
            alt.emit('get_buffs', player, arg);
        });
        chat.registerCmd('get_buffs_all', () => { // /get_buffs_all - Получить все существующие баффы (команда для дебага потом можно убрать)
            alt.emit('get_buffs_all');
        });

        //дебаг команды, потом удалить
        chat.registerCmd('info', (player, arg) => { // /get_buffs_all - Получить все существующие баффы (команда для дебага потом можно убрать)
            alt.log('arg[0]', arg[0]);
            alt.log('arg[1]', arg[1]);
            alt.log('arg[2]', arg[2]);
            alt.log('arg[3]', arg[3]);
            alt.log('arg[4]', arg[4]);
        });

        chat.registerCmd('test_ped', (player, arg) => { // /get_buffs_all - Получить все существующие баффы (команда для дебага потом можно убрать)
            const id = parseInt(arg[0]);
            const entity = alt.BaseObject.getByID(2, id)
            alt.emitClient(player, 'print_ped_info', entity);
            
        });
        
        alt.on('consoleCommand', (command, ...arg) => {
            if (command === 'get_buffs_all'){
                alt.emit('get_buffs_all');
            }
            if (command === 'tick'){
                this.buffTickManager.create_GlobalBuffTick();
            }
            if (command === 'untick'){
                this.buffTickManager.remove_GlobalBuffTick();
            }
            if (command === 'medicalHelp'){
                alt.emit('add_buff', null, ['medicalHelp', 'Ped', 1, 2]);
            }
            if(command === 'hp'){
                const entity = alt.BaseObject.getByID(2, 1);
                entity.health = 1;
            }
            if(command === 'changeStacksAmmount'){
                const entity = alt.BaseObject.getByID(2, 1);
                const stacks = parseInt(arg[0]);
                alt.log('arg', stacks);
                alt.emit('changeStacksAmmount', entity, 'medicalHelp', stacks);
            }
            if(command === 'bufflist'){
                this.serverBuffList.getAll();
            }
        });
    }
}