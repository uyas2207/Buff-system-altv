import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class CommandManager {

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

        alt.on('consoleCommand', (command, ...arg) => {
            if (command === 'getbuffs'){
                alt.emit('get_buffs_all');
            }
            if (command === 'addbuff'){
                alt.emit('add_buff', null, ...arg);
            }
        });
    }
}