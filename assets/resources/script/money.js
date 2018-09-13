cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad () {

    },
    onBeginContact:function(contact,selfCollider,otherCollider){
        if(otherCollider.tag==cc.pinball.currentTag){
            return;
         }else{this.currentTag=otherCollider.tag}
       
    },
    update (dt) {

    },
});
