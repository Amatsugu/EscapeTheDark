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

	//Coin generation parameters
	this.mCoinFrequency = 0;
	this.mCoinHeight = this.height / 2;
	this.mCoinWaveAmplitude = 0;
	this.mCoinWaveFrequency = 0;
	this.mCoinWaveTimer = 0;

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
		this.addChild(this.UILayer = new TGE.DisplayObjectContainer().setup({}));
		
		//Setup parallax planes
		this.SetupParallaxingPlanes();
		
		
		//Setup player
		this.addChild(this.mPlayer = this.addChild(new Player().setup({
			x : this.percentageOfWidth(0.5),
			y : this.percentageOfHeight(0.5),
			gameScreen : this
		})));

		//Add Darkness
		this.addChild(this.mDarkness = this.addChild(new Darkness().setup({
			x : this.percentageOfWidth(0.5),
			y : this.percentageOfHeight(0.5),
			gameScreen : this
		})));

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

		if (!this.mPlaying) return;
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
		this.mDistance = this.mPlayer.mDistance/100;
		this.distanceDisplay.x = this.width-10-this.distanceDisplay.width/2;
		this.distanceUI.x = this.width -(this.distanceUI.width/2) -  this.distanceDisplay.width + 30;
		//this.mPlayer.hasCollided = false;
		// Read & make level
		this.ReadNextEvent(event.elapsedTime);
		//this.SpawnObstacles(event.elapsedTime);
		this.GenerateRandom(event.elapsedTime);
		this.SpawnCoins(event.elapsedTime);
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
						this.coinLayer.addChild(new Coin().setup({
							worldX : this.mSpawnNextPos,
							worldY : pos,
							isAlien : false,
							gameScreen : this
						}));
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
			worldY: 450,
			trackingSpeed : -.006,
		}));
		
		//Middle ground plane
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_middleground",
			worldY : 250,
			trackingSpeed : 0.25 
		}));
		
		//Scrolling ground plane
		this.artLayer.addChild(new TGE.ParallaxPane().setup({
			image : "gamescreen_ground",
			worldY: 0,
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
		this.distanceDisplay = this.UILayer.addChild(new TGE.Text().setup({
			x : this.width,
			y : 30,
			text : "0",
			font : "Tahoma 20px",
			color : "#green",
			align : "right",
			size : 16
		}));
		
		//Feet icon that sits in front of the distance traveled number
	    this.distanceUI = this.UILayer.addChild(new TGE.Sprite().setup({
	    	x : 25,
	        y : 25,
	    	image : "distance_ui",
	    	scaleX : 0.5,
	    	scaleY : 0.5
	    }));

		//Text that displays coins collected
		this.coinDisplay = this.UILayer.addChild(new TGE.Text().setup({
			x : 72,
			y : 30,
			text : "0",
			font : "Tahoma 20px",
			color : "green"
		}));
		
		//Coin icon that sits in front of the coins collected number
	    this.addChild(new TGE.Sprite().setup({
	    	x : 25,
	        y : 30,
	    	image : "coin",
	    	scaleX : 0.75,
	    	scaleY : 0.75
	    }));

	    //Pause Text
	    this.pauseText = this.UILayer.addChild(new TGE.Text().setup({
			x : this.width/2,
			y : -50,
			text : "Game Paused \nPress Escape To Resume",
			font : "Tahoma 20px",
			color : "white"
		}));
		this.pauseText.x = (this.width/2)-(this.pauseText.width/2);
	    
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
			//Alien Death Here
			TGE.Game.GetInstance().audioManager.Play({
				id : 'hitObstacle_sound',
				loop : '0'
			});
		}

		//End game
		this.EndGame();
	},
	
	GetScore : function() {

		//Score is distance * coins
		return Math.floor(((this.mDistance * (this.mCoins+1))));//+this.mTotalJumps);
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
