
Coin = function()
{
	//Coin settings
	this.mPickedUp = false;
	this.mIsAlien = false;

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
		if(params.isAlien)
			params.image = "ufo";
		else
			params.image = "coin";
		this.mIsAlien = params.isAlien;
    	this.mGame = params.gameScreen;
    	Coin.superclass.setup.call(this,params);
    	this.cullToViewport(false,false,false,true);
    	return this;
	},


	DetectCollisions : function(event)
	{
		var player = this.mGame.GetPlayer();
		var rect2 = new TGE.Rectangle(player.worldX - player.width/2, player.worldY - player.height/2, player.width, player.height);
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
				this.markForRemoval();	
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

extend(Coin, TGE.Sprite);