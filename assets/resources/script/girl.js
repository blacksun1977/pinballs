cc.Class({
    extends: cc.Component,

    properties: {
        role:cc.Node,
        girlscript:require("game"),
        bgcolor:cc.Node,
        pball:cc.Node,
        kuang:cc.Node
    },
    onLoad () {

    },
    start () {
        this.Contact=false
        this.girlscript.ongirl()
    },
    onBeginContact:function(contact,selfCollider,otherCollider){ 
        var stag= otherCollider.tag
        if(stag==3000){
            this.node.stopAllActions()
            this.node.children[0].getComponent(cc.Animation).stop()
            this.node.children[1].getComponent(cc.Animation).stop()
        }else if(stag==999){
            if(!this.Contact){
                this.Contact=true
            }
            selfCollider.body.linearVelocity=cc.v2(0,0)
        }else if(stag==3001){
            this.Contact=false
            selfCollider.body.linearVelocity=cc.v2(0,0)
            setTimeout(function(){
                if(cc.pinball.dtime){ cc.pinball.score+=1000*2  }else{cc.pinball.score+=1000}
                this.node.position=cc.v2(150,474)
                for (let index = 0; index < this.kuang.children.length; index++) {
                    if(!this.kuang.children[index].active){
                        this.kuang.children[index].active=true
                    }
                }
                this.node.children[0].active=true
                this.node.children[1].active=false
                this.girlscript.ongirl()
            }.bind(this),100)
        }else if(stag==3002){
            this.Contact=false
            selfCollider.body.linearVelocity=cc.v2(0,0)
            setTimeout(function(){
                if(cc.pinball.dtime){ cc.pinball.score+=1000*2  }else{cc.pinball.score+=1000}
                //cc.pinball.score+=1000
                this.node.position=cc.v2(150,474)
                for (let index = 0; index < this.kuang.children.length; index++) {
                    if(!this.kuang.children[index].active){
                        this.kuang.children[index].active=true
                    }
                }
                this.node.children[0].active=true
                this.node.children[1].active=false
                this.girlscript.ongirl()
            }.bind(this),100)
        }else if(stag==3003){
            this.Contact=false
            selfCollider.body.linearVelocity=cc.v2(0,0)
            setTimeout(function(){
                this.node.position=cc.v2(150,474)
                this.node.children[0].active=true
                this.node.children[1].active=false
                otherCollider.node.parent.active=false
                this.bgcolor.active=true
                this.pball.position=cc.v2(246,133)
            }.bind(this),100)
        }
    },
    update (dt) {
        if(this.Contact){
            if(cc.pinball.dir==1){
                cc.pinball.dir=0
                this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(-100,0)
                this.node.children[0].active=true
                this.node.children[1].active=false
                this.node.children[1].getComponent(cc.Animation).stop()
                this.node.children[0].getComponent(cc.Animation).play()
                this.node.children[0].getComponent(cc.Animation).on('finished', function(){
                    this.node.children[0].getComponent(cc.Animation).play()
                }, this);
            }else if(cc.pinball.dir==2){
                cc.pinball.dir=0
                this.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(100,0)
                this.node.children[1].active=true
                this.node.children[0].active=false
                this.node.children[0].getComponent(cc.Animation).stop()
                this.node.children[1].getComponent(cc.Animation).play()
                this.node.children[1].getComponent(cc.Animation).on('finished', function(){
                    this.node.children[1].getComponent(cc.Animation).play()
                }, this);
            }
        }
    },
});
