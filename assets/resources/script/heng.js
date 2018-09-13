cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad () {
        //
        var action=cc.moveTo(3,960,0)
        this.node.runAction(cc.repeatForever(cc.sequence(action,cc.moveTo(3,660,0))))
    },
    update (dt) {

    },
});
