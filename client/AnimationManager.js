import * as alt from 'alt-client';
import * as native from 'natives';

import {drunkAnimDictionary} from './config/AnimationConfig.js'

export class AnimationManager {
    constructor(){
        this.animDictionaries = Object.values(drunkAnimDictionary);
        this.#init();
    }

    #init(){
        this.animDictionaries.forEach( async dict => {
            await this.loadAnimSet(dict);
        });
    }
    
    async loadAnimSet(dict) {
        if (native.hasAnimSetLoaded(dict)) {
            return true;
        }

        native.requestAnimSet(dict);
        await new Promise(resolve => alt.setTimeout(resolve, 800));
        const status = native.hasAnimSetLoaded(dict);
        return status;
    }
}