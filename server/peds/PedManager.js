import * as alt from 'alt-server';

export class PedManager {
    constructor(defaultPedParameters, npcs){
        this.defaultPedParameters = defaultPedParameters;
        this.npcsDefaultParameters = npcs;
    }
    
    spawnDefaultNpcs = () =>{
        this.npcsDefaultParameters.forEach(async npc => {
            const ped = new alt.Ped( npc.model, new alt.Vector3(npc.position.x, npc.position.y, npc.position.z), new alt.Vector3(npc.rotation.x, npc.rotation.y, npc.rotation.z));
            ped.dimension = this.defaultPedParameters.dimension;
            ped.invincible = this.defaultPedParameters.invincible;
            ped.health = ped.maxHealth;
        });
    }
}