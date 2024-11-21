import { ExposedThing, Servient } from "@node-wot/core";
import { SituatedThing } from "./SituatedThing";
import { Thing } from "./Thing";

export abstract class PeriodicThing extends SituatedThing {

    protected period : number;        

    constructor(servient: Servient, 
                init: WoT.ExposedThingInit, 
                initBase: WoT.ExposedThingInit = {}, 
                environment : Thing,  period : number, 
                configData : Object = {}) {

        super(servient, init, initBase, environment, configData);
        this.period = period; 
    }

    public tick(): void {
        const currentTime : number = Date.now();
        const deltaTime = (currentTime - this.lastUpdateTime);

        // If deltaTime is greater then period
        if (deltaTime >= this.period) { 
            this.update(deltaTime);
            this.lastUpdateTime = currentTime;
        } 
    }
    
}
