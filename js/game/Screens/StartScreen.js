StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    this.isMuted = false;
    this.animArray = [];
    if(localStorage.getItem("isMuted") != null)
        this.isMuted = localStorage.getItem("isMuted");
    //background image

    this.animArray["main"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
            image : "cover",
            rows : 3,
            columns : 4,
            totalFrames : 12,
            fps : 4,
            looping : true,
            visible : false,
            x : 0,
            y : 0,
            registrationX : 0,
            registrationY : 0
        }));

    this.PlayAnimation("main");
    
    //play button
    this.addChild(new TGE.Button().setup({
        x : this.width-150-10,
        y : this.height-50-10,
        image: "play_button",
        numStates : 4,
        pressFunction : this.gotoGameScreen.bind(this),
    }));


    this.muteButton = this.addChild(new TGE.Button().setup({
        x : 20+32,
        y : this.height-20-32,
        image: "mute",
        numStates : 4,
        pressFunction : this.muteGame.bind(this),
    }));

    this.mutedButton = this.addChild(new TGE.Button().setup({
        x : 20+32,
        y : this.height-20-32,
        image: "muted",
        numStates : 4,
        visible : false,
        pressFunction : this.muteGame.bind(this),
    }));

    this.addChild(new TGE.Button().setup({
        x : 40+32+64,
        y : this.height-20-32,
        image: "tut",
        numStates : 4,
        pressFunction : this.startTut.bind(this),
    }));
    
    if(this.isMuted)
    {
        this.muteButton.visible = false;
        this.mutedButton.visible = true;
        TGE.Game.GetInstance().audioManager.Mute();
    }
  
}


StartScreen.prototype = {

	gotoGameScreen : function() {
		this.transitionToWindow({
			windowClass : GameScreen,
			fadeTime : 0.75
		});
	},

    muteGame : function()
    {
        this.isMuted = !this.isMuted;
        if(this.isMuted)
        {
            this.muteButton.visible = false;
            this.mutedButton.visible = true;
            TGE.Game.GetInstance().audioManager.Mute();
        }
        else
        {
            this.muteButton.visible = true;
            this.mutedButton.visible = false;
            TGE.Game.GetInstance().audioManager.Unmute();
        }
        localStorage.setItem("isMuted", this.isMuted);
    },

    startTut : function()
    {
        this.transitionToWindow({
            windowClass : TutScreen,
            fadeTime : 0.75
        });
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
    }
	
}

extend(StartScreen, TGE.Window);