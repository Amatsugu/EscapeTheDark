GameScreen = function(width, height) {
	GameScreen.superclass.constructor.apply(this, arguments);

	//Stats
	this.mDistance = 0;
	this.mCoins = 0;
	this.curID = 0;
	this.isPaused = false;
	
	//Level stuff
	this.mEventTimer = 0;
	this.mEventIndex = 0;
	this.mLastCoin = 0;
	this.mPlaying = true;
	this.mSpawnNextPos = 5;
	this.mDarkness;
	this.floorOffset = 20;
	this.elapsedTime = 0;
	this.hasEnded = false;
	this.darkStage = 0;

	//Obstacle generation parameters
	this.mLastObstacle = 0;
	this.alienSpawnChance = 3;
		
	// Event listeners
	this.addEventListener("update", this.Update.bind(this));
	this.addEventListener("mousedown", this.MouseDown.bind(this));
	this.addEventListener("keydown", this.KeyInput.bind(this));
};

GameScreen.prototype = {

	setup : function() {
		
		//Setup camera
		TGE.Game.GetInstance().mCameraLocation = new TGE.Point();

		//Setup layers
		this.addChild(this.artLayer = new TGE.DisplayObjectContainer().setup({}));
		this.addChild(this.coinLayer = new TGE.DisplayObjectContainer().setup({}));
		this.addChild(this.obstacleLayer = new TGE.DisplayObjectContainer().setup({}));
		
		
		//Setup parallax planes
		this.SetupParallaxingPlanes();
		
		
		//Setup player
		this.addChild(this.mPlayer = this.addChild(new Player().setup({
			x : this.percentageOfWidth(0.5),
			y : this.percentageOfHeight(0.5),
			registrationX : 0.5,
			gameScreen : this
		})));
		this.addChild(this.UILayer = new TGE.DisplayObjectContainer().setup({}));

		/*//Add Darkness
		this.addChild(this.mDarkness = this.addChild(new Darkness().setup({
			x : this.percentageOfWidth(0.5),
			y : this.percentageOfHeight(0.5),
			gameScreen : this
		})));*/

		//Add distance display & coin display
		this.SetupHud();
		
		this.mSpawnNextPos = this.mPlayer.mCamDist + this.width;
		//Play background music
		TGE.Game.GetInstance().audioManager.Play({ 
			id:'background_music', 
			loop:'1' 
		});
	},

	Update : function(event) {

		if (!this.mPlaying) 
		{
			if(this.causeOfDeath == "alien")
			{
				this.mPlayer.mCurSpeed = 0;
				if(this.ufo.x < (this.mPlayer.x)+10)
				{
					this.rightBeam.alpha = this.Lerp(this.rightBeam.alpha, 1.1, .1);
				}
				if(this.rightBeam.alpha >= .7)
				{
					this.mPlayer.mVerticalSpeed = 1;
					this.ufo.y -= 1;
					console.log("test");
					if(this.ufo.y < 0)
					{
						if(!this.hasEnded)
							this.EndGame();
					}
				}
				this.ufo.x = this.Lerp(this.ufo.x, this.mPlayer.x, 0.1);
				if(this.rightBeam.alpha <= .7)	
					this.ufo.y = this.Lerp(this.ufo.y, 50 , 0.1);
				this.rightBeam.x = this.ufo.x;
				this.rightBeam.y = this.ufo.y;
				
			}else
			{
				console.log(this.darkStage);
				this.mPlayer.mVerticalSpeed = 0;
				if(this.darkStage == 0)
				{
					this.dark1.visible = true;
					this.dark2.visible = true;
					this.dark1.y = this.mPlayer.y;
					this.dark2.y = this.mPlayer.y;
					this.darkStage++;
				}
				if(this.darkStage >= 1)
				{
					this.dark1.y = this.mPlayer.y + (Math.sin(this.elapsedTime)*5);
					this.dark2.y = this.mPlayer.y + (Math.sin(this.elapsedTime)*5);
				}
				if(this.darkStage == 1)
				{
					this.dark1.x = this.Lerp(this.dark1.x, 0, 0.1);
					this.dark2.x = this.Lerp(this.dark2.x, 0, 0.1);
					if(this.dark1.x > -10 || this.dark2.x > -10)
						this.darkStage++;
				}
				if(this.darkStage == 2)
				{
					this.dark1.x = this.Lerp(this.dark1.x, -512, 0.1);
					this.dark2.x = this.Lerp(this.dark2.x, -512, 0.1);
					this.mPlayer.mCurSpeed = -5;
					if(this.dark1.x < -500 || this.dark2.x < -500)
						this.darkStage++;
				}
				if(this.darkStage == 3)
				{
					this.mPlayer.mCurSpeed = 0;
					if(!this.hasEnded)
						this.EndGame();
				}
			}
			//Darkness
			this.darkness.y = this.height/2 + (Math.sin(this.elapsedTime)*10);
			this.darknessBack.y = this.height/2 + (Math.cos(this.elapsedTime)*10);
			this.elapsedTime += 0.1;
			return;
		}
		if(this.isPaused)
		{
			var h = this.pauseText.height;
			var tar = (this.height/2)-(h/2);
			this.pauseText.y = this.Lerp(this.pauseText.y, tar, .1);
			return;
		}else
		{
			if(this.pauseText.y != -50)
				this.pauseText.y = this.Lerp(this.pauseText.y, this.height+50, .1);
			if(this.pauseText.y >= this.height+10)
				this.pauseText.y = -50;
		}
			//Move Camera
		TGE.Game.GetInstance().mCameraLocation.y = 180;
		TGE.Game.GetInstance().mCameraLocation.x = this.mPlayer.mCamDist;
		// Update the distance and coin displays
		this.distanceDisplay.text = Math.floor(this.mDistance).toString();
		this.coinDisplay.text = Math.floor(this.mCoins).toString();
		this.coinDisplay.x = 155 + this.coinDisplay.width/2;
		this.mDistance = this.mPlayer.mDistance/100;
		this.distanceDisplay.x = this.width-10-this.distanceDisplay.width/2;
		this.distanceUI.x = this.width -(this.distanceUI.width/2) -  this.distanceDisplay.width + 50;
		this.leftHUD.x = this.Lerp(this.leftHUD.x, this.coinDisplay.width + this.coinDisplay.x - 180, 0.1);
		this.rightHUD.x = this.Lerp(this.rightHUD.x, this.distanceUI.x + 50, .1);

		//Darkness
		this.darkness.y = this.height/2 + (Math.sin(this.elapsedTime)*10);
		this.darknessBack.y = this.height/2 + (Math.cos(this.elapsedTime)*10);
		
		//this.mPlayer.hasCollided = false;
		// Read & make level
		this.ReadNextEvent(event.elapsedTime);
		//this.SpawnObstacles(event.elapsedTime);
		this.GenerateRandom(event.elapsedTime);
		this.SpawnCoins(event.elapsedTime);
		this.elapsedTime += 0.1;
	},
	
	ReadNextEvent : function(elapsedTime) {

		this.mEventTimer += elapsedTime;
		var nextEvent = level[this.mEventIndex];
		if (nextEvent != null) {
			
			// starting a new segment of events?
			if (nextEvent.begin_segment != null) {
				this.mEventTimer = 0;
				this.mEventIndex++;
				this.mCoinFrequency = 0;
				this.mObstacleFrequency = 0;
			}
			
			// setting player's speed?
			else if (nextEvent.player_speed != null) {
				this.mPlayer.SetSpeed(nextEvent.player_speed);
				this.mEventIndex++;
			}

			else if(nextEvent.acceleration != null)
			{
				this.mPlayer.SetAccel(nextEvent.acceleration);
				this.mEventIndex++;
			}
			
			// setting fall speed?
			else if (nextEvent.jump_speed != null) {
				this.mPlayer.SetJumpSpeed(nextEvent.jump_speed);
				this.mEventIndex++;
			}
			
			//setting elien spawnrate
			else if(nextEvent.alienSpawnChance != null)
			{
				this.alienSpawnChance = nextEvent.alienSpawnChance;
				this.mEventIndex++;
			}
			// setting gravity?
			else if (nextEvent.gravity != null) {
				this.mPlayer.SetGravity(nextEvent.gravity);
				this.mEventIndex++;
			}
			
			// making an event?
			else if (this.mEventTimer >= nextEvent.time) {

				// setting coin frequency?
				if (nextEvent.event == "coin_frequency") {
					this.mCoinFrequency = nextEvent.value;
				}
				
				// setting the coin height?
				else if (nextEvent.event == "coin_height") {
					this.mCoinHeight = this.height * nextEvent.value;
				}
				
				// starting a coin sine wave?
				else if (nextEvent.event == "coin_sinewave") {
					this.mCoinWaveAmplitude = nextEvent.amplitude;
					this.mCoinWaveFrequency = nextEvent.amplitude == 0 ? 0 : nextEvent.frequency;
					this.mCoinWaveTimer = 0;
				}
				
				// making a coin box?
				else if (nextEvent.event == "coin_box"){
		            this.GenerateCoinBox(nextEvent.size);
		        }
				
				// displaying nothing?
				else if (nextEvent.event == "nothing") {
					this.mCoinFrequency = 0;
				}
				
				// ending game?
				else if (nextEvent.event == "game_finished") {
					//this.EndGame();
					this.mEventIndex = 3
				}

				this.mEventIndex++;
			}
		}
	},

	GenerateRandom : function(elapsedTime)
	{
		var spawnRange = this.mPlayer.mCamDist + this.width;
		if(spawnRange >= this.mSpawnNextPos)
		{
			var typeNum = -1;
			if(this.mLastObstacle % 3 == 0)
			{
				typeNum = this.RandomRange(0,2);
			}
			else
			{
				typeNum = this.RandomRange(0,3);
			}
			if(this.RandomRange(0,3) == 0 && this.mLastObstacle <= 3)
			{
				typeNum += 2;
				if(typeNum > 6)
					typeNum = 0;
			}
			this.mLastObstacle = typeNum;
			if (typeNum != -1 && typeNum != 0) 
			{	

					this.obstacleLayer.addChild(new StationaryObstacle().setup({
						worldX : this.mSpawnNextPos,
						type : typeNum,
						id : this.curID,
						gameScreen : this
					}));
					this.curID++;
					if(typeNum == 4 || typeNum == 5 || typeNum == 6)
					{
						if(typeNum == 4)
							pos = this.mPlayer.mOrigGround + 50;
						else if(typeNum == 5)
							pos = this.mPlayer.mOrigGround + 100;
						else if(typeNum == 6)
							pos = this.mPlayer.mOrigGround + 200;
						pos += this.floorOffset+10;
						this.coinLayer.addChild(new Coin().setup({
							worldX : this.mSpawnNextPos,
							worldY : pos,
							isAlien : true,
							gameScreen : this
						}));
					}else
					{
						if(typeNum == 1)
							pos = this.mPlayer.mOrigGround + 50;
						else if(typeNum == 2)
							pos = this.mPlayer.mOrigGround + 100;
						else if(typeNum == 3)
							pos = this.mPlayer.mOrigGround + 200;
						pos += this.floorOffset;
						var height = this.RandomRange(0,4);
						var width = height;
						for(var x = 0; x < width; x++)
						{
							var xOffset = (48*width*0.5)-24;
							for(var y = 0; y < height; y++)
							{
								this.coinLayer.addChild(new Coin().setup({
									worldX : this.mSpawnNextPos + (48*x) - xOffset,
									worldY : pos + (48*y),
									isAlien : false,
									gameScreen : this
								}));
							}
						}
					}

			}
			this.mSpawnNextPos += 300;
		}
	},

	RandomRange : function(min,max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	SpawnCoins : function(elapsedTime) {

		var x = this.mPlayer.worldX;
		if (this.mCoinFrequency == 0) {
			this.mLastCoin = x;
		} 
		else if ((x - this.mLastCoin) > this.mCoinFrequency) {
			// Create it
			var extra = (x - this.mLastCoin) - this.mCoinFrequency;
			var cx = x - extra;
			var cy = this.mCoinHeight + Math.sin(this.mCoinWaveTimer * this.mCoinWaveFrequency) * this.mCoinWaveAmplitude;
			
			this.coinLayer.addChild(new Coin().setup({
				worldX : cx + this.width * 2,
				worldY : cy,
				gameScreen : this
			}));

			this.mLastCoin = cx;
		}

		this.mCoinWaveTimer += elapsedTime;
	},
	
	GenerateCoinBox: function(size){
        var size = Math.max(2,size);
        

        // Define the origin position
        var ox = this.mPlayer.worldX + this.width * 2;
        var oy = this.mCoinHeight;
    
        var coinSize = 56;
        var cx = ox - (coinSize * size) / 2;
        var cy = oy - (coinSize * size) / 2;    
    
    	// Make the matrix of coins
        for(var y = 0; y < size; y++)
        {
            cx = ox - (coinSize * size) / 2;
            for(var x = 0; x < size; x++)
            {
                this.coinLayer.addChild(new Coin().setup({
                    worldX : cx + this.width * 2,
                    worldY : cy,
                    image: "coin",
                    gameScreen : this
                }));
                    
                cx += coinSize;
            }
            cy += coinSize;
        }
    },

	EndGame : function() {
		this.hasEnded = true;
		this.transitionToWindow({
			windowClass : EndScreen,
			fadeTime : 1.25,
			score : Math.floor(this.GetScore()),
			coins : Math.floor(this.mCoins),
			distance : Math.floor(this.mDistance),
			jumps : this.mPlayer.mTotalJumps,
			death : this.deathCause
		});
	},
	
	SetupParallaxingPlanes : function() {
		// NOTES:  
		//trackingSpeed:  increasing makes that plane scroll faster on the screen
		//worldY:  is the height of that plane. 0 is the bottom of screen, 450 is the top of screen
		
		//Background image
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_background",
			worldY: 450,
			trackingSpeed : 0.01,
		}));

		//Background image
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_moon",
			worldY: 400,
			trackingSpeed : -.006,
		}));
		
		//Middle ground plane
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_middleground",
			worldY : 190,
			trackingSpeed : 0.25 
		}));
		
		//Scrolling ground plane
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_ground",
			worldY: 0 + this.floorOffset,
			trackingSpeed : 1
		}));
	},
	
	SetupHud : function() {
		// NOTES:
		// x and y : the x coordinate of the text or image
		// text : the actual text that will appear on screen
		// scaleX and scaleY : we're shrinking the coin icon so it's smaller than actual coins
		
		
		//Text that displays distance traveled
		//console.log(this.width);


		//Darkness
		this.darkness = this.UILayer.addChild(new TGE.Sprite().setup({
			x:74,
			y:this.height/2,
			image : "Darkness"
		}));

		this.darknessBack = this.UILayer.addChild(new TGE.Sprite().setup({
			x:74,
			y:this.height/2,
			image : "DarknessBack"
		}));


		var fontSize = "45px Brady";

		this.rightHUD = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : this.width-128,
	        y : 30,
	    	image : "rightHUD",
	    }));

		this.distanceDisplay = this.UILayer.addChild(new TGE.Text().setup({
			x : this.width,
			y : 25,
			text : "0",
			font : fontSize,
			color : "cyan",
			align : "right",
			size : 16
		}));
		
		//Feet icon that sits in front of the distance traveled number
	    this.distanceUI = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : 25,
	        y : 25,
	    	image : "distance_ui",
	    	scaleX : 0.6,
	    	scaleY : 0.6
	    }));

	    this.leftHUD = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : 128,
	        y : 30,
	    	image : "leftHUD",
	    }));

		//Text that displays coins collected
		this.coinDisplay = this.UILayer.addChild(new TGE.Text().setup({
			x : 160,
			y : 25,
			text : "0",
			font : fontSize,
			color : "cyan"
		}));
		
		//Orb UI
	    this.addChild(new TGE.Sprite().setup({
	    	x : 74,
	        y : 25,
	    	image : "orb_ui",
	    	scaleX : 0.6,
	    	scaleY : 0.6
	    }));

	    this.rightBeam = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : this.width,
	    	y : 0,
	    	image : "beam",
	    	visible : false,
	    	registrationY : 0,
	    	alpha : 0
	    }));

	    this.dark1 = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : -512,
	    	y : 0,
	    	image : 'dk1',
	    	visible : false,
	    	registrationX : 0
	    }));
	    
	    this.dark2 = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : -512,
	    	y : 0,
	    	image : 'dk2',
	    	visible : false,
	    	registrationX : 0
	    }));

	    this.ufo = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : this.width+50,
	    	y : -50,
	    	image : "ufo",
	    	visible : false,
	    }));

	    //Pause Text
	    this.pauseText = this.UILayer.addChild(new TGE.Text().setup({
			x : this.width/2,
			y : -50,
			text : "Game Paused",
			font : "35px Brady",
			color : "white"
		}));

	    this.UILayer.addChild(new TGE.Button().setup({
	    	x : 10+32,
	    	y : this.height-32-10,
	    	image : "pause",
	    	numStates : 4,
	        pressFunction : this.PauseGame.bind(this),
	    }));

		this.pauseText.x = (this.width/2)-(this.pauseText.width/2);
	    
	},

	PauseGame : function()
	{
		this.isPaused = !this.isPaused;
	},

	PlayerHitCoin : function(params) 
	{
		//Play sound
		TGE.Game.GetInstance().audioManager.Play({
			id : 'hitCoin_sound',
			loop : '0'
		});

		//Increase coins
		this.mCoins += 1;
	},
	
	PlayerHitObstacle : function(cause) 
	{
		// Stop sound
		if(!this.mPlaying)
			return;
		this.mPlaying = false;
		this.mPlayer.mVerticalSpeed = -3;		
		TGE.Game.GetInstance().audioManager.StopAll();
		this.deathCause = cause;
		//Play sound
		if(cause == "dark")
		{
			//Dark Death Sound Here!
			TGE.Game.GetInstance().audioManager.Play({ 
				id:'hitDarkness_sound', 
				loop:'0' 
			});
			
		}else if(cause == "alien")
		{
			this.rightBeam.visible = true;
			this.ufo.visible = true;
			this.mPlayer.PlayAnimation("fly");
			//Alien Death Here
			TGE.Game.GetInstance().audioManager.Play({
				id : 'hitObstacle_sound',
				loop : '0'
			});
		}
		this.causeOfDeath = cause;

		//End game
		//this.EndGame();
	},
	
	GetScore : function() {
		if(this.mCoins == 0)
			return Math.floor(this.mDistance);
		//Score is distance * coins
		return Math.floor(this.mDistance * this.mCoins);//+this.mTotalJumps);
	},
	
	IncPlayerDistance : function(pixels) 
	{
		this.mDistance += pixels / 100; 
	},

	GetPlayer : function() 
	{
		return this.mPlayer; 
	},

	MouseDown : function() 
	{
		this.mousedown = true; 
	},

	KeyInput : function(event)
	{
		if(event.keyCode == 27)
		{
			this.isPaused = !this.isPaused;
		}else if(event.keyCode == 32)
		{
			this.mousedown = true;
		}
	},

	Lerp : function(a, b, t)
	{
		return this.Round(a + (b - a)*t, 1000);
	},

	Round : function(n, d)
	{
		return Math.round(n*d)/d;
	},

}
extend(GameScreen, TGE.Window);
