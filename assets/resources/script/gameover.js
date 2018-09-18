cc.Class({
    extends: cc.Component,

    properties: {
        Hscore:cc.Label
    },
    onLoad () {
        cc.log("gamer paly counts is "+ Global.MaxPlayCount);
       
        if( Global.MaxPlayCount<0)
        {
            this.node.getChildByName("icon").active=false;
        }
    },

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
         var self=this;
         cc.log("FreeResetCount is "+Global.FreeResetCount);
         //如果免费重玩次数大于0 就可以不用分享直接重玩;
        if(Global.FreeResetCount>0)
         {
            Global.FreeResetCount--;
             resetgame(self);
             return;
         }

        if(!window.wx){
            return;
        }
        if(window.wx){
            wx.shareAppMessage({
                title:Global.ShareTitle,
                imageUrl:Global.SharePic,
                success:function(err){
                    if(err.errMsg=="shareAppMessage:ok"){
                       
                        resetgame(self);
                    }
                }
            })

        }
    },

    // update (dt) {},
});
function resetgame(self) {
    Global.MaxPlayCount--;
    cc.pinball.gameend = false;
    cc.pinball.Hcount = 1;
    self.node.active = false;
    cc.director.loadScene("game");
}

