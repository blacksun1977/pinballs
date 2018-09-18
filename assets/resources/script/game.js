cc.Class({
    extends: cc.Component,

    properties: {
        pball:cc.Node,
        buttonA:cc.Node,
        buttonB:cc.Node,
        Hscore:cc.Label,
        Sscore:cc.Label,
        Hcount:cc.Label,
        copy:cc.Node,
        marry:cc.Node,
        bgcolor:cc.Node,
        girl:cc.Node,
        tansprite:cc.Node,
        ulight:cc.PhysicsBoxCollider,
        st:cc.Node,
        balls:cc.Node,
        gameover:cc.Node,
        jiaqiunode:cc.Node,
        jiabutton:cc.Node,
        x2str:cc.Label,
        double:cc.Node,
        x2node:cc.Node,
        faqiunode:cc.Node,
        Mp3:{
            default:[],
            url: cc.AudioClip,
        },
        Animas:{
            default:[],
            type:cc.Animation
        },
    },
    ongirl:function(){
        
        var self=this
        var action=cc.spawn(cc.moveTo(5,-150,474),cc.callFunc(function(){
            if(self.Animas[9].node.active){
                self.Animas[9].node.active=false
            }
            if(!self.Animas[8].node.active){
                self.Animas[8].node.active=true
            }
            self.Animas[9].stop();
            self.Animas[8].play()
            self.Animas[8].on('finished', function(){
                self.Animas[8].play()
              }, self);
        }))
        var action1=cc.spawn(cc.moveTo(5,150,474),cc.callFunc(function(){
            if(self.Animas[8].node.active){
                self.Animas[8].node.active=false
            }
            if(!self.Animas[9].node.active){
                self.Animas[9].node.active=true
            }
            self.Animas[8].stop();
            self.Animas[9].play()
            self.Animas[9].on('finished', function(){
                self.Animas[9].play()
            }, self);
        }))
       this.girl.runAction(cc.repeatForever(cc.sequence(action,action1)))
    },
    onmarry:function(touch){
        var self=this
        var role=this.marry.children[9]
        var roleL=this.marry.children[9].children[0]
        var roleR=this.marry.children[9].children[1]
        var Rpos= role.convertToWorldSpaceAR(cc.v2(0,0))
        var Tpos=touch.getLocation()
        var roleNode=this.marry.convertToNodeSpaceAR(Tpos)
        var target=null
        if(roleNode.x<-95){
            target=-95
        }else if(roleNode.x>95){
            target=95
        }else{ target=roleNode.x}
        role.stopAllActions()
        if(Tpos.x<Rpos.x){
            if(roleR.active){
                roleR.active=false
            }
            if(!roleL.active){
              roleL.active=true
            }
            this.Animas[7].stop();
            this.Animas[6].play();
            setTimeout(function(){cc.audioEngine.play(this.Mp3[3],false)}.bind(this),100)
            this.Animas[6].on('finished', function(){
                this.Animas[6].play()
              }, this);
              cc.pinball.dir=1
              role.runAction(cc.sequence(cc.moveTo((Rpos.x-Tpos.x)/300,cc.v2(target,role.y)),cc.callFunc(function(){
                self.Animas[6].stop();})))
        }else if(Tpos.x>Rpos.x){
            if(roleL.active){
                roleL.active=false
            }
            if(!roleR.active){
                roleR.active=true
            }
            this.Animas[6].stop();
            this.Animas[7].play();
            cc.pinball.dir=2
            setTimeout(function(){cc.audioEngine.play(this.Mp3[3],false)}.bind(this),100)
            this.Animas[7].on('finished', function(){
                //setTimeout(function(){cc.audioEngine.play(this.Mp3[3],false)}.bind(this),200)
                this.Animas[7].play()
              }, this);
              role.runAction(cc.sequence(cc.moveTo((Tpos.x-Rpos.x)/300,cc.v2(target,role.y)),cc.callFunc(function(){self.Animas[7].stop();})))
            }
    },
    onLoad () {
       
        //console.log("st doulecount is "+node.DoubleCount);
       cc.director.getPhysicsManager().enabled=true
       //cc.audioEngine.play(this.Mp3[0],false)
       cc.pinball.releaseA=-1
       cc.pinball.releaseB=-1
       cc.pinball.type=null
       cc.pinball.currentTag=-1
       cc.pinball.dir=1
       clearInterval(cc.pinball.interval)
       this.jiaqiunode.cascadeOpacity=false
       this.gameover.cascadeOpacity=false
       this.double.cascadeOpacity=false
       /*if(cc.pinball.timecount>0){
           console.log("未完继续")
        cc.pinball.dtime=new Date().getTime()
        cc.pinball.interval=setInterval(function(){
            if(self.x2str){
              self.x2str.string=cc.pinball.timecount
              cc.pinball.timecount--
             if(cc.pinball.timecount<0){
                 cc.pinball.dtime=null
                 self.x2str.string="X2"
                 self.x2node.children[0].color= new cc.Color(255,255,255)
                 cc.pinball.timecount=0
                 clearInterval(cc.pinball.interval)
                 return
             }
            }
         },1000)                
       } */  
       this.x2node.active=true
        //if(cc.hscoreball.Hscore){
            //debugger
           this.Hscore.string=cc.hscoreball.Hscore
           this.Sscore.string=cc.pinball.score
        //}
        if(cc.pinball.Hcount){
            //this.HcountHcount.string= cc.pinball.Hcount
        }else{ 
            if(cc.pinball.Hcount==0){
                if(cc.pinball.gameend){
                    this.gameover.children[0].active=false
                    this.gameover.children[1].active=false
                    cc.pinball.gameend=false
                    this.gameover.active=true
                    this.gameover.position=cc.v2(0,750)
                    this.gameover.runAction(cc.moveTo(1,0,0))
                }else{
                    this.pball.active=false
                    this.jiabutton.active=true
                }
            }else{ 
                cc.pinball.Hcount=1
                //.string= cc.pinball.Hcount
                this.Hscore.string=0
                cc.hscoreball.Hscore=0
                cc.pinball.score=0
                this.Sscore.string=0
            }
        }
       this.jiaqiu()
       cc.pinball.Animas=this.Animas
       cc.pinball.start=false
       this.buttonA.on(cc.Node.EventType.TOUCH_START, this.onAstart, this);
       this.buttonA.on(cc.Node.EventType.TOUCH_END,this.onAend,this)
       this.buttonB.on(cc.Node.EventType.TOUCH_START, this.onBstart, this);
       this.buttonB.on(cc.Node.EventType.TOUCH_END,this.onBend,this)
       this.faqiunode.on(cc.Node.EventType.TOUCH_START, this.onfaqiuStart, this);
       this.faqiunode.on(cc.Node.EventType.TOUCH_END,this.onfaqiuend,this)
       this.tsprite= this.tansprite.getComponent(cc.Sprite).spriteFrame
       this.starttime= null
       cc.pinball.USA= null
       cc.pinball.USB= null
       cc.pinball.dtime= null
       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownA, this);
       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpA, this);
       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownB, this);
       cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUpB, this);
       for (let index = 0; index < 3; index++) {
          this.Animas[index].play() 
          this.Animas[index].on('finished', function(){
            this.Animas[index].play()
          }, this);
       }
    },
    start () {

    },
    onKeyDownA: function (event) {
      if(cc.pinball.USA){
        switch(event.keyCode) {
            case cc.KEY.d:
            cc.pinball.USA.stopAllActions()
            cc.pinball.releaseA=Math.abs(cc.pinball.USA.rotation)
            cc.pinball.USA.runAction(cc.rotateTo(0.1,-40))
            break;
        }
      }
    },
    ondouble:function(touch){       
        touch.target.children[0].color= new cc.Color(47,221,131)
        this.double.active=true
    },
    onKeyUpA: function (event) {
    if(cc.pinball.USA){
        switch(event.keyCode) {
            case cc.KEY.d:
            cc.audioEngine.play(this.Mp3[1],false)
            cc.pinball.USA.stopAllActions()
            cc.pinball.releaseA=-1
            cc.pinball.USA.runAction(cc.rotateTo(0.1,0));
            break;
        }
    }
    },
    onjiaqiuclose:function(touch){
        cc.audioEngine.play(this.Mp3[4],false)
        touch.target.parent.active=false
        //this.node.parent.active=false
        this.gameover.active=true
        this.gameover.position=cc.v2(0,750)
        this.gameover.runAction(cc.moveTo(1,0,0))
    },
    onDoubleClick:function(touch){
        var self=this
        Global.DoubleCount--;
        console.log("免费双倍次数"+Global.DoubleCount);
       
        if(Global.DoubleCount>=0)
        {
            touch.target.parent.parent.active=false
            cc.log("不分享加倍开始“");
            self.x2node.children[0].color= new cc.Color(255,255,255);
            cc.pinball.dtime=new Date().getTime()
            cc.pinball.timecount=30
            cc.pinball.interval=setInterval(function(){
                if(self.x2str){
                 self.x2str.string=cc.pinball.timecount
                 cc.pinball.timecount--
                 if(cc.pinball.timecount<0){
                     cc.pinball.dtime=null
                     self.x2str.string="X2"
                     self.x2node.children[0].color= new cc.Color(255,255,255)
                     cc.pinball.timecount=0
                     clearInterval(cc.pinball.interval)
                     return
                 }
                }
             },1000)      
        }
        else
        {
            
            if(!window.wx){
                cc.log("非微信环境下 所以加倍停止");
                return;
            }
            if(window.wx){
                wx.shareAppMessage({
                    title:Global.ShareTitle,
                    imageUrl:Global.SharePic,
                    success:function(err){
                        if(err.errMsg=="shareAppMessage:ok"){
                           cc.pinball.dtime=new Date().getTime()
                           cc.pinball.timecount=30
                           cc.pinball.interval=setInterval(function(){
                               if(self.x2str){
                                self.x2str.string=cc.pinball.timecount
                                cc.pinball.timecount--
                                if(cc.pinball.timecount<0){
                                    cc.pinball.dtime=null
                                    self.x2str.string="X2"
                                    self.x2node.children[0].color= new cc.Color(255,255,255)
                                    cc.pinball.timecount=0
                                    clearInterval(cc.pinball.interval)
                                    return
                                }
                               }
                            },1000)                           
                        }
                    }
                })
    
            }
        }

       
       
        
    },

    onKeyDownB: function (event) {
      if(cc.pinball.USB){
        switch(event.keyCode) {
            case cc.KEY.j:
            cc.pinball.USB.stopAllActions()
            cc.pinball.releaseB=Math.abs(cc.pinball.USB.rotation)
            cc.pinball.USB.runAction(cc.rotateTo(0.1,40))
            break;
        }
      }
    },
    onKeyUpB: function (event) {
    if(cc.pinball.USB){
        switch(event.keyCode) {
            case cc.KEY.j:
            cc.audioEngine.play(this.Mp3[1],false)
            cc.pinball.USB.stopAllActions()
            cc.pinball.releaseA=-1
            cc.pinball.USB.runAction(cc.rotateTo(0.1,0));
            break;
        }
    }
    },
    jiaqiu:function(){
        if(cc.pinball.Hcount==2){
            this.balls.children[2].active=false
        }else if(cc.pinball.Hcount==1){
            this.balls.children[2].active=false
            this.balls.children[1].active=false
        }
    },
    jiayiqiu:function(touch){
        this.jiaqiunode.active=true
        touch.target.active=false
    },
    jclose:function(touch){
        touch.target.parent.parent.active=false
        this.x2node.children[0].color= new cc.Color(255,255,255)
        this.pball.active=true
        //this.gameover.children[0].active=false
        //this.gameover.children[1].active=false
        //cc.pinball.gameend=false
        //this.gameover.active=true
        //this.gameover.position=cc.v2(0,750)
        //this.gameover.runAction(cc.moveTo(1,0,0))
    },
    dclose:function(touch){
        touch.target.parent.parent.active=false
        this.x2node.children[0].color= new cc.Color(255,255,255)
        //this.pball.active=true
        //this.gameover.children[0].active=false
        //this.gameover.children[1].active=false
        //cc.pinball.gameend=false
        //this.gameover.active=true
        //this.gameover.position=cc.v2(0,750)
        //this.gameover.runAction(cc.moveTo(1,0,0))
    },
    viewradio:function(touch){
        var self=this
        if(!window.wx){
            return;
        }
        if(window.wx){
            wx.shareAppMessage({
                title:Global.ShareTitle,
                imageUrl:Global.SharePic,
                success:function(err){
                    if(err.errMsg=="shareAppMessage:ok"){
                        if(cc.pinball.Hcount==0){
                            self.balls.children[2].active=false
                            self.balls.children[1].active=false
                            self.balls.children[0].active=false
                            self.pball.active=true
                            touch.target.parent.active=false
                        }
                    }
                }
            })

        }
    },
    onSharejiaqiu:function(touch){
       var self=this
        if(!window.wx){
            return;
        }
        if(window.wx){
            wx.shareAppMessage({
                title:Global.ShareTitle,
                imageUrl:Global.SharePic,
                success:function(err){
                    if(err.errMsg=="shareAppMessage:ok"){
                        if(cc.pinball.Hcount==0){
                            self.balls.children[2].active=false
                            self.balls.children[1].active=false
                            self.balls.children[0].active=false
                            self.pball.active=true
                            touch.target.parent.active=false
                        }
                    }
                }
            })

        }
    },
    onPlay:function(err){
        if(this.Animas[5].node.active){
            this.Animas[5].node.active=false
        }
        this.copy.active=true
        //this.Animas[5].node.getComponent(cc.Sprite).spriteFrame=
        //cc.audioEngine.play(this.Mp3[2],false)
        //this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+1000)
        //this.pball.getComponent(cc.RigidBody).gravityScale=0.8
    },
    onfaqiuStart:function(touch){
        if(this.marry.active){
            this.onmarry(touch)
        }else{
            if(!this.pball.active){
               return
            }
        if(this.pball.x>275&&this.pball.y<-375&&this.pball.getComponent(cc.RigidBody).linearVelocity.y==0){
            if(this.ulight.enabled){
               this.ulight.enabled=false
            }
            if(!this.Animas[5].node.active){
                this.Animas[5].node.active=true
            }
            if(this.copy.active){
                this.copy.active=false
            }
            cc.pinball.USA=null
            this.starttime = new Date().getTime();
            this.Animas[5].play();
            //this.Animas[5].on('finished', this.onPlay, this); 
        }
    }
    },
    onAstart:function(touch){
        if(this.marry.active){
            this.onmarry(touch)
        }else{
            if(!this.pball.active){
               return
            }
        if(cc.pinball.USA){
            cc.audioEngine.play(this.Mp3[1],false)
            cc.pinball.USA.stopAllActions()
            cc.pinball.releaseA=Math.abs(cc.pinball.USA.rotation)
            cc.pinball.USA.runAction(cc.rotateTo(0.1,-40))
        }
    }
    },
    onfaqiuend:function(){
        if(this.marry.active){
           
        }else{
            if(!this.pball.active){
                return
             }
        if(this.pball.x>275&&this.pball.y<-375&&this.pball.getComponent(cc.RigidBody).linearVelocity.y==0){
            cc.audioEngine.play(this.Mp3[2],false)
            cc.pinball.USA=null
            this.Animas[5].off('finished', this.onPlay, this);
            this.Animas[5].stop();
            this.faqiunode.getComponent(cc.Sprite).enabled=false
            this.faqiunode.children[0].active=false
            if(!this.copy.active){
                this.copy.active=true
            }
            if(this.Animas[5].node.active){
                this.Animas[5].node.active=false
            }
            var interval=new Date().getTime()-this.starttime
            if(interval<=180){
                this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+300)
            }else if(interval<=350){
                this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+600)
            }else if(interval<=520){
                this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+900)
            }else if(interval<=850){
                this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+1000)
            }else{
                this.pball.getComponent(cc.RigidBody).linearVelocity=cc.v2(0, cc.random0To1()*300+1200)
            }
        }
    }
    },
    onAend:function(){
        if(this.marry.active){
           
        }else{
            if(!this.pball.active){
                return
             }
        if(cc.pinball.USA){
            cc.audioEngine.play(this.Mp3[1],false)
            cc.pinball.USA.stopAllActions()
            cc.pinball.releaseA=-1
            cc.pinball.USA.runAction(cc.rotateTo(0.1,0));
        }
    }
    },
    onBstart:function(touch){
        if(this.marry.active){
            this.onmarry(touch)
        }else{
            if(!this.pball.active){
                return
             }
        if(cc.pinball.USB){
            cc.pinball.USB.stopAllActions()
            cc.pinball.releaseB=Math.abs(cc.pinball.USB.rotation)
            cc.pinball.USB.runAction(cc.rotateTo(0.1,40))
        }
    }
    },
    onBend:function(){
        if(this.marry.active){

        }else{
            if(!this.pball.active){
                return
             }
        if(cc.pinball.USB){
            cc.pinball.USB.stopAllActions()
            cc.pinball.releaseB=-1
            cc.pinball.USB.runAction(cc.rotateTo(0.1,0))
        }
    }
    },
    onrestart:function(){
        cc.director.loadScene("game")
    },
    update (dt) {

    },
});
