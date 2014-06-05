
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
		var playerBounds = this.mGame.GetPlayer().getBounds();
		var coinBounds = this.getBounds();
		if (coinBounds.intersects(playerBounds, 0.7, 0.7)) 
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