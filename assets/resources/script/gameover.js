cc.Class({
    extends: cc.Component,

    properties: {
        Hscore:cc.Label
    },
    // onLoad () {},

    start () {
        this.Hscore.string= cc.hscoreball.Hscore
    },
    onret:function(){
        this.node.active=false
        cc.pinball=0
        cc.director.loadScene("game")
     },
     onridio:function(){
        this.node.active=false
        cc.pinball=0
        cc.director.loadScene("game")
     },
     onShare:function(){
         var self=this
        if(!window.wx){
            return;
        }
        if(window.wx){
            wx.shareAppMessage({
                title:"这个弹球很魔性，停不下来！慎入！",
                imageUrl:"https://car-1252852095.file.myqcloud.com/tanqiu/tanqiuicon.png",
                success:function(err){
                    if(err.errMsg=="shareAppMessage:ok"){
                        cc.pinball.gameend=false
                        cc.pinball.Hcount=1
                        self.node.active=false
                        cc.director.loadScene("game")
                    }
                }
            })

        }
    },

    // update (dt) {},
});
