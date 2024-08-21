const draggleSpriteImage=new Image();
draggleSpriteImage.src="./img/draggleSprite.png";

const deathSpriteImage=new Image();
deathSpriteImage.src="./img/deathSprite.png";

const embySpriteImage=new Image();
embySpriteImage.src="./img/embySprite.png";

const lightningcardImage=new Image();
lightningcardImage.src="./img/card/lightcard.jpg";

const recoverycardImage=new Image();
recoverycardImage.src="./img/card/recoverycard.jpg";

const fireballcardImage=new Image();
fireballcardImage.src="./img/card/fireballcard.jpg";

const windcardImage=new Image();
windcardImage.src="./img/card/windcard.jpg";

const battleImage=new Image();
battleImage.src="./img/battleBackground.png";

const recoveryImage=new Image();
recoveryImage.src="./img/skill/recovery.png";

const fireballImage=new Image();
fireballImage.src="./img/skill/fireball.png";

const lightningImage=new Image();
lightningImage.src="./img/skill/lightning.png";

const windImage=new Image();
windImage.src="./img/skill/wind.png";

const enattackImage=new Image();
enattackImage.src="./img/skill/enattack.png";

const fireattackImage=new Image();
fireattackImage.src="./img/skill/fireattack.png";

const lightattackImage=new Image();
lightattackImage.src="./img/skill/lightattack.png";


const battleground=new Sprite({
    position:{
        x:0,
        y:0
    },
    image:battleImage
})

const enemySprite=new Pokemon({
    position:{
        x:800,
        y:100
    },
    image:draggleSpriteImage,
    hp:300,
    mp:300,
    frames:{
        max:4
    }
})

const embySprite=new Pokemon({
    position:{
        x:280,
        y:330
    },
    image:embySpriteImage,
    hp:200,
    mp:300,
    frames:{
        max:4
    }
})

const playerskills=[];
playerskills.push(new PlayerSkills(1,windcardImage,1.8,false));//0
playerskills.push(new PlayerSkills(2,lightningcardImage,2,false));//1
playerskills.push(new PlayerSkills(3,fireballcardImage,0.8,true));//2
playerskills.push(new PlayerSkills(4,recoverycardImage,1.2,false));//3

const battletext=new GameBattleText();

const battleparameter=new GameBattleParameter();

battletext.name="draggle";

var BattleEnemyLevel=1;

function DrawHighLight(){
    if(battleparameter.first){
        playerskills[3].drawframe();
        return;
    }
    if(battleparameter.second){
        playerskills[2].drawframe();
        return;
    }
    if(battleparameter.third){
        playerskills[1].drawframe();
        return;
    }
    if(battleparameter.forth){
        playerskills[0].drawframe();
        return;
    }
}

const battleanime=new GameBattleAnime();

function ReleaseSkills(){
    if(battleparameter.BattleLastKeyBeforeComfirm==='1'){
        if(playerskills[3].have===false)return;
        if(embySprite.mp<=20)return;
        if(embySprite.hp+10<=embySprite.maxhp){    
            embySprite.hp+=10;
        }
        embySprite.mp-=20;
        battleanime.AnimeSate="myrecover";
    }
    if(battleparameter.BattleLastKeyBeforeComfirm==='2'){
        battleanime.AnimeSate="myfireball";
    }
    if(battleparameter.BattleLastKeyBeforeComfirm==='3'){
        if(playerskills[1].have===false)return;
        battleanime.AnimeSate="mylight";
    }
    if(battleparameter.BattleLastKeyBeforeComfirm==='4'){
        if(playerskills[0].have===false)return;
        battleanime.AnimeSate="mywind";
    }
    battleanime.PlayingAnime=true;
    battleanime.SkillAnimeTime=0;
}

function DrawSkillHurt(hurt){
    ctx.font="30px Arial";
    ctx.fillStyle="black";
    if(BattleEnemyLevel===3){
        ctx.fillText(String(hurt),880,80-battleanime.AnimeTime%10*3);
        return;
    }
    ctx.fillText(String(hurt),800,100-battleanime.AnimeTime%10*3);
}

function DrawSkillAnime(img,maxframe){
    var val=Math.floor(battleanime.AnimeTime/4)%4;
    ctx.drawImage(
        img,
        val*img.width/maxframe,
        0,
        img.width/maxframe,
        img.height,
        battleanime.x,
        battleanime.y,
        img.width/maxframe,
        img.height
    );
}

