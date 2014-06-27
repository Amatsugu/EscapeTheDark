EndScreen = function() {
    EndScreen.superclass.constructor.apply(this, arguments);
    
    // Background image
    
    
    
    
    
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
        if(params.death == "alien")
        {
            
        }else
        {
            
        }

        // Try Again button
        this.addChild(new TGE.Button().setup({
            x : 700,
            y : 435,
            image: "playagain_button",
            numStates : 4,
            pressFunction : this.PlayAgain.bind(this),
        }));

        // Display distance traveled
        this.addChild(this.distanceDisplay = new TGE.Text().setup({
            x : 820,
            y : 48,
            color: "red",
            font : "40px LOXO",
        }));
        
        // Display coins earned
        this.addChild(this.coinDisplay = new TGE.Text().setup({
            x : 820,
            y : 92,
            color: "yellow",
            font :  "40px LOXO",
        }));

        // Display Times jumped
        this.addChild(this.jumpsDisplay = new TGE.Text().setup({
            x : 820,
            y : 137,
            color: "aqua",
            font :  "40px LOXO",
        }));
        
        // Display final score
        this.addChild(this.scoreDisplay = new TGE.Text().setup({
            x : 700,
            y : 300,
            color: "cyan",
            font :  "50px LOXO",
        }));

        this.tgsWidget = new TGS.Widget.CreateWidget({
            x : 75,
            y : 100,
            showLogin : false,
            disableLeaderboard : true,
        });
    
        // Update final totals
        this.coinDisplay.text = params.coins.toString();
        this.distanceDisplay.text = params.distance.toString();
        this.scoreDisplay.text = params.score.toString();
        this.jumpsDisplay.text = params.jumps.toString();
        
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
    }
}


extend(EndScreen, TGE.Window);
