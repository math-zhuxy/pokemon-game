const canvas = document.getElementById('gamecanvas');
const ctx=canvas.getContext('2d');

canvas.width=1024;
canvas.height=576;

const coinImage=new Image();
coinImage.src="./img/coin.png";

const medalImage=new Image();
medalImage.src="./img/medal.png";

const boxImage=new Image();
boxImage.src="./img/box.png";

const openedboxImage=new Image();
openedboxImage.src="./img/openedbox.png";

const battlefieldImage=new Image();
battlefieldImage.src="./img/battlefield.png";

const dialogboxImage=new Image();
dialogboxImage.src="./img/dialogbox.png";

const soldoutImage=new Image();
soldoutImage.src="./img/soldout.png";

const gamekeyImage=new Image();
gamekeyImage.src="./img/key.png";

const carpetImage=new Image();
carpetImage.src="./img/carpet.png";

class PlayerData{
    constructor(){
        this.money=0;
        this.Lv=1;
        this.havekey=false;
    }
    draw(){
        ctx.drawImage(coinImage,0,0,80,80);
        ctx.font="55px Arial";
        ctx.fillStyle="darkblue";
        ctx.fillText(String(this.money),80,57);
        ctx.fillText(String(this.Lv),80,120);
        ctx.drawImage(medalImage,10,70,60,60);
        if(this.havekey)ctx.drawImage(gamekeyImage,140,70,35,60);
    }
}

class BOX{
    constructor({
        position
    }){
        this.position=position;
        this.isopened=false;
        this.width=75;
        this.height=75;
    }
    draw(){
        if(this.isopened===true){
            ctx.drawImage(openedboxImage,this.position.x,this.position.y);
            return;
        }
        ctx.drawImage(boxImage,this.position.x,this.position.y);
    }
}

class BattleField{
    constructor({position}){
        this.position=position;
        this.width=88;
        this.height=84;
    }
    draw(){
        ctx.drawImage(battlefieldImage,this.position.x,this.position.y);
    }
}

class Sprite{
    constructor({
        position,
        image,
        frames={max:1},
        sprites
    }){
        this.position=position;
        this.image=image;
        this.frames={...frames,val:0,eplapsed:1};
        this.image.onload =()=>{
            this.width=this.image.width/this.frames.max;
            this.height=this.image.height;
        }
        this.moving=false;
        this.sprites=sprites;
    }
    draw(){
        ctx.drawImage(
            this.image,
            this.frames.val*this.width,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        );
        if(!this.moving){
            return;
        }
        if(this.frames.max>1){
            this.frames.eplapsed++;
        }
        if(this.frames.eplapsed%10==0){
            if(this.frames.val<this.frames.max-1){
                this.frames.val++
            }
            else this.frames.val=0;
        }
    }
}

class CarpetBoundary{
    static width=46;
    static height=46;
    constructor({position}){
        this.position=position;
        this.width=CarpetBoundary.width;
        this.height=CarpetBoundary.height;
    }
    draw(){
        ctx.drawImage(carpetImage,this.position.x,this.position.y);
    }
}

class Pokemon{
    constructor({
        position,
        image,
        hp,
        mp,//法术值
        frames={max:1},
    }){
        this.position=position;
        this.image=image;
        this.maxhp=hp;
        this.maxmp=mp;
        this.hp=hp;
        this.mp=mp;
        this.ishitted=false;
        this.frames={...frames,val:0,eplapsed:1};
    }
    draw(){
        if(this.ishitted){
            ctx.drawImage(
                this.image,
                this.image.width/this.frames.max,
                0,
                this.image.width/this.frames.max,
                this.image.height,
                this.position.x+Math.floor((Math.random()-0.5)*20),
                this.position.y,
                this.image.width/this.frames.max,
                this.image.height
            );
            return;
        }
        ctx.drawImage(
            this.image,
            this.image.width*this.frames.val/this.frames.max,
            0,
            this.image.width/this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/this.frames.max,
            this.image.height
        );
        if(this.frames.max>1){
            this.frames.eplapsed++;
        }
        if(this.frames.eplapsed%15==0){
            if(this.frames.val<this.frames.max-1){
                this.frames.val++
            }
            else this.frames.val=0;
        }
    }
}

