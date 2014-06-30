
var GameConfig = {

    LOG_LEVEL: 4,

    GAME_ID: 'com.tresensa.test-game',
    TITLE: 'Escape The Dark',
    VERSION: '1.0.0',

    ORIENTATION: 'landscape',   

    CONSTRUCTOR: 'Runner',
    SOURCE: [
        "js/game/Level.js",
	    "js/game/Runner.js",
	    
	    "js/game/ObjectClasses/Player.js",
	    "js/game/ObjectClasses/Coin.js",
	    "js/game/ObjectClasses/StationaryObstacle.js",
	    "js/game/ObjectClasses/MovingObstacle.js",
        "js/game/ObjectClasses/Darkness.js",
	    
	    "js/game/Screens/GameScreen.js",
	    "js/game/Screens/EndScreen.js",
	    "js/game/Screens/StartScreen.js",
        "js/game/Screens/TutScreen.js",
        "js/game/Screens/LoadScreen.js"
    ],

    CSS: [
        "assets/fonts/font.css"
    ],

    EXCLUDE: [
    ],

	TGL: {
		VERSION: '1.0'
	},

    TGS: {
        ENABLED: true,
        VERSION: '0.3'
    },

    TGE: {
        ENABLED: true,
        FONT_LOADER: false,
        VERSION: '1.0'
    }
};