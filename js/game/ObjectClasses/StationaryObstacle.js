StationaryObstacle = function() {

	this.set = false;
	this.reset = false;
	this.type = "";
	this.ID = 0;
	this.mHeight = 0;
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
		var player = this.mGame.GetPlayer();
		var i = player.colliders.length;
		//console.log(this.registrationX);
		var collisionRect = new TGE.Rectangle(25+this.worldX-this.width/2, this.worldY-this.height/2, this.width, this.height-25);
		player.colliders[i] = collisionRect;
		return this;
	},
	
	DetermineObstacleType : function(params, type) 
	{
		//Building A
		this.type = type;
		//console.log(params, type)
		if (type == 1 || type == 4) {  				
			params.image = "Building_A";
			//params.worldY = 400;
			params.worldY = 25;
			this.mHeight = 50;
		}	
		
		//Buildig B
		else if (type == 2 || type == 5) {  		
			params.image = "Building_B";
			//params.worldY = 0;
				params.worldY = 50;
				this.mHeight = 100;
		}

		//Building C
		else if (type == 3 || type == 6) {  		
			params.image = "Building_C";
			//params.worldY = 0;
				params.worldY = 100;
				this.mHeight = 200;
		}
		
	},

	DetectCollisions : function(event) 
	{
		var obstacleBuffer = 1;
		var playerBuffer = 3;
		var obstacleBounds = this.getBounds();
		var player = this.mGame.GetPlayer();
		var playerBounds = player.getBounds();
		var pWideX = player.mDistance + playerBounds.width;
		var oWideX = this.worldX+obstacleBounds.width/2;
		var oX = this.worldX-obstacleBounds.width/2;
		var oY = player.mOrigGround + obstacleBounds.height;
		//player.checkCollision(oX, oY, obstacleBounds, this.ID);
	}


}

extend(StationaryObstacle, TGE.Sprite);
