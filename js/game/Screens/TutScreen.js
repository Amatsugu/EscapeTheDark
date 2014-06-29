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
        
        return this;
    },

    Start : function()
    {
        this.transitionToWindow({
            windowClass : GameScreen,
            fadeTime : 0.25
        });
    }
}


extend(EndScreen, TGE.Window);
