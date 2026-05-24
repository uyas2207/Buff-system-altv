import * as alt from 'alt-client';
import * as native from 'natives';

import {drunkAnimDictionary} from './config/AnimationConfig.js'
import {defaultAnimDictionaries} from './config/AnimationConfig.js'

export class AnimationManager {
    constructor(){
        this.animSetDictionaries = Object.values(drunkAnimDictionary);
        this.animDictionaries = defaultAnimDictionaries;
        this.#init();
    }

    #init(){
        this.animSetDictionaries.forEach( async dict => {
            await this.#loadAnimSet(dict);
        });
        this.animDictionaries.forEach( async dict => {
            await this.#loadAnimDict(dict);
        });
    }
    
    async #loadAnimSet(dict) {
        if (native.hasAnimSetLoaded(dict)) {
            return true;
        }

        native.requestAnimSet(dict);
        await new Promise(resolve => alt.setTimeout(resolve, 800));
        const status = native.hasAnimSetLoaded(dict);
        return status;
    }
    
    async #loadAnimDict(dict) {
        if (native.hasAnimDictLoaded(dict)) {
            return true;
        }

        native.requestAnimDict(dict);
        await new Promise(resolve => alt.setTimeout(resolve, 800));
        const status = native.hasAnimDictLoaded(dict);
        return status;
    }
}