cc.Class({
    extends: cc.Component,

    properties: {
        ranklist: cc.Node,
        Mp3: {
            default: null,
            url: cc.AudioClip,
        },

    },
    onLoad() {

        //云开发初始化
        wx.cloud.init();
        cc.hscoreball = {}
        cc.pinball = {}
        cc.pinball.score = 0
        cc.pinball.interval = null
        cc.pinball.gameend = false
        cc.pinball.timecount = 0

        this.wxinit()
        console.log("免费双倍次数" + Global.DoubleCount);
        this.onAdd();
    },
    start() {
        cc.audioEngine.play(this.Mp3, false)
    },
    paihang: function () {
        this.ranklist.active = true;
        if (CC_WECHATGAME) {

            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: "x1"
            });
        }
    },
    wxinit: function () {

        if (!CC_WECHATGAME) {

            return;
        }
        wx.getSetting({
            success: function (info) {
                if (info.authSetting["scope.writePhotosAlbum"]) {

                }
            }
        })
        wx.showShareMenu({
            withShareTicket: false
        })
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title: Global.ShareTitle,
                imageUrl: Global.SharePic,
            }
        })
        var str = ""
        var verstr = wx.getSystemInfoSync().SDKVersion
        if (verstr.length <= 5) {
            verstr = verstr + "0"
        }
        for (var i = 0; i < verstr.length; i++) {
            var temp = verstr.substr(i, 1)
            if (temp != ".") {
                str = str + temp
            }
        }
        var ver = parseInt(str)
        if (ver >= 2060) {
            var bottoncreate = function () {
                var button = wx.createUserInfoButton({
                    type: 'text',
                    text: '获取微信授权',
                    style: {
                        left: 70,
                        top: 370,
                        width: 160,
                        height: 40,
                        lineHeight: 40,
                        backgroundColor: '#ff0000',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                })
                button.onTap(function (info) {
                    if (info.errMsg == "getUserInfo:ok") {
                        button.destroy()
                    }
                })
            }
        }

    },
    onShare: function () {
        if (!window.wx) {
            return;
        }
        if (window.wx) {
            wx.shareAppMessage({
                title: Global.ShareTitle,
                imageUrl: Global.SharePic,
                success: function (err) {
                    if (err.errMsg == "shareAppMessage:ok") {

                    }
                }
            })

        }
    },
    onstart: function () {

        cc.director.loadScene("game");
    },
    onAdd: function () {
       let query =wx.getLaunchOptionsSync().query;
       let cs ="0";
       let openid="";
       if(query)
       {
        cs = query.cs;
       }
        const db = wx.cloud.database();
       // 获取opneid

       wx.cloud.callFunction({
        // 要调用的云函数名称
        name: 'login',
        // 传递给云函数的event参数
        data: {}
      }).then(res => {
        cc.log(res);
        openid = res.result.userInfo.openId;
        
      })
       // 判断数据库集合中是否有该用户的记录
       db.collection('user_login_record').where({
        _openid: openid
      })
      .get()
      .then(res=>{
          cc.log(res);
        cc.log(res.data.length);
        if(res.data.length==0)
        {
             //add
            db.collection('user_login_record').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                    ComeSource:cs,
                    ComeTime:new Date()
                }
            })
            .then(res => {
                cc.log("user_login_record add result is "+res);
            })
        }
      })
     
    },


});