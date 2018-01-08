$(document).ready(canvasApp);

function canvasApp() {

    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');

    var loop = setInterval(isLoading, 60);
    var fps = 20;
    var xr;
    var yr;
    var hr;
    var wr;
    var xg;
    var yg;
    var rg;
    var xc;
    var yc;
    var rc;
    var key;
    var load = 0;
    var total = 9;
    var gameover;
    var theme;
    var dead;
    var portal;
    var score = 0;
    var img_mario = new Image();
    var csx_mario = 0;
    var csy_mario = 0;
    var img_gold = new Image();
    var csx_gold = 0;
    var csy_gold = 0;
    
    var img_ene1 = new Image();
    var csx_ene1 = 0;
    var csy_ene1 = 0;
    var y_ene1 = 0;
    var x_ene1 = 0;
    
    
    //ene2
    var img_ene2 = new Image();
    var csx_ene2 = 0;
    var csy_ene2 = 0;
    var x_ene2 = 0;
    var y_ene2 = 0;
    var r_ene2;
    
    //ene3
    var img_ene3 = new Image();
    var csx_ene3 = 0;
    var csy_ene3 = 0;
    var x_ene3 = 0;
    var y_ene3 = 0;
    var r_ene3;
    
    //ene3
    var img_ene4 = new Image();
    var csx_ene4 = 0;
    var csy_ene4 = 0;
    var x_ene4 = 0;
    var y_ene4 = 0;
    var r_ene4;
    
    var img_arbusto = new Image();
    var csx_arbusto = 0;
    var csy_arbusto = 0;
    var img_portal = new Image();
    var csx_portal = 0;
    var csy_portal = 0;
    var state_mario = 'stop';
    
    var img_fundo = new Image();
    
    
    var dif;
    var velo;

    loadAssets();
    controles();

    function isLoading() {
        if (load >= total) {
            clearInterval(loop);
            start();
        }
        context.fillStyle = 'yellowgreen';
        context.strokeStyle = 'skyblue';
        context.fillRect(50, 25, 200 * (load / total), 25);
        context.strokeRect(50, 25, 200, 25);
    }


    function start() {
        gameover = false;
        drawScreen();
        
           dif = 0;   
           velo = 5;
        
        xr = canvas.width/2;
        yr = canvas.height/2;
        hr = 50;
        wr = hr;
        xg = Math.random() * canvas.width;
        yg = Math.random() * canvas.height;
        rg = 25;
        xc = Math.random() * canvas.width;
        yc = 0;
        rc = 25;
        yarbusto = Math.random() * canvas.width;
        xarbusto = Math.random() * canvas.height;
        ypedra = Math.random() * canvas.width-30;
        xpedra = Math.random() * canvas.height-30;
        score = 0;
        
        //kmm
        x_ene2 = canvas.width + 15;
        y_ene2 = Math.random() * canvas.height;
        r_ene2= 25;
        //kmm
        x_ene4 = Math.random() * canvas.width;
        y_ene4 = canvas.height - 5;
        r_ene4= 25;
        //kmm
        x_ene3 = -5;
        y_ene3 = Math.random() * canvas.height;
        r_ene3= 15;



        //loop
        if (typeof theme.loop === 'boolean') {
            theme.loop = true;
        } else {
            theme.addEventListener('ended', function () {
                this.currentTime = 0;
            }, false);
        }
        theme.play();
    }

    function drawScreen() {
        setTimeout(function () {
            

//            //background
//            context.fillStyle = "#fff";
//            context.fillRect(0, 0, canvas.width, canvas.height);
            desenhaFundo();
            desenhaAleatorio();
            desenhaPedra();
            moveRetangulo();
            moveCirculo();
            move_ene2();    
            move_ene3();    
            move_ene4();    

            if (colide(xr, yr, wr, hr, xc, yc, rc)) {
                theme.pause();
                theme.currentTime = 0;
                dead.play();
                gameover = true;
            }
            if (colide(xr, yr, wr, hr, x_ene2, y_ene2, r_ene2)) {
                theme.pause();
                theme.currentTime = 0;
                dead.play();
                gameover = true;
            }
            if (colide(xr, yr, wr, hr, x_ene3, y_ene3, r_ene3)) {
                theme.pause();
                theme.currentTime = 0;
                dead.play();
                gameover = true;
            }
            if (colide(xr, yr, wr, hr, x_ene4, y_ene4, r_ene4)) {
                theme.pause();
                theme.currentTime = 0;
                dead.play();
                gameover = true;
            }

            if (colide(xr, yr, wr, hr, xg, yg, rg)) {
                score++;
                dif++;
                portal.play();
                dif++;
                xg = rg + (Math.random() * canvas.width - rg);
                yg = rg + (Math.random() * canvas.height - rg);
            }
            
        //aumentar velocidade dos inimigos
                     
        if(dif > 11 && velo < 30){
           dif = 0;
           velo += 5;
        }

            //desenhaRetangulo();
            desenhaMario();
            
            desenha_ene2();
            desenha_ene3();
            desenha_ene4();
            
            desenhaCirculo();

//            drawnGold();
            drawnPortal();

            drawnHud();
            
//            drawnGold();

            //box
            context.strokeStyle = "#000";
            context.strokeRect(0, 0, canvas.width, canvas.height);

            if (!gameover) {
                window.requestAnimationFrame(drawScreen);
            }
        }, 1000 / fps);
    }

    function moveRetangulo() {
        if (key == 38) {
            state_mario = 'up';
            if (yr <= 0) {
                yr = 0;
            } else {
                yr -= 10;//UP
            }
        } else if (key == 40) {
            state_mario = 'down';
            //console.log(yr);
            //console.log(canvas.height - hr);
            if (yr >= canvas.height - hr) {
                yr = canvas.height - hr;
            } else {
                yr += 10;
            }//DOWN
        } else if (key == 39) {
            xr += 10;//RIGHT
            state_mario = 'right';
        } else if (key == 37) {
            xr -= 10;//LEFT
            state_mario = 'left';
        }


    }

    function moveCirculo() {

        yc += velo;
        if (yc > canvas.height) {
            yc = 0;
            xc = Math.random() * canvas.width;
        }

    }
    function move_ene2() {

        x_ene2 -= velo;
        if (x_ene2 <= 0) {
            x_ene2 = canvas.width + 5;
            y_ene2 = Math.random() * canvas.height;
        }

    }
    function move_ene3() {

        x_ene3 += velo;
        if (x_ene3 > canvas.width) {
            x_ene3 = 0;
            y_ene3 = Math.random() * canvas.height;
        }

    }
    function move_ene4() {

        y_ene4 -= velo;
        if (y_ene4 <= 0) {
            y_ene4 = canvas.height + 5;
            y_ene4 = Math.random() * canvas.width;
        }

    }
    
    function desenhaFundo(){
        var pattern = context.createPattern(img_fundo, 'repeat');
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
        
    }
    function drawnHud() {
        context.shadowColor = "#000";
        context.shadowOffsetX = 0; 
        context.shadowOffsetY = 0; 
        context.shadowBlur = 3;
        context.font = "38px 'fontee2'";
        context.textBaseline = 'alphabetic';
        context.scale(1,1);
        context.fillStyle = "#84e7ed";
        context.baseLine = "top";

        if (gameover) {
            context.fillText("Aperte ENTER para REINICIAR Pontos: " + score, canvas.width / 8, canvas.height - 10);
        } else {
            context.fillText("Pontos: " + score, canvas.width / 2, canvas.height - 10);
        }
        context.shadowColor = "transparent";
    }

    function desenhaRetangulo() {
        //Retangulo
        context.fillStyle = "#00f";
        context.fillRect(xr, yr, wr, hr);
    }
    
    
    function desenhaAleatorio(){
        context.drawImage(img_arbusto,csx_arbusto,csy_arbusto,64,64,xarbusto-2,yarbusto-2,30,30);
        
    }
    function desenhaPedra(){
        context.drawImage(img_arbusto,csx_arbusto,csy_arbusto,64,64,xpedra-2,ypedra-2,30,30);
        
    }
    
    function desenhaMario(){
        if(state_mario == 'down'){
            csy_mario = 1;
        }else if(state_mario=='up'){
             csy_mario = 163*2;
        }else if(state_mario=='right'){
             csy_mario = 163*3;
        }else if(state_mario=='left'){
             csy_mario = 163*1;
        }else{
            csy_mario=1;
            csx_mario =2;
        }        
        context.drawImage(img_mario,127*csx_mario,csy_mario,127,163,xr+5,yr-9,50,60);
        csx_mario++;
        if(csx_mario>3)
            csx_mario = 0;
    }

    function desenhaCirculo() {
        //Circulo or enemis
//        context.beginPath();
//        context.strokeStyle = '#000';
//        context.lineWidth = 2;
//        context.arc(
//                xc,
//                yc,
//                rc,
//                (Math.PI / 180) * 0,
//                (Math.PI / 180) * 360,
//                false
//                );
//        context.fillStyle = "#f00";
//        context.fill();
//        context.stroke();
//        context.closePath();

        context.drawImage(img_ene1,82*csx_ene1,csy_ene1,82,124,xc-19,yc-25,40,60);
        csx_ene1++;
        if(csx_ene1>1)
            csx_ene1 = 0;

    }
    
    function desenha_ene2() {
        //enemigo2
        
        context.drawImage(img_ene2,125*csx_ene2,csy_ene2,125,125,x_ene2-19,y_ene2-25,50,70);
        csx_ene2++;
        if(csx_ene2>3)
            csx_ene2 = 0;
    }
    function desenha_ene3() {
        //enemigo2
        
        context.drawImage(img_ene3,125*csx_ene3,csy_ene3,125,125,x_ene3-19,y_ene3-25,40,60);
        csx_ene3++;
        if(csx_ene3>3)
            csx_ene3 = 0;
    }
    function desenha_ene4() {
        //enemigo2
        
        context.drawImage(img_ene4,125*csx_ene4,csy_ene4,125,125,x_ene4-19,y_ene4-25,40,60);
        csx_ene4++;
        if(csx_ene4>3)
            csx_ene4 = 0;
    }

    function colide(x, y, w, h, cx, cy, cr) {
        x = x - cr;
        y = y - cr;
        w = w + cr * 2;
        h = h + cr * 2;
        if ((cx >= x && cx <= x + w) &&
                (cy >= y && cy <= y + h)
                ) {
            return true;
        } else {
            return false;
        }
    }
    
    function drawnGold() {
//        context.beginPath();
//        context.strokeStyle = '#000';
//        context.lineWidth = 2;
//        context.arc(
//                xg,
//                yg,
//                rg,
//                (Math.PI / 180) * 0,
//                (Math.PI / 180) * 360,
//                false
//                );
//        context.fillStyle = "#ff0";
//        context.fill();
//        context.stroke();
//        context.closePath();
        
        
        context.drawImage(img_gold,12*csx_gold,csy_gold,12,16,xg+5,yg,20,20);
        csx_gold++;
        if(csx_gold>3)
            csx_gold = 0;
    }
    
    
    function drawnPortal() {
        
        var gradiente =
        context.createRadialGradient(
                    xg+22,
                    yg+22,
                    rg,
                    xg+22,
                    yg+22,
                    15
                    );
        gradiente.addColorStop(0,"rgba(68,255,30, 0.0)");
        //gradiente.addColorStop(.2,"#fff");
//        gradiente.addColorStop(.1,"#000");
        gradiente.addColorStop(.7,"rgba(30,255,232, 1)");
        gradiente.addColorStop(1,"rgba(68,255,30, 0.5)");
//        gradiente.addColorStop(1,"rgba(000,000,0, 0.5)");
      context.fillStyle = gradiente;
        context.fillRect(xg, yg, 50, 50);
context.drawImage(img_portal,100*csx_portal,csy_portal,100,500,xg+1,yg+1,40,200);

//        context.drawImage(img_portal,100*csx_portal,csy_portal,100,500,xg-10,yg-10,40,200);
        csx_portal++;
        if(csx_portal>4)
            csx_portal = 0;
    }
    
//    function drawnEnemi2() {
//        context.drawImage(img_ene2,125*csx_ene2,csy_ene2,100,500,xg-10,yg-10,40,200);
//        csx_ene2++;
//        if(csx_ene2>3)
//            csx_ene2 = 0;
//    }

    

    function loadAssets() {
        img_mario.src = "img/rick2.png";
        img_gold.src = "img/gold.png";
        img_fundo.src = "img/grama2.png";
        img_ene1.src = "img/bixo.png";
        img_ene2.src = "img/pico.png";
        img_ene3.src = "img/bixo2.png";
        img_ene4.src = "img/fantasma.png";
        img_arbusto.src = "img/pedraa.png";
        img_portal.src = "img/portal.png";
        
        img_mario.onload = function () {
            load++;
        };
        img_gold.onload = function () {
            load++;
        };
        img_fundo.onload = function () {
            load++;
        };
        img_ene1.onload = function () {
            load++;
        };
        img_arbusto.onload = function () {
            load++;
        };
        img_portal.onload = function () {
            load++;
        };

        portal = new Audio('sounds/haha.mp3');
        portal.load();
        portal.volume = 0.5;
        portal.addEventListener('canplaythrough', function () {
            load++;
        }, false);
        
        dead = new Audio('sounds/wubba.mp3');
        dead.load();
        dead.volume = 0.5;
        dead.addEventListener('canplaythrough', function () {
            load++;
        }, false);


        theme = new Audio('sounds/kkkk.mp3');        
        theme.load();
        theme.volume = 0.1;
        theme.addEventListener('canplaythrough', function () {
            load++;
        }, false);
    }

    function controles() {

        $(document).keydown(function (e) {
            key = e.which;
            //console.log(key);
            if (key === 13 && gameover)
                start();
            
        });

        $(document).keyup(function (e) {
            key = null;
            state_mario = 'stop';
        });

    }
}