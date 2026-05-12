export class ClientBuffBase {
    static id = null;
    
    static onMetaChange(entity, value, oldValue) {
        console.error('empty onMetaChange');
    }
    static onEntityCreate(entity, value) {
        console.error('empty onEntityCreate');
    }
}