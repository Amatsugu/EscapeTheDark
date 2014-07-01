StartScreen = function() {
    StartScreen.superclass.constructor.apply(this, arguments);
    
    this.isMuted = false;
    this.animArray = [];
    if(localStorage.getItem("isMuted") != null)
        this.isMuted = localStorage.getItem("isMuted");
    if(this.isMuted == "true")
        this.isMuted = true;
    else
        this.isMuted = false;
    //background image

    this.animArray["main"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
            image : "cover",
            rows : 1,
            columns : 2,
            totalFrames : 2,
            fps : 4,
            looping : true,
            visible : true,
            height : this.height,
            width : this.width,
            x : 0,
            y : 0,
            scaleX : 1,
            scaleY : 1,
            registrationX : 0,
            registrationY : 0
        }));
    this.animArray["main"].height = this.height;
    this.animArray["main"].width = this.width;
    this.animArray['main'].gotoAndPlay(0);

    this.animArray["ninja"] = this.addChild(new TGE.SpriteSheetAnimation().setup({
            image : "ninja",
            rows : 1,
            columns : 6,
            totalFrames : 6,
            fps : 4,
            looping : true,
            visible : true,
            x : 0,
            y : this.height,
            scaleX : 1,
            scaleY : 1,
            registrationX : 0,
            registrationY : 1
        }));

    this.animArray['ninja'].gotoAndPlay(0);
    this.addChild(new TGE.Sprite().setup({
        image : 'title',
        x : 0,
        y : 0,
        registrationX : 0,
        registrationY : 0
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
    
    if(this.isMuted == true)
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