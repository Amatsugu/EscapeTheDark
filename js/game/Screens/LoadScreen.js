LoadScreen = function() {
    LoadScreen.superclass.constructor.apply(this, arguments);
    
    var message = new Array();
    message[0] = "Plotting Invasion...";
    message[1] = "Generating Darkness...";
    message[2] = "Training Ninja...";
    message[3] = "Landing Ufo...";
    message[4] = "Probing Earthlings...";
    message[5] = "Illuminating Darkness...";
    var len = message.length-1;
    var msg = message[Math.floor(Math.random() * (len - 0 + 1)) + 0];
    if(msg == null)
        msg = message[0];
    this.addChild(new TGE.Text().setup({
        x : this.width/2,
        y : this.height/2,
        text : "   "+msg+"   ",
        font : "35px Brady",
        color : "white",
        backgroundColor : "#000000"
    }));


    console.log(msg);
    
    
    return this;
}



LoadScreen.prototype = {

    setup : function(params) {
        LoadScreen.superclass.setup.call(this, params);
        


        return this;
    },


}


extend(LoadScreen, TGE.Window);
