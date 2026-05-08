import * as alt from 'alt-client';
import * as native from 'natives';

import {drunkAnimDictionary} from './config/AnimationConfig.js'

export class AnimationManager {
    constructor(){
        this.animSeDictionary = Object.values(drunkAnimDictionary);
        this.#init();
    }

    #init(){

        this.animSeDictionary.forEach( async dict => {
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
        alt.log(`native.hasAnimSetLoaded(${dict}): ${status}`);
        return status;
    }
}