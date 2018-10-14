cc.Class({
    extends: cc.Component,


    properties: {
        Hscore: cc.Label,
        rankingScrollView: cc.Sprite,
    },
    onLoad() {
        cc.log("gamer paly counts is " + Global.MaxPlayCount);

        // if( Global.MaxPlayCount<0)
        // {
        //     this.node.getChildByName("icon").active=false;
        // }
        if (CC_WECHATGAME) {
            wx.showShareMenu({
                withShareTicket: true
            })
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: Global.ShareTitle,
                    imageUrl: Global.SharePic,
                }
            })

            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 750;
            window.sharedCanvas.height = 1334;
            window.wx.postMessage({ // 发消息给子域
                messageType: 4,
                MAIN_MENU_NUM: "x1"
            });
            cc.log("post msg ok");
        } else {
            cc.log("获取横向展示排行榜数据。x1");

        }

    },

    start() {
        this.Hscore.string = cc.pinball.score;
    },

    onret: function () {


        // this.node.active=false
        // cc.pinball=0
        // cc.director.loadScene("game")
    },
    onridio: function () {
        // this.node.active=false
        // cc.pinball=0
        // cc.director.loadScene("game")
    },
    onShareResurgence: function () {
        var self = this;
        //  cc.log("FreeResetCount is "+Global.FreeResetCount);
        //  //如果免费重玩次数大于0 就可以不用分享直接重玩;
        // if(Global.FreeResetCount>0)
        //  {
        //     Global.FreeResetCount--;
        //      resetgame(self);
        //      return;
        //  }

       
        if (CC_WECHATGAME) {
            wx.shareAppMessage({
                title: Global.ShareTitle,
                imageUrl: Global.SharePic,
                success: function (err) {
                    if (err.errMsg == "shareAppMessage:ok") {

                        resetgame(self);
                    }
                }
            })

        }
    },

    // 刷新子域的纹理
    _updateSubDomainCanvas() {

        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubDomainCanvas();
    },
    ResurgenceGame: function () {
        cc.log("click ResurgenceGame btn");
        cc.log(cc.pinball);
        Global.MaxPlayCount--;
        cc.pinball.gameend = false;
        cc.pinball.Hcount = 1;
       cc.director.loadScene("game");

    },
    ReStartGame:function(){
        cc.log("click ReStartGame btn");
        
        cc.director.loadScene("GameStartUI");

    },
});

function resetgame(self) {
    // Global.MaxPlayCount--;
    // cc.pinball.gameend = false;
    // cc.pinball.Hcount = 1;
    // self.node.active = false;
    // cc.director.loadScene("game");
}