class PlayerSkills{
    static width=75;
    static height=125;
    constructor(order,img,hurt,have){
        this.order=order;
        this.x=canvas.width-this.order*PlayerSkills.width-15*this.order;
        this.y=canvas.height-PlayerSkills.height-10;
        this.img=img;
        this.hurt=hurt;
        this.have=have;
    }
    draw(){
        if(this.have===false){
            ctx.fillStyle="red";
            ctx.fillRect(this.x,this.y,PlayerSkills.width,PlayerSkills.height);
            return;
        }
        ctx.drawImage(this.img,this.x,this.y,PlayerSkills.width,PlayerSkills.height);
    }
    drawframe(){
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 7;
        ctx.strokeRect(this.x, this.y, PlayerSkills.width, PlayerSkills.height);
    }
}

class GameBattleParameter{
    constructor(){
        this.BattleIsInited=true;
        this.BattleCurrentTurn="p";
        this.first=false;
        this.second=false;
        this.third=false;
        this.forth=false;
        this.confirm=false;
        this.BattleLastKeyBeforeComfirm=" ";
    }
    start(){
        this.BattleIsInited=false;
    }
    initkeys(){
        this.first=false;
        this.second=false;
        this.third=false;
        this.forth=false;
        this.confirm=false;
    }
    IsBattleKeys(e){
        return(
        e==='1'||
        e==='2'||
        e==='3'||
        e==='4'||
        e==='Enter'
        )    
    }
    init(){
        if(this.BattleIsInited) return;
        this.BattleIsInited=true;
        this.initkeys();
        this.BattleLastKeyBeforeComfirm=" ";
    }
}

class GameBattleAnime{
    constructor(){
        this.x=0;
        this.y=0;
        this.AnimeSate=" ";
        this.AnimeTime=0;
        this.SkillAnimeTime=0;
        this.PlayingAnime=false;
        this.isinited=false;
    }
    init(){
        this.x=0;
        this.y=0;
        this.AnimeSate=" ";
        this.AnimeTime=0;
        this.PlayingAnime=false;
        this.isinited=false;
        battleanime.SkillAnimeTime=0;
    }
}

class GameBattleText{
    constructor(){
        this.turn=" ";
        this.name=" ";
    }
    draw(){
        ctx.font="italic 48px Arial";
        ctx.fillStyle="red";
        ctx.fillText("enemy: "+this.name,50,50);
        ctx.fillText(this.turn,50,100);
    }
}

class GameNpcs{
    constructor({position,img,str_1,str_2,str_3,str_4}){
        this.position=position;
        this.image=img;
        this.istalk=false;
        this.width=50;
        this.height=60;
        this.str_1=str_1;
        this.str_2=str_2;
        this.str_3=str_3;
        this.str_4=str_4;
    }
    draw(){
        ctx.drawImage(this.image,this.position.x,this.position.y,50,60);
        if(this.istalk){
            ctx.drawImage(dialogboxImage,this.position.x-250,this.position.y-200,500,240);
            ctx.font="20px Arial";
            ctx.fillStyle="black";
            ctx.fillText(this.str_1,this.position.x-180,this.position.y-125);
            ctx.fillText(this.str_2,this.position.x-180,this.position.y-100);
            ctx.fillText(this.str_3,this.position.x-180,this.position.y-75);
            ctx.fillText(this.str_4,this.position.x-180,this.position.y-50)
        }
    }
}

class GameShopItems{
    constructor(order,img,price){
        this.order=order;
        this.image=img;
        this.width=120;
        this.height=180;
        this.position={
            x:320+(this.order%4-1)*75+(this.order%4)*this.width,
            y:150+(Math.floor(this.order/4)-1)*125+Math.floor(this.order/4)*this.height
        };
        this.isbought=false;
        this.price=price;
    }
    draw(){
        if(this.isbought){
            ctx.drawImage(soldoutImage,this.position.x,this.position.y,this.width,this.height);
            return;
        }
        ctx.fillStyle="white";
        ctx.fillRect(this.position.x,this.position.y+this.height+10,this.width,40);
        ctx.font="40px Arial";
        ctx.fillStyle="black";
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        ctx.fillText("P:"+this.price,this.position.x+20,this.position.y+this.height+45);
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }
    drawHighlight(){
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 10;
        ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
}