import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class CommandManager {
    constructor(buffTickManager, buffManager){
        this.buffTickManager = buffTickManager;
        this.buffManager = buffManager;
    }
    
    registerCommands() {
        chat.registerCmd('applyBuff', (player, args) => { // /applyBuff [buffName],[targetType],[targetId],[source],[stacks]
            try {
                this.buffManager.applyBuff(player, ...args);
            } catch (error) {
                alt.logError('Ошибка при добавлении баффа:', error.message);
            }
        });
        
        alt.on('consoleCommand', (command, args) => {
            if (command === 'tick'){
                this.buffTickManager.createGlobalBuffTick();
            }
            if (command === 'untick'){
                this.buffTickManager.removeGlobalBuffTick();
            }
        });
    }
}