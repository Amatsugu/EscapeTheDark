

var level = [

    {player_speed:0.01},
    {jump_speed:12.5},
    {gravity:.54},

    
    //Obstacles
    {begin_segment:"Some Obstacles"},

   {time:0,     event:"obstacle_frequency",     value:300},

   {time:0,     event:"obstacle_pattern",     value:"12304023023420"},

   {time:12,    event:"end_segment"},

   {begin_segment:"Some Obstacles2"},

   {time:0,     event:"obstacle_frequency",     value:300},

   {time:0,     event:"obstacle_pattern",     value:"023013021304"},

   {time:12,    event:"end_segment"},



    //Coins
    // {begin_segment:"Coin Line"},

    // {time:0,     event:"coin_y",         value:0.75},

    // {time:2,     event:"coin_frequency", value:200},

    // {time:3,     event:"end_segment"},


    //Obstacle
    {begin_segment:"An Obstacle"},

    {time:0,     event:"obstacle_frequency",     value:300},

    {time:0,     event:"obstacle_pattern",     value:"102353043202363"},

    {time:12,     event:"end_segment"},


    //Coin Boxes
    {begin_segment:"Coin Boxes"},

    {time:0,     event:"coin_y",             value:0.7},

    {time:0,     event:"coin_frequency",     value:0},

    {time:0,     event:"coin_box",           size:2},

    {time:1,     event:"coin_box",          size:4},

    {time: 6,    event:"end_segment"}, 


    //Obstacle
    {begin_segment:"Some More Obstacles"},

    {time:0,     event:"obstacle_frequency",     value:300},

    {time:0,     event:"obstacle_pattern",     value:"1023532040142"},

    {time:12,     event:"end_segment"},


   //  //Coin Sinewave
   //  {begin_segment:"A Coin Sinewave"},

   //  {time:0,     event:"coin_frequency",     value:0},

   // {time:0,     event:"coin_frequency",     value:200},

   // {time:0,     event:"coin_height",     value:0.5},

   //  {time:0,     event:"coin_sinewave",     frequency:4, amplitude:100},

   //  {time:4,    event:"end_segment"},


    //Obstacles
    {begin_segment:"Even More Obstacles"},

   {time:0,     event:"obstacle_frequency",     value:300},

   {time:0,     event:"obstacle_pattern",     value:"12300123"},

   {time:20,    event:"end_segment"},


    // The End
    {begin_segment:"END"},
    {time:5,     event:"game_finished"}
];