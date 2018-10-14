cc.Class({
    extends: cc.Component,

    properties: {
        viewNode: cc.Sprite
    },
    onLoad() {
        if (window.wx) {
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 600;
            window.sharedCanvas.height = 800;
        }
    },
    start() {

    },
    _updaetSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        this.tex.initWithElement(window.sharedCanvas);
        this.tex.handleLoadedTexture();
        this.viewNode.spriteFrame = new cc.SpriteFrame(this.tex);

    },
    onret: function () {
        this.node.parent.active = false
    },
    update(dt) {
        if (window.wx) {
            this._updaetSubDomainCanvas()
        }
    },
});