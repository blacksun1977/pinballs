cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad () {

    },
    onBeginContact:function(contact,selfCollider,otherCollider){
        otherCollider.body.linearVelocity=cc.v2(0,0)
        otherCollider.node.runAction(cc.sequence(cc.fadeOut(2),cc.fadeIn(2)))
        var num= Math.random()*100+600
        var num1= Math.random()*100+500
        setTimeout(function(){otherCollider.body.linearVelocity=cc.v2(0-num,num1)}.bind(this),3000)
    },
    update (dt) {

    },
});
