EndScreen = function() {
    EndScreen.superclass.constructor.apply(this, arguments);
    
    // Background image
    
    this.bestScore = 0;
    if(localStorage.getItem("bestScore") != null)
        this.bestScore = localStorage.getItem("bestScore");
    
    
    
    return this;
}

EndScreen.prototype = {

    setup : function(params) {
        EndScreen.superclass.setup.call(this, params);
        this.addChild(new TGE.Sprite().setup({
                x : this.percentageOfWidth(0.5),
                y : this.percentageOfHeight(0.5),
                image: "endscreen_background",
            }));

        TGE.Game.GetInstance().audioManager.Play({ 
                id:'menuMusic', 
                loop:'1' 
            });
        
        // Try Again button
        this.addChild(new TGE.Button().setup({
            x : 440+205-10,
            y : 425,
            image: "playagain_button",
            numStates : 4,
            pressFunction : this.PlayAgain.bind(this),
        }));

        this.addChild(new TGE.Button().setup({
            x : 440+200+205-10,
            y : 425 ,
            image: "main_button",
            numStates : 4,
            pressFunction : this.ToMain.bind(this),
        }));

        var Font = "36px Brady";
        var x1 = 813;
        // Display distance traveled
        this.addChild(this.distanceDisplay = new TGE.Text().setup({
            x : x1,
            y : 40,
            color: "00a9ff",
            font : Font,
        }));
        
        // Display coins earned
        this.addChild(this.coinDisplay = new TGE.Text().setup({
            x : x1,
            y : 85,
            color: "00a9ff",
            font :  Font,
        }));

        // Display Times jumped
        this.addChild(this.jumpsDisplay = new TGE.Text().setup({
            x : x1,
            y : 130,
            color: "00a9ff",
            font :  Font,
        }));
        
        var x2 = 690;
        // Display final score
        this.addChild(this.scoreDisplay = new TGE.Text().setup({
            x : x2,
            y : 280,
            color: "00a9ff",
            font :  "50px Brady",
        }));

        this.addChild(this.best = new TGE.Text().setup({
            x : x2,
            y : 325,
            color: "c50013",
            font :  "24px Brady",
        }));

        this.tgsWidget = new TGS.Widget.CreateWidget({
            x : 65,
            y : 100,
            showLogin : false,
            disableLeaderboard : true,
            shareMessage : "I'm Escaping the Darkness with a score of "+params.score+", try your hand at escaping.",
        });
    
        // Update final totals
        this.coinDisplay.text = params.coins.toString();
        this.distanceDisplay.text = params.distance.toString();
        this.scoreDisplay.text = params.score.toString();
        this.jumpsDisplay.text = params.jumps.toString();

        if(params.score > this.bestScore)
        {
            localStorage.setItem("bestScore", params.score);
            this.best.color = "FFAE00";
            this.best.text = "New Highscore!";
        }
        else
        {
            this.best.text = "Your Highscore: " + this.bestScore;
        }

        
        return this;
    },

    ReStart : function()
    {
        this.transitionToWindow({
            windowClass : GameScreen,
            fadeTime : 0.25
        });
    },

    PlayAgain : function() {
       this.tgsWidget.close(this.ReStart.bind(this));   
    },


    ToMain : function() {
       this.tgsWidget.close(this.GoMain.bind(this));   
    },

    GoMain : function()
    {
        this.transitionToWindow({
            windowClass : StartScreen,
            fadeTime : 0.25
        });
    },
}


extend(EndScreen, TGE.Window);
