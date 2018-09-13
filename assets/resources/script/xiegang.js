cc.Class({
    extends: cc.Component,

    properties: {
        right:cc.Label
    },
    onLoad () {
        this.currentTag=-1
    },
    onEndContact:function(contact,selfCollider,otherCollider){
        if(otherCollider.tag==this.currentTag){
            return;
         }else{this.currentTag=otherCollider.tag}

    },
    update (dt) {

    },
});
