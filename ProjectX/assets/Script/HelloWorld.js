var Tower = require("tower")

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
		heart1Spr:cc.Sprite,
		heart2Spr:cc.Sprite,
		heart3Spr:cc.Sprite,
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
		var sizerange = 1;
		console.log("TOUCH_END");
		if(this.inGame){
			this.touched = false;
			var count = this.frame - this.touchedFrame;
			if(this.tower.floorList.length == 1 || count <= this.tower.floorList[1].size){
				this.label.string = this.tower.floorList.length;
				if (this.tower.floorList.length > 1 && this.tower.floorList[1].size-sizerange <= count){
					this.tower.floorList[0].size = this.tower.floorList[1].size;
					if (this.hp < 3){
						this.hp ++;
						this.onHpUpdate(this.hp);
					}
				}
				this.tower.addFloor();
			}else{
				this.tower.floorList[0].size = 0;
				this.hp --;
				this.onHpUpdate(this.hp);
				if (this.hp < 1){
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
	
	onHpUpdate: function(hp){
		console.log("hp"+hp);
		this.heart1Spr.node.active = hp >= 1;
		this.heart2Spr.node.active = hp >= 2;
		this.heart3Spr.node.active = hp >= 3;
	},
	
	onClickButton: function(event){
		this.hp = 3;
		this.frame = 0;
		this.touched = false;
		this.tower.clear();
		this.tower.addFloor();
		this.playBtn.node.active = false;
		this.inGame = true;
		this.label.string = 0;
		this.onHpUpdate(this.hp);
	}
});
