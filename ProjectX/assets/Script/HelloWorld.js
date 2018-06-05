var Tower = require("tower")

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
		labGameOver: cc.Label,
		playBtn: cc.Button,
		graphics: {
			default: null,	
			type: cc.Graphics
		},
        // defaults, set visually when attaching this script to the Canvas
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = 0;
		this.inGame = false;
		this.tower = new Tower();	
		this.node.on('touchstart', this.onTouchStart,this);
		this.node.on('touchend', this.onTouchEnd,this);
		this.playBtn.node.on('click', this.onClickButton, this);
		this.labGameOver.node.active = false;
    },

    // called every frame
    update: function (dt) {
		this.frame ++;
		if(this.touched)
			this.tower.floorList[0].size = this.frame - this.touchedFrame;
		var ctx = this.graphics.getComponent(cc.Graphics);
		ctx.clear();
		this.tower.drawToCanvas(ctx);
    },
	
	onTouchStart: function(e){
		console.log("TOUCH_START");
		if(this.inGame){
			this.touched = true;
			this.touchedFrame = this.frame;
		}
	},
	onTouchEnd: function(e){
		console.log("TOUCH_END");
		if(this.inGame){
			this.touched = false;
			var count = this.frame - this.touchedFrame;
			if(this.tower.floorList.length == 1 || count <= this.tower.floorList[1].size){
				this.label.string = this.tower.floorList.length;
				this.tower.addFloor();
			}else{
				this.tower.floorList[0].size = 0;
				if (this.hp > 1)
					this.hp --;
				else{
					this.inGame = false;
					this.labGameOver.node.active = true;
				}
			}
		}else{
			if(this.labGameOver.node.active){
				this.tower.clear();
				this.labGameOver.node.active = false;
				this.playBtn.node.active = true;
			}
		}
	},
	
	onClickButton: function(event){
		this.hp = 3;
		this.frame = 0;
		this.touched = false;
		this.tower.clear();
		this.tower.addFloor();
		this.playBtn.node.active = false;
		this.inGame = true;
	}
});
