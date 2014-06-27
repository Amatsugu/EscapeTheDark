Runner = function()
{
    Runner.superclass.constructor.call(this);

    var LOXO = new Font();
    LOXO.fontFamily = "LOXO";
    //LOXO.src = "assets/fonts/LOXO.ttf";
     // load all assets for game
    this.assetManager.addAssets("required",[
        
        //Stationary Obstacles
        {id:'Building_A',    url:'stationaryObstacles/build_A.png'},
        {id:'Building_B',    url:'stationaryObstacles/build_B.png'},
        {id:'Building_C',    url:'stationaryObstacles/build_C.png'},
        {id:'ufo',  url:'stationaryObstacles/ufo.png'},
        {id:'alien',  url:'stationaryObstacles/AlienAnim.png'},
        {id:'Darkness',  url:'widgets/darkness.png'},
        {id:'DarknessBack', url:'widgets/darkness-back.png'},
       
        //Moving Obstacles
        {id:'moving_obstacle_A', 		url:'movingObstacles/moving_obstacle_A.png'},
        {id:'moving_obstacle_B', 		url:'movingObstacles/moving_obstacle_B.png'},
        
        //Coins
        {id:'coin',   					url:'coin.png'},
        {id:'coinAnim',                     url:'coinAnim.png'},
        
        
        //Player pieces
        {id:'player_running',   		url:'char/run/NinjaRunAnim.png'},
        {id:'player_flying', 			url:'char/jump/JumpingAnim.png'},
        {id:'player_idle',            url:'char/run/IdleAnim.png'},


        // Backgrounds
        {id:'startscreen_background',   url:'screens/startscreen_background.jpg'},
        {id:'endscreen_background',   	url:'screens/endscreen_background.jpg'},
        {id:'endscreen_background2',     url:'screens/endscreen_background_2.jpg'},
        {id:'gamescreen_background',   	url:'screens/gamescreen_background.jpg'},
        {id:'gamescreen_ground',   		url:'screens/gamescreen_ground.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen_middleground.png'},
        {id:'gamescreen_moon',  url:'screens/moon.png'},
           
        // Buttons
        {id:'play_button',   			url:'buttons/play_button.png'},
        {id:'playagain_button',   		url:'buttons/playagain_button.png'},
        {id:'mute',                     url:'buttons/Mute.png'},
        {id:'muted',                    url:'buttons/Muted.png'},
        
        //UI
        {id:'distance_ui',   			 url:'distance_ui.png'},  
        {id:'orb_ui',                    url:'orb_ui.png'},
        {id:'leftHUD',                   url:'screens/HUD_left.png'},
        {id:'rightHUD',                   url:'screens/HUD_right.png'},


        //FX
        {id:'beam',                     url:'fx/Beam.png'},
        
        //Sounds
        {id:'background_music',			url:'sounds/background_music.ogg',			backup_url:'sounds/background_music.mp3',		assetType:"audio"},
        {id:'hitObstacle_sound',		url: 'sounds/hitObstacle_sound.ogg',		backup_url:'sounds/hitObstacle_sound.mp3',		assetType:"audio"},
        {id:'hitCoin_sound',			url:'sounds/hitCoin_sound.ogg',				backup_url:'sounds/hitCoin_sound.mp3',			assetType:"audio"}, 
        {id:'hitDarkness_sound',        url:'sounds/hitDarkness_sound.ogg',         backup_url:'sounds/hitDarkness_sound.mp3',      assetType:"audio"}
      ]);

    TGE.FirstGameWindow = StartScreen;//GameScreen;//TODO Change to StartScreen once finished.
    
};

extend(Runner,TGE.Game);