function DrawBigSkillAnime(img,xsize,ysize,maxnum){
    if(battleanime.AnimeTime%3===0)battleanime.SkillAnimeTime++;
    if(battleanime.SkillAnimeTime===maxnum)battleanime.SkillAnimeTime=0;
    var val=battleanime.SkillAnimeTime;
    var i=(val%xsize);
    var j=(Math.floor(val/xsize));
    ctx.drawImage(
        img,
        i*img.width/xsize,
        j*img.height/ysize,
        img.width/xsize,
        img.height/ysize,
        battleanime.x,
        battleanime.y,
        img.width/xsize,
        img.height/ysize
    )
}

function MySkillsAnime(){
    if(battleparameter.BattleCurrentTurn==="e"){
        return;
    }
    if(battleanime.AnimeSate==="myrecover"){
        if(!battleanime.isinited){
            battleanime.x=embySprite.position.x-50;
            battleanime.y=embySprite.position.y-40;
            battleanime.isinited=true;
        }      
        DrawBigSkillAnime(recoveryImage,5,6,30);
        embySprite.hp+=playerskills[3].hurt;
        if(embySprite.hp>embySprite.maxhp)embySprite.hp=embySprite.maxhp;
        ctx.font="30px Arial";
        ctx.fillStyle="black";
        ctx.fillText("+"+playerskills[3].hurt,250,300-battleanime.AnimeTime%10*3);
        
        
    }
    else if(battleanime.AnimeSate==="myfireball"){
        if(!battleanime.isinited){
            battleanime.x=embySprite.position.x+100;
            battleanime.y=embySprite.position.y-60;
            battleanime.isinited=true;
        }
        if(battleanime.AnimeTime<=50){
            DrawSkillAnime(fireballImage,6);
            battleanime.x+=6;
            battleanime.y-=3;
        }
        if(battleanime.AnimeTime>=50){
            enemySprite.hp-=playerskills[2].hurt;
            DrawSkillHurt(playerskills[2].hurt);
            enemySprite.ishitted=true;
        }
    }
    else if(battleanime.AnimeSate==="mylight"){
        if(!battleanime.isinited){
            battleanime.x=740;
            battleanime.y=20;
            battleanime.isinited=true;
        }
        if(battleanime.AnimeTime<=60){
            enemySprite.hp-=playerskills[1].hurt;
            DrawSkillHurt(playerskills[1].hurt);
            embySprite.mp--;
            if(embySprite.mp<=0)battleanime.AnimeTime=75;
            DrawBigSkillAnime(lightningImage,5,3,15);
        }
        enemySprite.ishitted=true;
    }
    else if(battleanime.AnimeSate==="mywind"){
        if(!battleanime.isinited){
            battleanime.x=750;
            battleanime.y=75;
            battleanime.isinited=true;
        }
        enemySprite.hp-=playerskills[0].hurt;
        DrawSkillHurt(playerskills[0].hurt);
        embySprite.mp-=1;
        if(embySprite.mp<=0)battleanime.AnimeTime=75;
        DrawBigSkillAnime(windImage,5,5,23);
        enemySprite.ishitted=true;
    }
    battleanime.AnimeTime++;
    if(battleanime.AnimeTime>=85){
        battleanime.init();
        enemySprite.ishitted=false;
        embySprite.ishitted=false;
        battleparameter.BattleCurrentTurn="e";
    }
}

function DrawHisSkills(img,x,y,max,hurt,starttime){
    if(!battleanime.isinited){
        battleanime.x=embySprite.position.x-40;
        battleanime.y=embySprite.position.y-55;
        battleanime.isinited=true;
    }
    if(battleanime.AnimeTime>=starttime){
        DrawBigSkillAnime(img,x,y,max);
        embySprite.ishitted=true;
        embySprite.hp-=hurt*BattleEnemyLevel;
    }
}

function HisSkillsAnime(){
    if(battleparameter.BattleCurrentTurn==="p"){
        return;
    }
    if(battleanime.AnimeSate==="fireattack"){
        DrawHisSkills(fireattackImage,5,3,11,0.2,30);
    }
    if(battleanime.AnimeSate==="lightattack"){
        DrawHisSkills(lightattackImage,5,3,11,0.3,30);
    }
    if(battleanime.AnimeSate==="emhit"){
       DrawHisSkills(enattackImage,5,5,23,0.4,50);
    }
    battleanime.AnimeTime++;
    if(battleanime.AnimeTime>=120){
        battleanime.init();
        enemySprite.ishitted=false;
        embySprite.ishitted=false;
        battleparameter.BattleCurrentTurn="p";
    }
}

