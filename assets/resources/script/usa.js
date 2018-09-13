cc.Class({
    extends: cc.Component,

    properties: {


    },
    onLoad () {
       this.collider=false
    },
    onBeginContact:function(contact,selfCollider,otherCollider){
        this.collider=true
    },
    onEndContact:function(contact,selfCollider,otherCollider){
        this.collider=false
    },
    update (dt) {
        if(!this.collide){
            if( Math.ceil(this.node.rotation)==-40){
                
                cc.pinball.releaseA=-1
            }else if( Math.ceil(this.node.rotation)==40){
                cc.pinball.releaseB=-1
            }
        }else{this.collider=false}
    },
});
