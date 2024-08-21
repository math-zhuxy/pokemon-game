const shopbackgroundImage=new Image();
shopbackgroundImage.src="./img/shop/shop.jpg";

const shopcursorImage=new Image();
shopcursorImage.src="./img/shop/cursor.png";

const livegemImage=new Image();
livegemImage.src="./img/shop/livegem.jpg";

const increasehurtImage=new Image();
increasehurtImage.src="./img/shop/increasehurt.png";

const magicgemImage=new Image();
magicgemImage.src="./img/shop/magicgem.jpg";

const ShopGoods=[];

ShopGoods.push(new GameShopItems(0,recoverycardImage,30));
ShopGoods.push(new GameShopItems(1,lightningcardImage,35));
ShopGoods.push(new GameShopItems(2,windcardImage,40));
ShopGoods.push(new GameShopItems(3,gamekeyImage,50));
ShopGoods.push(new GameShopItems(4,livegemImage,40));
ShopGoods.push(new GameShopItems(5,increasehurtImage,40));
ShopGoods.push(new GameShopItems(6,magicgemImage,30));

const ShopCursor={
    position:{
        x:canvas.width/2,
        y:canvas.height/2
    },
    width:5,
    height:5
}

function GameShopFunction(){
    if(keys.g.pressed)GameState="main";
    ctx.drawImage(shopbackgroundImage,0,0,canvas.width,canvas.height);
    ShopGoods.forEach((s)=>{s.draw()});
    for(var i=0;i<ShopGoods.length;i++){
        if(rectangleCollision({r1:ShopCursor,r2:ShopGoods[i]})){
            if(keys.m.pressed&&ShopGoods[i].isbought===false&&playerdata.money>=ShopGoods[i].price){
                console.log("buy!");
                keys.m.pressed=false;
                if(i<=3) ShopGoods[i].isbought=true;
                playerdata.money-=ShopGoods[i].price;
                if(i===0)playerskills[3].have=true;
                else if(i===1)playerskills[1].have=true;
                else if(i===2)playerskills[0].have=true;
                else if(i===3)playerdata.havekey=true;
                else if(i===4)embySprite.maxhp+=0.2*embySprite.maxhp;
                else if(i===5)for(var j=0;j<4;j++)playerskills[j].hurt+=0.2;
                else if(i===6)embySprite.maxmp+=0.2*embySprite.maxmp;
            }
            ShopGoods[i].drawHighlight();
            break;
        }
    }
    playerdata.draw();
    ctx.drawImage(shopcursorImage,ShopCursor.position.x,ShopCursor.position.y,49,59);
    if(keys.w.pressed&&ShopCursor.position.y>3)ShopCursor.position.y-=3;
    if(keys.s.pressed&&ShopCursor.position.y+62<canvas.height)ShopCursor.position.y+=3;
    if(keys.a.pressed&&ShopCursor.position.x>3)ShopCursor.position.x-=3;
    if(keys.d.pressed&&ShopCursor.position.x+52<canvas.width)ShopCursor.position.x+=3;
}