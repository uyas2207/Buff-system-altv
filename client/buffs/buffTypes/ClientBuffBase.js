export class ClientBuffBase {

    get id () { return 'defaultClientBuffName';}
    
    onMetaChange() {
        console.error('empty onMetaChange');
    }
    onEntityCreate() {
        console.error('empty onEntityCreate');
    }
    onMetaDelete() {
        console.error('empty onMetaDelete');
    }
    test(){
        console.log(`${this.id}, Test`);
    }
}