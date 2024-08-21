alert("Please read readme.md before playing");

const collisionMap=[];

for(let i=0;i<collisions.length;i+=70){
    collisionMap.push(collisions.slice(i,70+i));
}

const offset={
    x:-735,
    y:-650
}

const mainbackgroundImage=new Image();
mainbackgroundImage.src="./img/Pellet Town.png";

const foregroundImage=new Image();
foregroundImage.src="./img/foregroundObjects.png";

const villagernpcImage=new Image();
villagernpcImage.src="./img/people/villager.png";

const background =new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image:mainbackgroundImage
})

const villagerNPC=new GameNpcs({
    position:{
        x:1800,
        y:120
    },
    img:villagernpcImage,
    str_1:"Upon this island, seek the key,",
    str_2:"To where all beginnings lie and see.",
    str_3:"Unlock the path where it all starts,",
    str_4:"And journey forth with open hearts."
})

const foreground=new Sprite({
    position:{
        x:offset.x,
        y:offset.y
    },
    image:foregroundImage
})

const Box_1=new BOX({
    position:{
        x:1200,
        y:40
    }
});

const Box_2=new BOX({
    position:{
        x:60,
        y:200
    }
})

const MainHouseEntry=new CarpetBoundary({
    position:{
        x:canvas.width/2-23,
        y:canvas.height/2-65
    }
})

const ShopEntry=new CarpetBoundary({
    position:{
        x:1162,
        y:660
    }
})

//x 1162 y 660

const battlefield_1=new BattleField({
    position:{
        x:635,
        y:500
    }
})

const battlefield_2=new BattleField({
    position:{
        x:1650,
        y:400
    }
})

const movables=[background,foreground,Box_1,Box_2,MainHouseEntry
    ,battlefield_1,battlefield_2,villagerNPC,ShopEntry];

function rectangleCollision({r1,r2}){
    return (
        r1.position.x+r1.width>=r2.position.x&&
        r1.position.x<=r2.position.x+r2.width&&
        r1.position.y+r1.height>=r2.position.y&&
        r1.position.y<=r2.position.y+r2.height
    )
}
function PlayerCollisionCheck(x,y){
    var m=x-background.position.x;
    var n=y-background.position.y;
    var b=Math.floor(n/48);
    var a=Math.floor(m/48);
    if(collisionMap[b][a]===1025){
        return true;
    }
    return false;
}
function GameMainFunction(){
    background.draw();
    Box_1.draw();
    Box_2.draw();
    MainHouseEntry.draw();
    ShopEntry.draw();
    battlefield_1.draw();
    battlefield_2.draw();
    villagerNPC.draw();
    player.draw();
    foreground.draw();
    playerdata.draw();
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:Box_1})){
        if(Box_1.isopened===false){
            playerdata.money+=12;
            keys.m.pressed=false;
        }
        Box_1.isopened=true;
        keys.m.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:Box_2})){
        if(Box_2.isopened===false){
            playerdata.money+=8;
        }
        Box_2.isopened=true;
        keys.m.pressed=false;
    }

    if(keys.m.pressed&&playerdata.havekey&&rectangleCollision({r1:player,r2:MainHouseEntry})){
        player.position.x=canvas.width/2-24;
        player.position.y=canvas.height-80;
        player.image=player.sprites.up;
        GameState="mainhouse";
        keys.m.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:battlefield_1})){
        GameState="battle1";
        battleparameter.start();
        keys.m.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:battlefield_2})){
        GameState="battle2";
        battleparameter.start();
        keys.m.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:ShopEntry})){
        GameState="shop";
        keys.m.pressed=false;
    }
    if(keys.m.pressed&&rectangleCollision({r1:player,r2:villagerNPC})){
        villagerNPC.istalk=true;
    }
    if(keys.g.pressed&&rectangleCollision({r1:player,r2:villagerNPC})){
        villagerNPC.istalk=false;
    }

    let moving=true;
    player.moving=false;
    if(keys.w.pressed){ 
        player.moving=true; 
        player.image=player.sprites.up;
        if(PlayerCollisionCheck(player.position.x,player.position.y-3)
        ||PlayerCollisionCheck(player.position.x+player.width,player.position.y-3)){
            moving=false;
        }
        if(moving){
            movables.forEach((movable)=>{
                movable.position.y+=3;
            })    
        }
    }
    else if(keys.a.pressed){
        player.moving=true;
        player.image=player.sprites.left;
        if(PlayerCollisionCheck(player.position.x-3,player.position.y)
        ||PlayerCollisionCheck(player.position.x-3,player.position.y+player.height)
        ||PlayerCollisionCheck(player.position.x-3,player.position.y+player.height/2)){
            moving=false;
        }
        if(moving){
            movables.forEach((movable)=>{
                movable.position.x+=3;
            })   
        }
    }
    else if(keys.s.pressed){
        player.moving=true;
        player.image=player.sprites.down;
        if(PlayerCollisionCheck(player.position.x,player.position.y+player.height+3)
        ||PlayerCollisionCheck(player.position.x+player.width,player.position.y+player.height+3)){
            moving=false;
        }
        if(moving){
            movables.forEach((movable)=>{
                movable.position.y-=3;
            })
        }
    }
    else if(keys.d.pressed){
        player.moving=true;
        player.image=player.sprites.right;
        if(PlayerCollisionCheck(player.position.x+player.width+3,player.position.y)
        ||PlayerCollisionCheck(player.position.x+player.width+3,player.position.y+player.height)
        ||PlayerCollisionCheck(player.position.x+player.width+3,player.position.y+player.height/2)){
            moving=false;
        }
        if(moving){
            movables.forEach((movable)=>{
                movable.position.x-=3;
            })
        }
    }
}