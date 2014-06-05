Player = function() {
	Player.superclass.constructor.call(this);
	
	// Player settings
	this.mGroundHeight = 70;
	this.mHorizontalSpeed = 0;
	this.mJumpSpeed = 0;
	this.mGravity = 0;
	this.mPosition = 0;
	this.mDistance = 0;
	this.mCamDist = 0;
	this.mCurSpeed = 0;
	this.mOrigGround = 0;
	this.mCamSpeed = 0;
	this.curID = 0;
	this.mTotalJumps = 0;

	
	// Animation settings
	this.currentAnim = null;
	this.animArray = [];
	this.mStopped = false;
	
	// Boring stuff
	this.addEventListener("update", this.UpdatePosition.bind(this));
	this.useWorldPosition(true);
	return this;
}

Player.prototype = {


	setup : function(params) 
	{
    	this.mGame = params.gameScreen;
    	this.mOrigGround = this.mGroundHeight;
		Player.superclass.setup.call(this, params);
		this.SetupAnimations();
		return this;
	},
	
	SetupAnimations : function() 
	{
		
		// Running animation
		this.animArray["run"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
			image : "player_running",
			rows : 1,
			columns : 5,
			totalFrames : 5,
			fps : 10,
			looping : true,
			visible : false
		}));
		
		// Flying animation
		this.animArray["fly"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
	        image : "player_flying",
	        rows : 1,
	        columns : 3,
	        totalFrames : 3,
	        fps : 16,
	        looping : false,
	        visible : false
		}));

		// Hang animation
		this.animArray["hang"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
	        image : "player_hang",
	        rows : 1,
	        columns : 2,
	        totalFrames : 2,
	        fps : 8,
	        looping : false,
	        visible : false
		}));

		// Start player out running
		this.PlayAnimation("run");
	},
	
	
	UpdatePosition : function(event) 
	{
		
		if (this.mStopped) return;
	
		if(this.mGame.mousedown)//Gets Player Input
		{
			if(this.mPosition == this.mGroundHeight)
			{
				this.mVerticalSpeed = this.mJumpSpeed; //Apply Jump
				this.PlayAnimation("fly");
				this.mTotalJumps++;
			}
		}

		if(this.mPosition > this.mGroundHeight)//Apply Gravity
			this.mVerticalSpeed -= this.mGravity;

		if(this.mPosition < this.mGroundHeight)//Retrun to ground level
		{
			this.mVerticalSpeed = 0;
			this.PlayAnimation("run");
			this.mPosition = this.mGroundHeight;
		}

		// if(this.mPosition > (this.mGame.height - this.currentAnim.height))//Prevents screen exit from top of screen
		// {
		// 	this.mVerticalSpeed = -(this.mGravity+2);
		// 	this.mPosition = this.mGame.height - this.currentAnim.height;
		// }

		if(this.mCurSpeed < this.mHorizontalSpeed)//Accelerate to match intended speed
		{
			this.mCurSpeed += this.mHorizontalSpeed;
		}
		if(this.mCurSpeed > this.mHorizontalSpeed) //Prevents speed from exceeding intended speed
		{
			this.mCurSpeed = this.mHorizontalSpeed;
			this.PlayAnimation("run");
		}

		if(this.mDistance < this.mCamDist+ this.mGame.width/4)//Allows the player to get ahead on screen
		{
			if(this.mCamSpeed > this.mHorizontalSpeed/2)
				this.mCamSpeed -= this.mHorizontalSpeed*.0005;
			else
				this.mCamSpeed = this.mHorizontalSpeed/2;
		}else //Prevents player from getting too far ahead
		{
			if(this.mCamSpeed < this.mHorizontalSpeed)
			{
				this.mCamSpeed += this.mHorizontalSpeed*0.2;
			}else
				this.mCamSpeed = this.mHorizontalSpeed;
		}
		this.mPosition += this.mVerticalSpeed; //Use vertical speed to determine vertical position
		this.mDistance += this.mCurSpeed; //use horizontal speed to determine distance traveled
		this.mCamDist += this.mCamSpeed; //uses the camera's speed to determine the camera's X position

		if(((this.mCamDist-2) - this.mGame.width/2) > this.mDistance) //Kill the player if he/she exits on screen left
		{
			this.mGame.GetPlayer().mStopped = true;
			this.mGame.PlayerHitObstacle("dark");
			//this.markForRemoval();
		}

		this.worldX = this.mDistance; //Applys player X
		this.worldY = this.mPosition; //Applys player Y
	},

	FallBack : function(id, doesHang)
	{
		if(id > this.curID)
			this.curID = id;
		if(id == this.curID)
		{
			this.mCurSpeed = -this.mCamSpeed;
			this.mCamSpeed = this.mHorizontalSpeed;
		}
		if(doesHang)
			this.PlayAnimation("hang");
	},

	SetGroundLevel : function(level, id)
	{
		if(id > this.curID)
			this.curID = id;
		if(id == this.curID)
			this.mGroundHeight = level;
	},

	ResetGroundLevel : function(id)
	{
		if(id > this.curID)
			this.curID = id;
		if(id == this.curID)
			this.mGroundHeight = this.mOrigGround;
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


	SetSpeed : function(speed) {
		this.mHorizontalSpeed = speed * this.mGame.width;
		this.mCamSpeed = this.mHorizontalSpeed;
	},
	
	SetJumpSpeed : function(jumpSpeed) {
		this.mJumpSpeed = jumpSpeed;
	},
	
	SetGravity : function(gravity) {
		this.mGravity = gravity;
	},
	
	
}

extend(Player, TGE.SpriteSheetAnimation); 