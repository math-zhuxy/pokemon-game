var GameState="main";

const playerDownImage=new Image();
playerDownImage.src="./img/people/playerDown.png";

const playerUpImage=new Image();
playerUpImage.src="./img/people/playerUp.png";

const playerLeftImage=new Image();
playerLeftImage.src="./img/people/playerLeft.png";

const playerRightImage=new Image();
playerRightImage.src="./img/people/playerRight.png";

const playerdata=new PlayerData();

const player=new Sprite({
    position:{
        x:canvas.width/2-24,
        y:canvas.height/2-34,
    },
    image:playerDownImage,
    frames:{
        max:4
    },
    sprites:{
        up:playerUpImage,
        left:playerLeftImage,
        right:playerRightImage,
        down:playerDownImage
    }
})

const keys={
    w:{
        pressed:false
    },
    a:{
        pressed:false
    },
    s:{
        pressed:false
    },
    d:{
        pressed:false
    },
    m:{
        pressed:false
    },
    g:{
        pressed:false
    }
}


function animate(){
    window.requestAnimationFrame(animate);
    if(GameState==="main"){
        GameMainFunction();
    }
    if(GameState==="battle1"){
        GameBattleFunction(1);
    }
    if(GameState==="battle2"){
        GameBattleFunction(2);
    }
    if(GameState==="battle3"){
        GameBattleFunction(3);
    }
    if(GameState==="mainhouse"){
        GameHouseFunction();
    }
    if(GameState==="shop"){
        GameShopFunction();
    }
}   

animate();

window.addEventListener("keydown",(e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed=true;
            break;
        case 'a':
            keys.a.pressed=true;
            break;
        case 's':
            keys.s.pressed=true;
            break;
        case 'd':
            keys.d.pressed=true;
            break;
        case 'm':
            keys.m.pressed=true;
            break;
        case 'g':
            keys.g.pressed=true;
            break;
    }
    if(GameState==="battle1"||GameState==="battle2"||GameState==="battle3"){
        if(battleparameter.IsBattleKeys(e.key)) battleparameter.initkeys();
        switch (e.key) {
            case '1':
                battleparameter.first=true;
                battleparameter.BattleLastKeyBeforeComfirm='1';
                break;
            case '2':
                battleparameter.second=true;
                battleparameter.BattleLastKeyBeforeComfirm='2';
                break;
            case '3':
                battleparameter.third=true;
                battleparameter.BattleLastKeyBeforeComfirm='3';
                break;
            case '4':
                battleparameter.forth=true;
                battleparameter.BattleLastKeyBeforeComfirm='4';
                break;
            case 'Enter':
                battleparameter.confirm=true;
                break;
        }
    }
})

function GetInstructions(str){
    if(str==="cmd -coins"){
        playerdata.money+=100;
    }
    else if(str==="cmd -level"){
        playerdata.Lv++;
    }
    else if(str==="cmd -alive"){
        embySprite.hp=embySprite.maxhp;
    }
    else if(str==="cmd -recover"){
        embySprite.mp=embySprite.maxmp;
    }
    else if(str==="cmd -win"){
        enemySprite.hp=1;
    }
    else if(str==="cmd -skill"){
        for(var i=0;i<4;i++)playerskills[i].have=true;
    }
    else if(str==="cmd -key"){
        playerdata.havekey=true;
    }
}

window.addEventListener("keyup",(e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed=false;
            break;
        case 'a':
            keys.a.pressed=false;
            break;
        case 's':
            keys.s.pressed=false;
            break;
        case 'd':
            keys.d.pressed=false;
            break;
        case 'm':
            keys.m.pressed=false;
            break;
        case 'g':
            keys.g.pressed=false;
            break;
        case 'p':
            GetInstructions(prompt("pause"));
            break;
    }
})