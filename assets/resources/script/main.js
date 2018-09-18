
cc.Class({
    extends: cc.Component,

    properties: {
        bgcolor:cc.Node,
        view:cc.Node,
        mianban:cc.Node,
        Mp3:{
            default:null,
            url: cc.AudioClip,
        },
       
    },
    onLoad () {
       
        if(!cc.hscoreball){
            cc.hscoreball={} 
        }
      
        if(!cc.pinball){
            cc.pinball={} 
            this.bgcolor.active=false
            cc.pinball.score=0
            cc.pinball.interval=null
            cc.pinball.gameend= false
            cc.pinball.timecount=0
        }else{
            this.node.active=false
            this.bgcolor.active=true
            this.mianban.active=true
        }
        this.wxinit()
        console.log("免费双倍次数"+Global.DoubleCount);
    },
    start () {
        cc.audioEngine.play(this.Mp3,false)
    },
    paihang:function(){
       if(window.wx){
           this.view.active=true
           window.wx.postMessage({
             messageType: 2,
             KEY1: "x1",
          });
        }
    },
    wxinit:function(){
        var self=this
        var rcode=null
        if(!window.wx){
            //self.ctxt.string="非微信环境,初始化成功"
            return;
        }
        wx.getSetting({
            success: function (info) {
                if(info.authSetting["scope.writePhotosAlbum"]){

                }
            }
        })
        wx.showShareMenu({withShareTicket:false})
        wx.onShareAppMessage(function () {
            // 用户点击了“转发”按钮
            return {
                title:Global.ShareTitle,
                imageUrl:Global.SharePic,
            }
          })
        var str=""
        var verstr=wx.getSystemInfoSync().SDKVersion
        if(verstr.length<=5){
            verstr=verstr+"0"
        }
        for(var i=0;i<verstr.length;i++){
            var temp=verstr.substr(i,1)
            if(temp!="."){
                str=str+temp
            }
        }
        var ver= parseInt(str)
        if(ver>=2060){
            var bottoncreate=function (){
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
            button.onTap(function(info){
                if(info.errMsg=="getUserInfo:ok"){
                    button.destroy()
                }
            })
          }
        }   
        wx.login({
            success:function(res){
                rcode=res.code
                //感觉没有用到呀 暂时取消试试
                // wx.getUserInfo({
                //     openIdList: ['selfOpenId','ownAP0b9qt6AzvYOSWOX8VX8KMq0'],
                //     success:function(res){

                //     },
                //     fail:function(){
                //         if(ver>=2060){
                //             self.ctxt.string="用户授权失败,请重新授权"
                //             bottoncreate()
                //         }else{wx.openSetting({
                //             success:function(res){                                          
                //                 var temp=res.authSetting['scope.userInfo','scope.writePhotosAlbum']
                //                 if(temp){
                //                     
                //                     // wx.getUserInfo({
                //                     //     success:function(res){
        
                //                     //     }
                //                     // })
                //                 }
                //             }
                //         })}
                //     }
                //   }) 
            }
        })    
    },
    onShare:function(){
        if(!window.wx){
            return;
        }
        if(window.wx){
            wx.shareAppMessage({
                title:Global.ShareTitle,
                imageUrl:Global.SharePic,
                success:function(err){
                    if(err.errMsg=="shareAppMessage:ok"){

                    }
                }
            })

        }
    },
    onstart:function(){
       
        this.bgcolor.active=true
        this.node.active=false
        this.mianban.active=true
    }
    // update (dt) {},
});
