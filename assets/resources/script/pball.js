cc.Class({
    extends: cc.Component,

    properties: {
        rcap:cc.PhysicsPolygonCollider,
        lcap:cc.PhysicsPolygonCollider,
        right:cc.Label,
        score:cc.Label,
        Hscore:cc.Label,
        bgcolor:cc.Node,
        marry:cc.Node,
        BUSA:cc.Node,
        BUSB:cc.Node,
        BDSA:cc.Node,
        BDSB:cc.Node,
        Ltree:cc.Node,
        Rtree:cc.Node,
        EXIT:cc.Node,
        EXIT1:cc.Node,
        sball:cc.Node,
        gameover:cc.Node,
        blocks:cc.Node,
        numcolor:cc.Node,
        upball:cc.Node,
        downball:cc.Node,
        balls:cc.Node,
        cbox:cc.PhysicsBoxCollider,
        faqiunode:cc.Node,
        Mp3:{
            default:[],
            url: cc.AudioClip,
        },
        redBALL:{
            default:[],
            type:cc.Node
        },
        qie:{
            default:[],
            type:cc.Node
        },
        Poker:{
            default:[],
            type:cc.Node
        },
        ub:{
            default:null,
            type:cc.Node
        },
        ddscore:{
            default:[],
            type:cc.Node
        },
        duck:{
            default:[],
            type:cc.Animation
        },
    },
    onLoad () {
       this._angle=90
       cc.director.getPhysicsManager().enabled=true
       this.currentTag=-1
       this.display=[false,false,false]
       this.dscore=[0,0,0]
       this.ballcount=0
       this.Ydisplay=[false,false,false]
       this.Pdisplay=[false,false,false,false,false]
       this.ballcolor=[1,1,1,1,1,1,1,1,1,1,1,1]
       this.blockcount=0
    },
    start () {
        this.Collider=null

    },
    uppballtype1:function(){
        if(this._angle&&cc.pinball.type==1){
            this.node.x += Math.cos(this._angle * (Math.PI/180)) * 4.4;
            this.node.y += Math.sin(this._angle * (Math.PI/180)) * 4.4;
            this._angle+=2
            if(this._angle>190){
                cc.pinball.type==0
                this._angle=null
                this.Collider.linearVelocity=cc.v2(0,-120)
                this.Collider.gravityScale =0.5
                
            }
        }
    },
    onBeginContact:function(contact,selfCollider,otherCollider){  
        var stag= otherCollider.tag
        console.log(stag)
        if(stag==101&&stag!=cc.pinball.currentTag){
            if(cc.pinball.dtime){
               if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            }else{cc.pinball.score+=100}
            cc.audioEngine.play(this.Mp3[2],false)
        }else if(stag==3&&cc.pinball.releaseA>=0){
            //摇摆USA左
            var tem=selfCollider.body.getWorldCenter()
            var ro=Math.abs(otherCollider.node.rotation)-Math.abs(cc.pinball.releaseA)
            if(ro<0){
                ro=0
            }
            var num1=Math.abs(ro*25)+1500
            var num=Math.random()*30+100
            selfCollider.body.applyLinearImpulse(cc.v2(num,num1),tem,true)
        }else if(stag==9&&cc.pinball.releaseB>=0){
            //摇摆USB右
            var tem=selfCollider.body.getWorldCenter()
            var ro=otherCollider.node.rotation-cc.pinball.releaseB
            if(ro<0){
                ro=0
            }
            var num1=Math.abs(ro*25)+1500
            var num=Math.random()*30+100
            selfCollider.body.applyLinearImpulse(cc.v2(0-num,num1),tem,true)
        }else if(stag==4){
            var tem=selfCollider.body.getWorldCenter()
            var num=Math.random()*200+300
            selfCollider.body.applyLinearImpulse(cc.v2(0,num),tem,true)
        }else if(stag==5&&stag!=cc.pinball.currentTag){
            //硬币
            cc.audioEngine.play(this.Mp3[1],false,0.6)
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            var num=Math.random()*50+1000
            otherCollider.node.runAction(cc.sequence(cc.scaleTo(0.1,0.6),cc.scaleTo(0.1,1)))
            var tem=selfCollider.body.getWorldCenter()
            selfCollider.body.applyLinearImpulse(cc.v2(0-num,400),tem,true)
        }else if(stag==8){
            //左一排方块
            cc.audioEngine.play(this.Mp3[0],false)
            otherCollider.node.active=false
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
        }else if(stag==6){
            //弧形小球
            otherCollider.node.active=false
            this.ballcount++
            cc.audioEngine.play(this.Mp3[0],false)
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            if(this.ballcount>7){
                this.ballcount=0
                var cunt1=0
                var cunt2=0
                cc.pinball.Animas[3].play() 
                cc.pinball.Animas[3].on('finished', function(){
                    cunt1++
                   if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
                    this.score.string=cc.pinball.score
                    if(cunt1<21){
                        cc.pinball.Animas[3].play()
                        cc.audioEngine.play(this.Mp3[1],false,0.5)
                    }
                }, this);
                cc.pinball.Animas[4].play() 
                cc.pinball.Animas[4].on('finished', function(){
                    cunt2++
                   if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
                    this.score.string=cc.pinball.score
                    if(cunt2<21){
                        cc.pinball.Animas[4].play()
                    }else{
                        for(let index = 0; index < this.sball.children.length; index++) {
                            this.sball.children[index].active=true
                        }
                    }
                }, this);
            }
        }else if(stag==10&&stag!=cc.pinball.currentTag){
            //右上方堵头
            var self=this
                setTimeout(function(){
                    self.cbox.enabled=true
                },100) 
        }else if(stag==21){
            //右蓝5上方跳
            if(stag!=cc.pinball.currentTag){
                if(cc.pinball.dtime){ cc.pinball.score+=10*2  }else{cc.pinball.score+=10}
            }
            var tem=selfCollider.body.getWorldCenter()
            var num=Math.random()*300+300
            var num1=Math.random()*300+300
            selfCollider.body.applyLinearImpulse(cc.v2(0-num1,num),tem,true)
        }else if(stag==31){
            //左蓝2上方跳
            if(stag!=cc.pinball.currentTag){
                if(cc.pinball.dtime){ cc.pinball.score+=10*2  }else{cc.pinball.score+=10}
            }
            var tem=selfCollider.body.getWorldCenter()
            var num=Math.random()*300+300
            var num1=Math.random()*300+300
            selfCollider.body.applyLinearImpulse(cc.v2(num,num1),tem,true)
        }else if(stag==12){
            //左上方堵头下方小球
            this.lcap.enabled=false
            setTimeout(function(){this.lcap.enabled=true}.bind(this),1500)
        }else if(stag==13&&stag!=cc.pinball.currentTag){
            //右下方弯口处堵头上方障碍
            cc.audioEngine.play(this.Mp3[5],false)
            this.qie[0].getComponent(cc.PhysicsChainCollider).enabled=true
            this.qie[1].getComponent(cc.PhysicsChainCollider).enabled=true
            this.qie[2].getComponent(cc.PhysicsChainCollider).enabled=true
            this.qie[0].runAction(cc.repeatForever(cc.blink(1,2)))
            this.qie[1].runAction(cc.repeatForever(cc.blink(1,2)))
            this.qie[2].runAction(cc.repeatForever(cc.blink(1,2)))
            this.ub.color=new cc.Color (255,255,255)
            this.redBALL[0].active=false
            this.rcap.enabled=false
            setTimeout(function(){this.rcap.enabled=true}.bind(this),1500)
        }else if(stag==20&&stag!=cc.pinball.currentTag){
            //右边得分版
            cc.audioEngine.play(this.Mp3[4],false)
            this.node.runAction(cc.sequence(cc.scaleTo(0.1,0.6),cc.scaleTo(0.1,1)))
            var num=parseInt(this.right.string);
            var temp= 0
            this.ub.color= new cc.Color(236,78,97);
            setTimeout(function(){
                if(this.redBALL[0].active){
                    this.ub.color= new cc.Color(174,255,13);
                }else{
                    this.ub.color=new cc.Color (255,255,255)
                }
            }.bind(this),200)
            num+=100;
            this.right.string=num
            if(cc.pinball.dtime){ cc.pinball.score+=num*2  }else{cc.pinball.score+=num}
            //cc.pinball.score+=num
        }else if(stag==500&&stag!=cc.pinball.currentTag){
            //左上方堵头下方小球
            if(cc.pinball.currentTag==501){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
            }else if(cc.pinball.currentTag==502){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
            }else if(cc.pinball.currentTag==503){
               if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
                cc.audioEngine.play(this.Mp3[3],false)
            }
        }else if(stag==82){
            //左上方堵头
            setTimeout(function(){this.lcap.sensor=false}.bind(this),100)
        }else if(stag==83){
            //右下方堵头
            setTimeout(function(){this.rcap.sensor=false}.bind(this),100)
        }else if(stag==71&&stag!=cc.pinball.currentTag){
            //左边企鹅
            if(cc.pinball.currentTag==72||cc.pinball.currentTag==73){
                return
            }
            this.qie[0].stopAllActions()
            this.qie[0].active=true
            this.qie[0].opacity=255
            var child= otherCollider.node.children
            var display=false
            for (let i = 0; i < child.length; i++) {
                if(child[i].active){
                    child[i].active=false
                    display=true
                    this.display[0]=false
                    break;
                }
            }
            if(!display){
                this.display[0]=true
                var num=Math.floor(Math.random()*9)
                this.dscore[0]=num
                otherCollider.node.children[num].active=true
                cc.audioEngine.play(this.Mp3[2],false)
                if(this.display[0]&&this.display[1]&&this.display[2]){
                    cc.audioEngine.play(this.Mp3[8],false)
                    this.qie[0].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[1].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[2].getComponent(cc.PhysicsChainCollider).enabled=false
                    cc.pinball.score+= (this.dscore[0]+1)*100+ (this.dscore[1]+1)*10+this.dscore[2]+1
                    this.redBALL[0].active=true
                    this.ub.color= new cc.Color(174,255,13);
                    /*setTimeout(function(){
                        this.qie[0].children[0].active=false
                        this.qie[1].children[0].active=false
                        this.qie[2].children[0].active=false
                    }.bind(this),5000)*/
                }
            }
        }else if(stag==72&&stag!=cc.pinball.currentTag){
            //中间企鹅
            if(cc.pinball.currentTag==71||cc.pinball.currentTag==73){
                return
            }
            this.qie[1].stopAllActions()
            this.qie[1].active=true
            this.qie[1].opacity=255
            var child= otherCollider.node.children
            var display=false
            for (let i = 0; i < child.length; i++) {
                if(child[i].active){
                    child[i].active=false
                    display=true
                    this.display[1]=false
                    break;
                }
            }
            if(!display){
                this.display[1]=true
                var num=Math.floor(Math.random()*9)
                this.dscore[1]=num
                otherCollider.node.children[num].active=true
                cc.audioEngine.play(this.Mp3[2],false)
                if(this.display[0]&&this.display[1]&&this.display[2]){
                    cc.audioEngine.play(this.Mp3[8],false)
                    this.qie[0].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[1].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[2].getComponent(cc.PhysicsChainCollider).enabled=false
                    var num= (this.dscore[0]+1)*100+ (this.dscore[1]+1)*10+this.dscore[2]+1
                    //cc.pinball.score+=num
                    if(cc.pinball.dtime){ cc.pinball.score+=num*2  }else{cc.pinball.score+=num}
                    this.redBALL[0].active=true
                    this.ub.color= new cc.Color(174,255,13);
                    /*setTimeout(function(){
                        this.qie[0].children[0].active=false
                        this.qie[1].children[0].active=false
                        this.qie[2].children[0].active=false
                    }.bind(this),5000)*/
                }
            }
        }else if(stag==73&&stag!=cc.pinball.currentTag){
            if(cc.pinball.currentTag==71||cc.pinball.currentTag==72){
                return
            }
            //右边企鹅
            this.qie[2].stopAllActions()
            this.qie[2].active=true
            this.qie[2].opacity=255
            var child= otherCollider.node.children
            var display=false
            for (let i = 0; i < child.length; i++) {
                if(child[i].active){
                    child[i].active=false
                    display=true
                    this.display[2]=false
                    break;
                }
            }
            if(!display){
                this.display[2]=true
                var num=Math.floor(Math.random()*9)
                this.dscore[2]=num
                otherCollider.node.children[num].active=true
                cc.audioEngine.play(this.Mp3[2],false)
                if(this.display[0]&&this.display[1]&&this.display[2]){
                    cc.audioEngine.play(this.Mp3[8],false)
                    this.qie[0].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[1].getComponent(cc.PhysicsChainCollider).enabled=false
                    this.qie[2].getComponent(cc.PhysicsChainCollider).enabled=false
                    var num= (this.dscore[0]+1)*100+ (this.dscore[1]+1)*10+this.dscore[2]+1
                    //cc.pinball.score+=num
                    if(cc.pinball.dtime){ cc.pinball.score+=num*2  }else{cc.pinball.score+=num}
                    //cc.pinball.score+= (this.dscore[0]+1)*100+ (this.dscore[1]+1)*10+this.dscore[2]+1
                    this.redBALL[0].active=true
                    this.ub.color= new cc.Color(174,255,13);
                    /*setTimeout(function(){
                        this.qie[0].children[0].active=false
                        this.qie[1].children[0].active=false
                        this.qie[2].children[0].active=false
                    }.bind(this),5000)*/
                }
            }
            
        }else if(stag==250&&stag!=cc.pinball.currentTag){
            //左边鸭子
            if(!this.duck[0].node.active){
                cc.audioEngine.play(this.Mp3[2],false)
                this.Ydisplay[0]=true
                this.duck[0].node.parent.getComponent(cc.Sprite).enabled=false
                this.duck[0].node.active=true
                this.duck[0].play() 
                this.duck[0].on('finished', function(){
                this.duck[0].play() 
                if(this.Ydisplay[0]&&this.Ydisplay[1]&& this.Ydisplay[2]){
                    this.Ltree.active=true
                    this.Rtree.active=true
                }
                }, this);
            }else{
                this.duck[0].node.active=false
                this.Ydisplay[0]=false
                this.duck[0].node.parent.getComponent(cc.Sprite).enabled=true
            }
        }else if(stag==251&&stag!=cc.pinball.currentTag){
            //中间鸭子
            if(!this.duck[1].node.active){
                cc.audioEngine.play(this.Mp3[2],false)
                this.Ydisplay[1]=true
                this.duck[1].node.parent.getComponent(cc.Sprite).enabled=false
                this.duck[1].node.active=true
                this.duck[1].play() 
                this.duck[1].on('finished', function(){
                this.duck[1].play() 
                if(this.Ydisplay[0]&&this.Ydisplay[1]&& this.Ydisplay[2]){
                    this.Ltree.active=true
                    this.Rtree.active=true
                }
                }, this);
            }else{
                this.duck[1].node.active=false
                this.Ydisplay[1]=false
                this.duck[1].node.parent.getComponent(cc.Sprite).enabled=true
            }
        }else if(stag==252&&stag!=cc.pinball.currentTag){
            //右边鸭子
            if(!this.duck[2].node.active){
                cc.audioEngine.play(this.Mp3[2],false)
                this.Ydisplay[2]=true
                this.duck[2].node.parent.getComponent(cc.Sprite).enabled=false
                this.duck[2].node.active=true
                this.duck[2].play() 
                this.duck[2].on('finished', function(){
                this.duck[2].play()
                if(this.Ydisplay[0]&&this.Ydisplay[1]&& this.Ydisplay[2]){
                    this.Ltree.active=true
                    this.Rtree.active=true
                }
                }, this);
            }else{
                this.Ydisplay[2]=false
                this.duck[2].node.active=false
                this.duck[2].node.parent.getComponent(cc.Sprite).enabled=true
            }
        }else if(stag==253){
            cc.audioEngine.play(this.Mp3[0],false)
            //左边树
            otherCollider.node.active=false
        }else if(stag==254){
            cc.audioEngine.play(this.Mp3[0],false)
            //右边树
            otherCollider.node.active=false
        }else if(stag==280&&stag!=cc.pinball.currentTag){
            //下方方块数字
            if(cc.pinball.currentTag==290){
                return
            }
            cc.audioEngine.play(this.Mp3[0],false)
            otherCollider.node.active=false
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            this.blockcount++
            if(this.blockcount>=14){
                this.EXIT.active=false
                this.EXIT1.active=true
                this.blockcount=0
            }
        }else if(stag==290&&stag!=cc.pinball.currentTag){
            if(cc.pinball.currentTag==280){
                return
            }
            //下方箭头数字
            cc.audioEngine.play(this.Mp3[0],false)
            otherCollider.node.active=false
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            this.blockcount++
            if(this.blockcount>=14){
                this.EXIT.active=false
                this.EXIT1.active=true
                this.blockcount=0
            }
        }else if(stag==600&&stag!=cc.pinball.currentTag){
            //硬币
            cc.audioEngine.play(this.Mp3[1],false,0.5)
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            var num=Math.random()*50+1000
            otherCollider.node.runAction(cc.sequence(cc.scaleTo(0.1,0.6),cc.scaleTo(0.1,1)))
            var tem=selfCollider.body.getWorldCenter()
            selfCollider.body.applyLinearImpulse(cc.v2(num,350),tem,true)
        }else if(stag==601&&stag!=cc.pinball.currentTag){
            //硬币
            cc.audioEngine.play(this.Mp3[1],false,0.5)
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            var num=Math.random()*50+1000
            otherCollider.node.runAction(cc.sequence(cc.scaleTo(0.1,0.6),cc.scaleTo(0.1,1)))
            var tem=selfCollider.body.getWorldCenter()
            selfCollider.body.applyLinearImpulse(cc.v2(0-num,350),tem,true)
        }else if(stag==602&&stag!=cc.pinball.currentTag){
            //硬币
            cc.audioEngine.play(this.Mp3[1],false,0.5)
           if(cc.pinball.dtime){ cc.pinball.score+=100*2  }else{cc.pinball.score+=100}
            var num=Math.random()*50+1000
            otherCollider.node.runAction(cc.sequence(cc.scaleTo(0.1,0.6),cc.scaleTo(0.1,1)))
            var tem=selfCollider.body.getWorldCenter()
            selfCollider.body.applyLinearImpulse(cc.v2(-300,350),tem,true)
        }else if(stag==210&&stag!=cc.pinball.currentTag){
            if(cc.pinball.currentTag==211||cc.pinball.currentTag==212||cc.pinball.currentTag==213||cc.pinball.currentTag==214){
                return
            }
            //扑克10
            if(!this.Poker[0].children[0].active){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
                this.Pdisplay[0]=true
                this.Poker[0].children[0].active=true
                if(this.Pdisplay[0]&&this.Pdisplay[1]&&this.Pdisplay[2]&&this.Pdisplay[3]&&this.Pdisplay[4]){
                    this.redBALL[1].active=true
                    this.ub.color= new cc.Color(174,255,13);
                }
            }
        }else if(stag==211&&stag!=cc.pinball.currentTag){
            //扑克J
            if(cc.pinball.currentTag==210||cc.pinball.currentTag==212||cc.pinball.currentTag==213||cc.pinball.currentTag==214){
                return
            }
            if(!this.Poker[1].children[0].active){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
                this.Pdisplay[1]=true
                this.Poker[1].children[0].active=true
                if(this.Pdisplay[0]&&this.Pdisplay[1]&&this.Pdisplay[2]&&this.Pdisplay[3]&&this.Pdisplay[4]){
                    this.redBALL[1].active=true
                    this.ub.color= new cc.Color(174,255,13);
                }
            }
        }else if(stag==212&&stag!=cc.pinball.currentTag){
            //扑克 Q
            if(cc.pinball.currentTag==211||cc.pinball.currentTag==210||cc.pinball.currentTag==213||cc.pinball.currentTag==214){
                return
            }
            if(!this.Poker[2].children[0].active){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
                this.Pdisplay[2]=true
                this.Poker[2].children[0].active=true
                if(this.Pdisplay[0]&&this.Pdisplay[1]&&this.Pdisplay[2]&&this.Pdisplay[3]&&this.Pdisplay[4]){
                    this.redBALL[1].active=true
                    this.ub.color= new cc.Color(174,255,13);
                }
            }
        }else if(stag==213&&stag!=cc.pinball.currentTag){
            //扑克K
            if(cc.pinball.currentTag==211||cc.pinball.currentTag==212||cc.pinball.currentTag==210||cc.pinball.currentTag==214){
                return
            }
            if(!this.Poker[3].children[0].active){
                if(cc.pinball.dtime){ cc.pinball.score+=500*2  }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
                this.Pdisplay[3]=true
                this.Poker[3].children[0].active=true
                if(this.Pdisplay[0]&&this.Pdisplay[1]&&this.Pdisplay[2]&&this.Pdisplay[3]&&this.Pdisplay[4]){
                    this.redBALL[1].active=true
                    this.ub.color= new cc.Color(174,255,13);
                }
            }
        }else if(stag==214&&stag!=cc.pinball.currentTag){
            //PUKE A
            if(cc.pinball.currentTag==211||cc.pinball.currentTag==212||cc.pinball.currentTag==213||cc.pinball.currentTag==210){
                return
            }
            if(!this.Poker[4].children[0].active){
                if(cc.pinball.dtime){
                    cc.pinball.score+=500*2
                }else{cc.pinball.score+=500}
                cc.audioEngine.play(this.Mp3[3],false)
                this.Pdisplay[4]=true
                this.Poker[4].children[0].active=true
                if(this.Pdisplay[0]&&this.Pdisplay[1]&&this.Pdisplay[2]&&this.Pdisplay[3]&&this.Pdisplay[4]){
                    this.redBALL[1].active=true
                    this.ub.color= new cc.Color(174,255,13);
                } 
            }
        }else if(stag==100&&stag!=cc.pinball.currentTag){
            if(this.blockcount==0){
                for (let index = 0; index < this.blocks.children.length; index++) {
                    if(!this.blocks.children[index].active){
                        this.blocks.children[index].active=true
                    }
                }
                this.EXIT.active=true
                this.EXIT1.active=false
            }
        }else if(stag==1000&&stag!=cc.pinball.currentTag){
            cc.hscoreball.Hscore=cc.pinball.score
            cc.pinball.Hcount--
            //小球落袋后 暂时调整为结束 后期需要加数量逻辑 2018-09-12 cuip
                this.submit()
                cc.audioEngine.play(this.Mp3[9],false)
                this.node.active=false
                this.node.parent.active=false
                this.gameover.active=true
                this.gameover.position=cc.v2(0,750)
                this.gameover.runAction(cc.moveTo(1,0,0))
            // if(cc.pinball.Hcount>=0){
            //     this.submit()
            //     cc.director.loadScene("game")
            // }else{
            //     this.submit()
            //     cc.audioEngine.play(this.Mp3[9],false)
            //     this.node.active=false
            //     this.node.parent.active=false
            //     this.gameover.active=true
            //     this.gameover.position=cc.v2(0,750)
            //     this.gameover.runAction(cc.moveTo(1,0,0))
            // }
        }else if(stag==999&&stag!=cc.pinball.currentTag){
            cc.audioEngine.play(this.Mp3[6],false)
            var tem=selfCollider.body.getWorldCenter()
            var num1=Math.random()*100
            var num=Math.random()*200-100
            selfCollider.body.applyLinearImpulse(cc.v2(num,num1),tem,true)
        }else if(stag==1101||stag==1102||stag==1103||stag==1104||stag==1105||stag==1106||stag==1107||stag==1108||stag==1109||stag==1110||stag==1111||stag==1112){
            cc.audioEngine.play(this.Mp3[0],false)
            if(otherCollider.node.color.equals(new cc.Color (255,255,255))){
                otherCollider.node.color=new cc.Color (63,49,168)
                this.ballcolor[stag-1101]=2
                var num= stag-1101
                if(num<=3){
                    if(this.ballcolor[0]==this.ballcolor[1]&&this.ballcolor[0]==this.ballcolor[2]&&this.ballcolor[0]==this.ballcolor[3]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }else if(num>3&&num<=7){
                    if(this.ballcolor[4]==this.ballcolor[5]&&this.ballcolor[4]==this.ballcolor[6]&&this.ballcolor[4]==this.ballcolor[7]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false

                    }
                }else if(num>7&&num<=11){
                    if(this.ballcolor[8]==this.ballcolor[9]&&this.ballcolor[8]==this.ballcolor[10]&&this.ballcolor[8]==this.ballcolor[11]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }
            }else if(otherCollider.node.color.equals(new cc.Color (63,49,168))){
                otherCollider.node.color=new cc.Color (175,228,9)
                this.ballcolor[stag-1101]=3
                var num= stag-1101
                if(num<=3){
                    if(this.ballcolor[0]==this.ballcolor[1]&&this.ballcolor[0]==this.ballcolor[2]&&this.ballcolor[0]==this.ballcolor[3]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }else if(num>3&&num<=7){
                    if(this.ballcolor[4]==this.ballcolor[5]&&this.ballcolor[4]==this.ballcolor[6]&&this.ballcolor[4]==this.ballcolor[7]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }
                }else if(num>7&&num<=11){
                    if(this.ballcolor[8]==this.ballcolor[9]&&this.ballcolor[8]==this.ballcolor[10]&&this.ballcolor[8]==this.ballcolor[11]){

                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
            }else if(otherCollider.node.color.equals(new cc.Color (175,228,9))){
                otherCollider.node.color=new cc.Color (255,255,255)
                this.ballcolor[stag-1101]=1
                var num= stag-1101
                if(num<=3){
                    if(this.ballcolor[0]==this.ballcolor[1]&&this.ballcolor[0]==this.ballcolor[2]&&this.ballcolor[0]==this.ballcolor[3]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }else if(num>3&&num<=7){
                    if(this.ballcolor[4]==this.ballcolor[5]&&this.ballcolor[4]==this.ballcolor[6]&&this.ballcolor[4]==this.ballcolor[7]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false

                    }
                }else if(num>7&&num<=11){
                    if(this.ballcolor[8]==this.ballcolor[9]&&this.ballcolor[8]==this.ballcolor[10]&&this.ballcolor[8]==this.ballcolor[11]){
                        var anum=Math.floor(Math.random()*6)
                        this.numcolor.children[anum].active=false
                    }
                }
            }
        }else if(stag==3004&&stag!=cc.pinball.currentTag){
            selfCollider.body.linearVelocity=cc.v2(0,0)
            setTimeout(function(){
                otherCollider.node.parent.active=false
                this.bgcolor.active=true
                this.node.position=cc.v2(212,240)
            }.bind(this),100)
        }else if(stag==215&&stag!=cc.pinball.currentTag){
            this.bgcolor.active=false
            this.marry.active=true
            selfCollider.body.linearVelocity=cc.v2(0,0)
            setTimeout(function(){
                this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(cc.random0To1()*600-300, cc.random0To1()*300+500)
            }.bind(this),100)
        }else if(stag==850&&stag!=cc.pinball.currentTag){
            this.upball.active=false
            this.downball.active=false
        } else if(stag==666){
            this.faqiunode.getComponent(cc.Sprite).enabled=true
            this.faqiunode.children[0].active=true
        }
        this.score.string=cc.pinball.score
        cc.pinball.currentTag=stag
    },
    submit:function(){
        if(window.wx){
            window.wx.postMessage({
                messageType: 1,
                KEY1: "x1",
                score:cc.pinball.score,
            });
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
    update (dt) {
       if(this.node.y>=0){
                cc.pinball.USA= this.BUSA
                cc.pinball.USB= this.BUSB
        }else if(this.node.y<0){
                cc.pinball.USA= this.BDSA
                cc.pinball.USB= this.BDSB
        }
    },
});
