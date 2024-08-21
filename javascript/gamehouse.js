const mainhouseImage=new Image();
mainhouseImage.src="./img/mainhouse.png";

const oldmannpcImage=new Image();
oldmannpcImage.src="./img/people/oldman.png";

const MainHouseExit=new CarpetBoundary({
    position:{
        x:canvas.width/2-23,
        y:canvas.height-60
    }
})

const battlefield_3=new BattleField({
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    }
})

const oldmanNpc=new GameNpcs({
    position:{
        x:700,
        y:300
    },
    img:oldmannpcImage,
    str_1:"You stand before the Grim Reaper's face,",
    str_2:"Prepare yourself for the final embrace.",
    str_3:"With courage firm and heart so true,",
    str_4:"Face the end as the shadows pursue."
})

function GameHouseFunction(){
    ctx.drawImage(mainhouseImage,0,0,canvas.width,canvas.height);
    MainHouseExit.draw();
    battlefield_3.draw();
    oldmanNpc.draw();
    player.draw();
    playerdata.draw();
    let moving=true;
    player.moving=false;
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:battlefield_3})){
        GameState="battle3";
        battleparameter.start();
        keys.m.pressed.pressed=false;
    }
    if(keys.w.pressed){ 
        player.moving=true; 
        player.image=player.sprites.up;
        if(player.position.y<80){
            moving=false;
        }
        if(moving)player.position.y-=3;
    }
    else if(keys.a.pressed){
        player.moving=true;
        player.image=player.sprites.left;
        if(player.position.x<3){
            moving=false;
        }
        if(moving)player.position.x-=3;
    }
    else if(keys.s.pressed){
        player.moving=true;
        player.image=player.sprites.down;
        if(player.position.y+player.height>canvas.height-3){
            moving=false;
        }
        if(moving)player.position.y+=3;
    }
    else if(keys.d.pressed){
        player.moving=true;
        player.image=player.sprites.right;
        if(player.position.x+player.width>canvas.width-70){
            moving=false;
        }
        if(moving)player.position.x+=3;
    }
    if(keys.g.pressed&&rectangleCollision({r1:player,r2:MainHouseExit})){
        GameState="main";
        player.position.x=canvas.width/2 -24;
        player.position.y=canvas.height/2-34;
        player.image=player.sprites.down;
        keys.g.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:oldmanNpc})){
        oldmanNpc.istalk=true;
        keys.m.pressed=false;
    }
    if(keys.g.pressed&&rectangleCollision({r1:player,r2:oldmanNpc})){
        oldmanNpc.istalk=false;
        keys.g.pressed=false;
    }
}