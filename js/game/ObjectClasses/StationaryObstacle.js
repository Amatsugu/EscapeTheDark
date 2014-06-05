StationaryObstacle = function() {

	this.set = false;
	this.reset = false;
	this.type = "";
	this.ID = 0;
	//Stuff you always need
	StationaryObstacle.superclass.constructor.call(this);
	this.addEventListener("update", this.DetectCollisions.bind(this));
	this.useWorldPosition(true);
	return this;
}

StationaryObstacle.prototype = {


	setup : function(params) 
	{
		this.DetermineObstacleType(params, params.type);
		this.mGame = params.gameScreen;
		this.ID = params.id;
		StationaryObstacle.superclass.setup.call(this, params);
		this.cullToViewport(false, false, false, true);
		return this;
	},
	
	DetermineObstacleType : function(params, type) 
	{
		//Building A
		this.type = type;
		console.log(params, type)
		if (type == "1" || type == "4") {  				
			params.image = "Building_A";
			//params.worldY = 400;
			params.worldY = 10;
		}	
		
		//Buildig B
		else if (type == "2" || type == "5") {  		
			params.image = "Building_B";
			//params.worldY = 0;
				params.worldY = 35;
		}

		//Building C
		else if (type == "3" || type == "6") {  		
			params.image = "Building_C";
			//params.worldY = 0;
				params.worldY = 85;
		}
		
	},


	DetectCollisions : function(event) 
	{
		var obstacleBuffer = 1;
		var playerBuffer = 3;
		var obstacleBounds = this.getBounds();
		var player = this.mGame.GetPlayer();
		var playerBounds = player.getBounds();
		var pY = player.worldY;
		var pX = player.worldX;
		var oX = this.worldX-50;
		var oY = this.worldY;
		var pWideX = pX + playerBounds.width;
		var pTallY = pY + playerBounds.height;
		var oWideX = oX + obstacleBounds.width-50;
		var oTallY = player.mOrigGround + obstacleBounds.height;
		if(pX > oWideX && !this.reset && this.set)
		{
			player.ResetGroundLevel(this.ID);
			this.reset = true;
		}

		if(pWideX > oX && pX <= oWideX)
		{
			if(pY > oTallY && !this.set && !this.reset)
			{
				player.SetGroundLevel(oTallY, this.ID);
				this.set = true;
			}
			// if(pWideX > oX+playerBuffer && pY < oTallY)
			// {
			// 	player.SetGroundLevel(oTallY-1);
			// 	this.set = true;
			// }
			//console.log(oX, pX)
		}
		// if((pX + pWideX*.5) > oWideX && !this.reset && this.set)
		// {
		// 	this.set = true;
		// }
		

		if(pWideX >= oX - obstacleBuffer && pX < oX + obstacleBuffer && pY < oTallY - playerBuffer && !this.reset && !this.set)// && pWideX <= oX+obstacleBuffer)//(!this.set && !this.reset))
		{
			var doesHang = false;
			if(pTallY - 20 < oTallY)
				doesHang = true;
			player.FallBack(this.ID, doesHang);
		}

	}


}

extend(StationaryObstacle, TGE.Sprite);
