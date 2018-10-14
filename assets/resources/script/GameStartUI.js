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


        cc.hscoreball = {}
        cc.pinball = {}
        cc.pinball.score = 0
        cc.pinball.interval = null
        cc.pinball.gameend = false
        cc.pinball.timecount = 0

        this.wxinit()
        console.log("免费双倍次数" + Global.DoubleCount);
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
    }

});