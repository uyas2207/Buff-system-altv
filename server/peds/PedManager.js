import * as alt from 'alt-server';
import * as chat from 'alt:chat';

export class PedManager {
    constructor(defaultPedParameters, pedStorage, npcs){
        this.defaultPedParameters = defaultPedParameters;
        this.npcsDefaultParameters = npcs;
        this.pedStorage = pedStorage;
    }
    
    spawnDefaultNpcs = () =>{
        this.npcsDefaultParameters.forEach(async npc => {
            const ped = new alt.Ped( npc.model, new alt.Vector3(npc.position.x, npc.position.y, npc.position.z), new alt.Vector3(npc.rotation.x, npc.rotation.y, npc.rotation.z));
            ped.dimension = this.defaultPedParameters.dimension;
            ped.invincible = this.defaultPedParameters.invincible;
            ped.health = 150;
            this.pedStorage.addPed(ped);
        });
    }

    //проверка что PedID из команды входит в npcs.length
    isValidPedId(player, arg){
        const pedId = parseInt(arg[0]);
        if (isNaN(pedId) || arg[0].length !== 1 || pedId < 1 || pedId > this.npcsDefaultParameters.length){
            chat.send(player, `Аругментом может быть только целое число от 1 до ${this.npcsDefaultParameters.length}`);
            return false;
        }
        else{
            return pedId;
        }
    }
}


    //ped.collision = defaultPedParameters.collision;  //что бы ped не сталкивались друг с другом (и не сбивали друг другу маршруты) если у них маршруты пересекаются 
    //ped.setMeta('patrolState', 'active')
    //this.ped = ped;
    //await new Promise(resolve => alt.setTimeout(resolve, 1000));
    //alt.log(ped.getMeta('patrolState'));