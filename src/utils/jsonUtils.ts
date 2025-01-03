import { Thing } from "../thing-model/Thing";

export function generateJson(things: Thing[], environments: Thing[]) {
    things = [...environments, ...things];
    const thingsJson = things.map(thing => JSON.parse(thing.toString()));
    return thingsJson;
}

export function generatePatch(json1: any[], json2: any[]) {
    const patch: any[] = [];

    for (let i = 0; i < json1.length; i++) {
        const thing1 = json1[i];
        const thing2 = json2[i];

        if (thing1.title !== thing2.title) {
            throw new Error(`Titles do not match for index ${i}: "${thing1.title}" vs "${thing2.title}"`);
        }

        const changes: any = { "title": thing1.title };

        Object.keys(thing1).forEach(key => {
            if (key !== "title" && thing1[key] !== thing2[key]) {
                changes[key] = thing2[key]; 
            }
        });

        if (Object.keys(changes).length > 1) {
            patch.push(changes);
        }
    }

    return patch;
}