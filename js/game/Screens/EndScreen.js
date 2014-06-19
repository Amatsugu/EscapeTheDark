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
            x : 765,
            y : 400,
            image: "playagain_button",
            pressFunction : this.PlayAgain.bind(this),
        }));

        // Display distance traveled
        this.addChild(this.distanceDisplay = new TGE.Text().setup({
            x : 875,
            y : 48,
            color: "red",
            font : "Tahoma 10px",
        }));
        
        // Display coins earned
        this.addChild(this.coinDisplay = new TGE.Text().setup({
            x : 875,
            y : 92,
            color: "yellow",
            font : "Tahoma 10px",
        }));

        // Display Times jumped
        this.addChild(this.jumpsDisplay = new TGE.Text().setup({
            x : 875,
            y : 137,
            color: "aqua",
            font : "Tahoma 10px",
        }));
        
        // Display final score
        this.addChild(this.scoreDisplay = new TGE.Text().setup({
            x : 765,
            y : 295,
            color: "cyan",
            font : "Tahoma 30px",
        }));
    
		// Update final totals
		this.coinDisplay.text = params.coins.toString();
		this.distanceDisplay.text = params.distance.toString();
		this.scoreDisplay.text = params.score.toString();
        this.jumpsDisplay.text = params.jumps.toString();
	    
	    return this;
	},

	PlayAgain : function() {
	    this.transitionToWindow({
	        windowClass : GameScreen,
	        fadeTime : 0.75
	    });
	}
}


extend(EndScreen, TGE.Window);
