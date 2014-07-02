Runner = function()
{
    Runner.superclass.constructor.call(this);

    //var Brad = new Font();
    //Brad.fontFamily = "Brady";
    //Brad.src = "assets/fonts/Brad.ttf";

    TGE.LoadingWindow = LoadScreen;

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
       
        //Coins
        {id:'coin',                     url:'coin.png'},
        {id:'coinAnim',                     url:'coinAnim.png'},
        
        
        //Player pieces
        {id:'player_running',           url:'char/run/NinjaRunAnim.png'},
        {id:'player_running2',           url:'char/run/RunAnim.png'},
        {id:'player_flying',            url:'char/jump/JumpingAnim.png'},
        {id:'player_idle',            url:'char/run/IdleAnim.png'},


        // Backgrounds
        {id:'startscreen_background',   url:'screens/startscreen_background.jpg'},
        {id:'endscreen_background',     url:'screens/endscreen_background.jpg'},
        {id:'gamescreen_background',    url:'screens/gamescreen_background.png'},
        {id:'gamescreen_ground',        url:'screens/gamescreen_ground.png'},
        {id:'gamescreen_middleground',  url:'screens/gamescreen_middleground.png'},
        {id:'cover',  url:'screens/StarAnim.jpg'},
        {id:'ninja',  url:'screens/NinjaAnim.png'},
        {id:'tutBG',  url:'screens/TutBG.png'},
        {id:'title', url:'screens/Title.png'},
        {id:'gamescreen_moon',  url:'screens/moon.png'},
           
        // Buttons
        {id:'play_button',              url:'buttons/play_button.png'},
        {id:'playagain_button',         url:'buttons/playagain_button.png'},
        {id:'main_button',         url:'buttons/main_button.png'},
        {id:'mute',                     url:'buttons/Mute.png'},
        {id:'muted',                    url:'buttons/Muted.png'},
        {id:'pause',                    url:'buttons/Pause.png'},
        {id:'tut',                    url:'buttons/Tutorial.png'},
        {id:'next',                    url:'buttons/Next.png'},
        
        //UI
        {id:'distance_ui',               url:'distance_ui.png'},  
        {id:'orb_ui',                    url:'orb_ui.png'},
        {id:'leftHUD',                   url:'screens/HUD_left.png'},
        {id:'rightHUD',                   url:'screens/HUD_right.png'},
        {id:'tut1',                   url:'screens/tut/tut1.png'},
        {id:'tut2',                   url:'screens/tut/tut2.png'},
        {id:'cred',                   url:'screens/tut/cred.png'},
        {id:'cred2',                   url:'screens/tut/cred2.png'},


        //FX
        {id:'beam',                     url:'fx/Beam.png'},
        {id:'dk1',                     url:'fx/Darkness1.png'},
        {id:'dk2',                     url:'fx/Darkness2.png'},
        
        //Sounds
        {id:'background_music',         url:'sounds/The Complex.ogg',          backup_url:'sounds/The Complex.mp3',       assetType:"audio"},
        {id:'menuMusic',         url:'sounds/Undaunted.ogg',          backup_url:'sounds/Undaunted.mp3',       assetType:"audio"},
        {id:'AlienFly',         url:'sounds/AlienFly.wav',          backup_url:'sounds/AlienFly.mp3',       assetType:"audio"},
        {id:'hitObstacle_sound',        url: 'sounds/Abduct.wav',        backup_url:'sounds/Abduct.mp3',      assetType:"audio"},
        {id:'hitCoin_sound',            url:'sounds/Coin.wav',             backup_url:'sounds/Coin.mp3',          assetType:"audio"}, 
        {id:'hitDarkness_sound',        url:'sounds/Darkness.wav',         backup_url:'sounds/Darkness.mp3',      assetType:"audio"}
      ]);

    TGE.FirstGameWindow = StartScreen;//GameScreen;//TODO Change to StartScreen once finished.
    
};

extend(Runner,TGE.Game);

