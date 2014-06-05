Darkness = function() {

	//Stuff you always need
	Darkness.superclass.constructor.call(this);
	this.addEventListener("update", this.StayOnTheScreen.bind(this));
	this.useWorldPosition(false);
	return this;
}

Darkness.prototype = {


	setup : function(params) 
	{
		this.mGame = params.gameScreen;
		params.x = 25;
		params.image = "Darkness";
		params.y = 268;
		Darkness.superclass.setup.call(this, params);
		return this;
	},
	
	StayOnTheScreen : function(event) 
	{
		this.x = (Math.sin(this.mGame.mDistance)*15)+10;
	}


}

extend(Darkness, TGE.Sprite);
