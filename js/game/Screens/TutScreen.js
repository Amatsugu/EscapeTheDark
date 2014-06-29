TutScreen = function() {
    TutScreen.superclass.constructor.apply(this, arguments);
    
    this.curScreen = 0;
    this.isDone = false;
    this.screens = new Array();
    this.addEventListener("update", this.Update.bind(this));
    return this;
}



TutScreen.prototype = {

    setup : function(params) {
        EndScreen.superclass.setup.call(this, params);
        this.addChild(new TGE.Sprite().setup({
                x : this.percentageOfWidth(0.5),
                y : this.percentageOfHeight(0.5),
                image: "tutBG",
            }));
        
        this.screens[0] = this.addChild(new TGE.Sprite().setup({
            x : 0,
            y : 0,
            registrationX : 0,
            registrationY : 0,
            image : "tut1"
        }));

        this.screens[1] = this.addChild(new TGE.Sprite().setup({
            x : this.width,
            y : 0,
            registrationX : 0,
            registrationY : 0,
            image : "tut2"
        }));

        this.addChild(new TGE.Button().setup({
            x : this.width-20-32,
            y : this.height-20-32,
            image: "next",
            numStates : 4,
            pressFunction : this.nextScreen.bind(this),
        }));

        return this;
    },

    Update : function(event) {
        if(this.isDone)
            return;
        if(this.curScreen > 1)
        {
            this.Back();
            this.isDone = true;
            return;
        }
        for(var i = 0; i < this.screens.length; i++)
        {
            var cur = this.screens[i];
            cur.x = this.Lerp(cur.x, (this.width*i)-(this.width*this.curScreen), 0.1);
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

    Back : function()
    {
        this.transitionToWindow({
            windowClass : StartScreen,
            fadeTime : 0.25
        });
    },

    nextScreen : function()
    {
        this.curScreen++;
    }
}


extend(TutScreen, TGE.Window);
