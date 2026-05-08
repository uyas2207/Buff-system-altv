export class ClientBuffBase {
    static metaKey = null;
    
    static onMetaChange(entity, value, oldValue) {
        console.log('empty onMetaChange');
    }
    static onEntityCreate(entity, value) {
        console.log('empty onEntityCreate');
    }
    /*
    static onMetaRemove(entity) {
        console.log('empty onMetaRemove');
    }
    */
}