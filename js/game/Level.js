

var level = [

    {player_speed:0.01},
    {acceleration:0.001},
    {jump_speed:21},
    {gravity:1},
    {alienSpawnChance:5},//1 in how many chance for an enemy to spawn

    

   // Coins
    {begin_segment:"Coin Line"},

    {time:0,     event:"coin_y",         value:0.75},

    {time:2,     event:"coin_frequency", value:200},

    {time:3,     event:"end_segment"},

    //Coin Boxes
    {begin_segment:"Coin Boxes"},

    {time:0,     event:"coin_y",             value:0.7},

    {time:0,     event:"coin_frequency",     value:0},

    {time:0,     event:"coin_box",           size:2},

    {time:1,     event:"coin_box",          size:4},

    {time: 6,    event:"end_segment"}, 

    //Coin Sinewave
    {begin_segment:"A Coin Sinewave"},

    {time:0,     event:"coin_frequency",     value:0},

    {time:0,     event:"coin_frequency",     value:200},

    {time:0,     event:"coin_height",     value:0.5},

    {time:0,     event:"coin_sinewave",     frequency:4, amplitude:100},

    {time:4,    event:"end_segment"},

    // The End
   // {begin_segment:"END"},
   // {time:5,     event:"game_finished"}
];