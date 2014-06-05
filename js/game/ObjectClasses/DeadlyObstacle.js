DeadlyObstacle = function() {

	//Stuff you always need
	DeadlyObstacle.superclass.constructor.call(this);
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

DeadlyObstacle.prototype = {


	setup : function(params) 
	{
		this.DetermineObstacleType(params, params.position);
		this.mGame = params.gameScreen;
		DeadlyObstacle.superclass.setup.call(this, params);
		this.cullToViewport(false, false, false, true);
		return this;
	},
	
	DetermineObstacleType : function(params, position) 
	{
		params.worldY = position;
		params.image = "Deadly_Obstacle";
	},


	DetectCollisions : function(event) 
	{
		var obstacleBuffer = 0.7;
		var playerBuffer = 0.7;
		var playerBounds = this.mGame.GetPlayer().getBounds();
		var obstacleBounds = this.getBounds();
		var player = this.mGame.GetPlayer();
		if (obstacleBounds.intersects(playerBounds, obstacleBuffer, playerBuffer))
		{
			// if((obstacleBounds.y-0.1 <= (playerBounds.y + playerBounds.height)) && obstacleBounds.x+.2 < playerBounds.x)
			// 	player.SetGroundLevel(obstacleBounds.y);
			// else
			// 	player.FallBack();
			// if((obstacleBounds.x + obstacleBounds.width) < playerBounds.x)
			// 	player.ResetGroundLevel();
			this.mGame.GetPlayer().mStopped = true;
			this.mGame.PlayerHitObstacle();
			this.markForRemoval();	
		}else
			player.ResetGroundLevel();
	}


}

extend(DeadlyObstacle, TGE.Sprite);