function DrawMyAndHisHp(){
    if(embySprite.mp<0||embySprite.hp<0||
        enemySprite.mp<0||enemySprite.hp<0){
        return;
    }
    ctx.font="20px Arial";
    ctx.fillStyle="red";
    ctx.fillText("HP:"+Math.floor(embySprite.hp),10,480);
    ctx.fillText("His Hp:"+Math.floor(enemySprite.hp),10,150);
    ctx.fillStyle="black";
    ctx.fillRect(30,490,300,20);
    ctx.fillRect(30,550,300,20);
    ctx.fillRect(30,160,300,20);
    ctx.fillStyle="red";
    var x=Math.floor(embySprite.hp*300/embySprite.maxhp);
    var y=Math.floor(enemySprite.hp*300/enemySprite.maxhp);
    ctx.fillRect(30,490,x,20);
    ctx.fillRect(30,160,y,20);
    ctx.fillStyle="blue";
    ctx.fillText("MP:"+Math.floor(embySprite.mp),10,540);
    var z=Math.floor(embySprite.mp*300/embySprite.maxmp);
    ctx.fillRect(30,550,z,20);
}

function GameBattleFunction(enemylv){
    if(!battleparameter.BattleIsInited){
        BattleEnemyLevel=enemylv;
        enemySprite.maxhp=250*BattleEnemyLevel;
        if(BattleEnemyLevel===3)enemySprite.maxhp=1000;
        embySprite.hp=embySprite.maxhp;
        embySprite.mp=embySprite.maxmp;
        enemySprite.hp=enemySprite.maxhp;
        enemySprite.mp=enemySprite.maxmp;
        battleanime.init();
        enemySprite.ishitted=false;
        embySprite.ishitted=false;
        battleparameter.BattleCurrentTurn="p";
        battleparameter.init();
        if(BattleEnemyLevel===1||BattleEnemyLevel===2){
            enemySprite.image=draggleSpriteImage;
            enemySprite.frames.max=4;
            enemySprite.position.x=800;
            enemySprite.position.y=100;
        }
        if(BattleEnemyLevel===3){
            enemySprite.image=deathSpriteImage;
            enemySprite.frames.max=8;
            enemySprite.position.x=520;
            enemySprite.position.y=0;
        }
    }
    if(embySprite.hp<=0){
        console.log("lose");
        if(enemySprite.hp<enemySprite.maxhp/2){
            playerdata.money+=5*BattleEnemyLevel;
        }
        player.position.x=canvas.width/2-24;
        player.position.y=canvas.height/2-34;
        player.image=player.sprites.down;
        GameState="main";
    }
    if(enemySprite.hp<=0){
        console.log("win");
        playerdata.money+=10*BattleEnemyLevel;
        if(enemylv===3)playerdata.Lv++;
        player.position.x=canvas.width/2-24;
        player.position.y=canvas.height/2-34;
        player.image=player.sprites.down;
        GameState="main";
    }
    if(embySprite.mp<=0)embySprite.mp=0;
    if(enemySprite.mp<=0)enemySprite.mp=0;
    battleground.draw();
    battletext.draw();
    enemySprite.draw();
    embySprite.draw();
    DrawMyAndHisHp();
    playerskills.forEach(s=>{
        s.draw();
    })
    if(keys.g.pressed){
        console.log("quit");
        GameState="main";
        keys.g.pressed=false;
        player.position.x=canvas.width/2-24;
        player.position.y=canvas.height/2-34;
        player.image=player.sprites.down;
    }
    if(battleanime.PlayingAnime===true){
        MySkillsAnime();
        HisSkillsAnime();
        return;
    }
    if(battleparameter.BattleCurrentTurn==="e"){
        battletext.turn="his turn";
        battleanime.PlayingAnime=true;
        battleanime.SkillAnimeTime=0;
        if(BattleEnemyLevel===1){
            battleanime.AnimeSate="fireattack";
            return;
        }
        var p=0;
        if(BattleEnemyLevel===2){
            p=Math.floor(Math.random()*2);
        }
        if(BattleEnemyLevel===3){
            p=Math.floor(Math.random()*4);
        }
        if(p===0){
            battleanime.AnimeSate="fireattack";
        }
        else if(p===1){
            battleanime.AnimeSate="lightattack";
        }
        else if(p===2||p===3){
            battleanime.AnimeSate="emhit";
        }
    }
    if(battleparameter.BattleCurrentTurn==="p"){
        battletext.turn="my turn";
        DrawHighLight();
        if(battleparameter.confirm){
            if(battleparameter.BattleLastKeyBeforeComfirm===" "){
                console.log("input your skills");
                battleparameter.confirm=false;
                return;
            }
            battleparameter.initkeys();
            ReleaseSkills();
            battleparameter.BattleLastKeyBeforeComfirm=" ";
        }
    }
}