


var Floor = cc.Class( {
  properties: {
    size : 0,
	color : "#FFFFFF"
  },

  drawToCanvas: function(ctx, index) {
    //ctx.fillStyle = this.color;
    //ctx.fillRect(canvas.width/2 - this.size*3/2, canvas.height/2+index * 100, this.size*3, 100)
	ctx.fillColor = cc.hexToColor(this.color);
	ctx.rect(-this.size*3/2,0-index * 100,this.size * 3,100);
	ctx.fill();
  },
});

