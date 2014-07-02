
Coin = function()
{
	//Coin settings
	this.mPickedUp = false;
	this.mIsAlien = false;
	this.animArray = [];

	//Boring stuff
    Coin.superclass.constructor.call(this);
    this.addEventListener("update", this.DetectCollisions.bind(this));
    this.useWorldPosition(true);
    this.mGame = null;
    return this;
}

Coin.prototype = {


	setup : function(params) 
	{
		Coin.superclass.setup.call(this,params);
		if(params.isAlien)
		{
			//params.image = "ufo";
			this.animArray["alien"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
				image : "alien",
				rows : 1,
				columns : 3,
				totalFrames : 3,
				fps : 8,
				looping : true,
				visible : false
			}));
			this.PlayAnimation("alien");
		}
		else
		{
			//params.image = "coin";
			this.animArray["glow"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
				image : "coinAnim",
				rows : 1,
				columns : 4,
				totalFrames : 1,
				fps : 1,
				looping : false,
				visible : false
			}));
			this.PlayAnimation("glow");
		}
		this.mIsAlien = params.isAlien;
    	this.mGame = params.gameScreen;
    	this.player = this.mGame.GetPlayer();
    	this.cullToViewport(false,false,false,true);
    	return this;
	},

	PlayAnimation : function(name) 
	{
    
	    // If it's already started playing, don't start it again
	    if (this.currentAnim == this.animArray[name]) return;
		
		// Stop playing old animation if there is one
		if (this.currentAnim != null) {
			this.currentAnim.visible = false;
			this.currentAnim.gotoAndStop(0);
		}
		
		// Start playing next animation
		this.currentAnim = this.animArray[name];
		this.currentAnim.visible = true;
		this.currentAnim.gotoAndPlay(0);
	},


	DetectCollisions : function(event)
	{
		if(this.worldX+this.width/2 > this.player.mCamDist +this.mGame.width/2)
			return;
		if(this.worldX-this.width/2 < this.player.mCamDist -this.mGame.width/2)
			return;
		if(this.player.worldX < this.worldX - 64 - this.width/2)
			return;
		if(this.worldX > this.player.worldX + 100)
			return;
		if(this.worldY + this.height/2 > this.player.worldY + this.player.height/2)
			return;
		var rect2 = new TGE.Rectangle(this.player.worldX - this.player.width/2, this.player.worldY - this.player.height/2, this.player.width, this.player.height);
		var rect1 = new TGE.Rectangle(this.worldX - this.width/2, this.worldY - this.height/2, this.width, this.height);
		
		//console.log(this.width);

		var ret = false;
		var r1 = rect1.x + rect1.width;
		var r2 = rect2.x + rect2.width;
		if((rect1.x >= rect2.x && rect1.x <= r2) || (r1 >= rect2.x && r1 <= r2))
		{
			var y1 = rect1.y + rect1.height;
			var y2 = rect2.y + rect2.height;
			if((rect1.y <= y2 && rect1.y >= rect2.y) || (y1 <= y2 && y1 >= rect2.y))
			{
				ret = true;
			}
		}
		if (ret) 
		{
			if(this.mIsAlien)
			{
				this.mGame.GetPlayer().mStopped = true;
				this.mGame.PlayerHitObstacle("alien");
				//this.markForRemoval();	
				// //Play background music
				// TGE.Game.GetInstance().audioManager.Play({ 
				// 	id:'hitObstacle_sound', 
				// 	loop:'0' 
				// });
			}
			else
			{
				this.mPickedUp = true;
	        	this.mGame.PlayerHitCoin({cx:this.worldX,cy:this.worldY});
	        	this.markForRemoval();
	        }
		}	
	},
	
	
}

extend(Coin, TGE.SpriteSheetAnimation);