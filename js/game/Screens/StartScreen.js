StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    this.isMuted = false;
    if(localStorage.getItem("isMuted") != null)
        this.isMuted = localStorage.getItem("isMuted");
    //background image
    this.addChild(new TGE.Sprite().setup({
    	x : this.percentageOfWidth(0.5),
        y : this.percentageOfHeight(0.5),
    	image: "startscreen_background",
    }));
    
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
    }
	
}

extend(StartScreen, TGE.Window);