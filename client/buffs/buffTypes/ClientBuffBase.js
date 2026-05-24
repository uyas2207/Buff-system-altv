export class ClientBuffBase {
    static id = null;
    
    static onMetaChange() {
        console.error('empty onMetaChange');
    }
    static onEntityCreate() {
        console.error('empty onEntityCreate');
    }
    static onMetaDelete() {
        console.error('empty onMetaDelete');
    }
}