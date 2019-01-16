var myCanvas = document.getElementById('myCanvas'); 
var myC = myCanvas.getContext('2d');
function drawItem(obj)
{   
    if (obj.type == "text") {
      myC.font = obj.w + " " + obj.h;
      myC.fillStyle = obj.color;
      myC.fillText(obj.text, obj.x, obj.y);
    }
    else if(obj.type=="image")
        {
        obj.image = new Image();
        obj.image.src = obj.color;
        myC.drawImage(obj.image, 
        obj.x, 
        obj.y,
        obj.w, obj.h);
        }
    else if(obj.type=="other")
        {
    myC.strokeStyle = obj.stroke; 
    myC.fillStyle = obj.fill; 
    myC.lineWidth = obj.lw; 
    myC.fillRect(obj.x, obj.y, obj.w, obj.h); 
    myC.strokeRect(obj.x, obj.y, obj.w, obj.h); 
        }

    
}
var score=
{
    "type": "text",
    "text": "",
    "color": "blue",
    "num": -2,
    "w": "30px",
    "h": "Consolas", 
    "x":myCanvas.width-250, 
    "y":20 

}
var bird = 
{
    "type":"image",
    "lw": 1, 
    "stroke":"#000000", 
    "fill":"#ffff00", 
    "color": "images/transparent1.png",
    "w":75, 
    "h":75, 
    "x":0, 
    "y":100 ,
    "count":0
};
var gameLogicInterval = setInterval(animateplayer, 100);
var gameLogicInterval = setInterval(animatePU, 50);
var gameLogicInterval = setInterval(animateCoin, 50);
var count= 1;
var PUcount= 1;
var Coincount=1;
function animateplayer()
{
    if(gravity<0||bird.x>myCanvas.width-(bird.w+10))
        {
    bird.color="images/fliptransparent"+count+".png"
        if (count==9)
            {
                count =0;
            }
        count++;
        }
    else
        {
    bird.color="images/transparent"+count+".png"
        if (count==9)
            {
                count =0;
            }
        count++;
        }
}
    function animatePU()
{
    pointPU.color="images/Untitled-"+PUcount+".png"
    if(pointPU.direction=="right"||PUcount==1){PUcount++;
    if(PUcount==20)
    {
        pointPU.direction="left";
    }}
    else if(pointPU.direction=="left")
        {
        PUcount=PUcount-1;
        if(PUcount==1)
    {
        pointPU.direction="right";
    }
        }
    }
function animateCoin()
{
    CoinPU.color="images/coin"+Coincount +".png"
    if(CoinPU.direction=="right"||Coincount==1){Coincount++;
    if(Coincount==4)
    {
        CoinPU.direction="left";
    }}
    else if(CoinPU.direction=="left")
        {
        Coincount=Coincount-1;
        if(Coincount==1)
    {
        CoinPU.direction="right";
    }
        }
    }
var gravity = 0;

window.requestAnimationFrame(gameLoop); 
function gameLoop()
{ 
    myC.clearRect(0, 0, myCanvas.width, myCanvas.height); 
    bird.x+=(gravity);
    if(bird.x<10 && gravity==-10)
        {
            gravity=0;
        }
    if(bird.x>myCanvas.width-(bird.w+10) && gravity==10)
        {
            gravity=0;
        }
    drawItem(Background);
    drawItem(bird);
    drawItem(pipeBottom);
    drawItem(pipeTop);
    drawItem(pipeMid);
    drawItem(pipeMove);
    drawItem(score);
    drawItem(pointPU);
    drawItem(CoinPU);

    Background.y-=pipeSpeed;
    Background.count=Background.count+pipeSpeed;
    console.info()
     if(Background.count>900)
        {
            Background.y=0;
            Background.count=0;
        }
    console.info(Background.count);
    pipeTop.y -= pipeSpeed; 
    pipeBottom.y -= pipeSpeed;
    pipeMid.y-= pipeSpeed;
    pipeMove.y-=pipeSpeed;
    pointPU.y-=pipeSpeed;
    CoinPU.y-=pipeSpeed;
    if(gameEnd())
    { 
        console.info('Game Over');
    }
    else
    {
        window.requestAnimationFrame(gameLoop); 
    } 

 }
var boost = 0;
document.addEventListener('keydown', function(ev)
{
     console.info(ev.keyCode);
     if(bird.x<10)
        {
            gravity=10;
        }
        if(bird.x>myCanvas.width-(bird.w+10))
        {
            gravity=-10;
        }
});        
document.addEventListener('keyup', function(ev)
    { 
        boost = 0; 
    });
    function gameEnd()
    { 
        var over = false; 
        if(((bird.x + bird.w) > pipeTop.x && bird.x < pipeTop.x+pipeTop.w) && ((bird.y+bird.h) > pipeTop.y)&&bird.y < pipeTop.y+pipeTop.h){ //console.info('Hit Top'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeBottom.x && bird.x < pipeBottom.x+pipeBottom.w) && ((bird.y+bird.h) > pipeBottom.y)&&bird.y < pipeBottom.y+pipeBottom.h){ //console.info('Hit Bottom'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeMid.x && bird.x < pipeMid.x+pipeMid.w) && ((bird.y+bird.h) > pipeMid.y)&&bird.y < pipeMid.y+pipeMid.h){ //console.info('Hit middle'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeMove.x && bird.x < pipeMove.x+pipeMove.w) && ((bird.y+bird.h) > pipeMove.y)&&bird.y < pipeMove.y+pipeMove.h){ //console.info('Hit moving'); 
        over = true; }
        if((bird.y + bird.h) > myCanvas.height || bird.y < 0)
            { 
                //console.info('Hit Frame'); 
                over = true; 
            } 
                return over; 
    }
document.addEventListener('touchstart', function() 
  // the user touched the screen!

{
     if(bird.x<10)
        {
            gravity=10;
        }
        if(bird.x>myCanvas.width-(bird.w+10))
        {
            gravity=-10;
        }
});        
document.addEventListener('touchend', function()
    { 
        boost = 0; 
    });
    function gameEnd()
    { 
        var over = false; 
        if(((bird.x + bird.w) > pipeTop.x && bird.x < pipeTop.x+pipeTop.w) && ((bird.y+bird.h) > pipeTop.y)&&bird.y < pipeTop.y+pipeTop.h){ //console.info('Hit Top'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeBottom.x && bird.x < pipeBottom.x+pipeBottom.w) && ((bird.y+bird.h) > pipeBottom.y)&&bird.y < pipeBottom.y+pipeBottom.h){ //console.info('Hit Bottom'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeMid.x && bird.x < pipeMid.x+pipeMid.w) && ((bird.y+bird.h) > pipeMid.y)&&bird.y < pipeMid.y+pipeMid.h){ //console.info('Hit middle'); 
        over = true; } 
        if(((bird.x + bird.w) > pipeMove.x && bird.x < pipeMove.x+pipeMove.w) && ((bird.y+bird.h) > pipeMove.y)&&bird.y < pipeMove.y+pipeMove.h){ //console.info('Hit moving'); 
        over = true; }
        if((bird.y + bird.h) > myCanvas.height || bird.y < 0)
            { 
                //console.info('Hit Frame'); 
                over = true; 
            } 
                return over; 
    }
var CoinPU= {
"type":"image",
"lw": 1,
"color":"",
"stroke":"#000000",
"fill":"#cccccc",
"direction":"right",
"w":50,
"h":50,
"x":300,
"y":600
}
var Background = {
     "type":"image",
"lw": 1,
"color":"background.png",
"stroke":"#000000",
"fill":"#cccccc",
"w":myCanvas.width,
"h":myCanvas.height*2,
"x":0,
"y":0,
"count":0

            }
var pointPU= {
    "type":"image",
"lw": 1,
"color":"",
"stroke":"#000000",
"fill":"#cccccc",
"direction":"right",
"w":100,
"h":30,
"x":0,
"y":-200
}
var pipeTop = {
    "type":"image",
    "size":4,
"lw": 1,
"color":"images/Defender.png",
"stroke":"#000000",
"fill":"#cccccc",
"w":200,
"h":75,
"x":0,
"y":-200
}; 
var pipeBottom = {
    "type":"image",
    "lw": 1, 
    "stroke":"#000000",
    "color":"images/Defender.png",
    "fill":"#cccccc",
    "w":200,
    "h":75,
    "x":500,
    "y":-200
};    
var pipeMid = {
    "type":"image",
"lw": 1,
"stroke":"#000000",
"fill":"#cccccc",
"color":"images/Defender.png",
"w":200,
"h":75,
"x":200,
"y":-200
};    
var pipeMove = {
    "type":"image",
"lw": 1,
"stroke":"#000000",
"fill":"#cccccc",
"color":"images/slide-tackle_transparent_defender.png",
"w":75,
"h":50,
"x":100,
"y":-200,
"direction":"right"
};   
var pipeSpeed = 5; 
var pipeTopx, 
pipetopw, 
pipetopx;
function sortPipetop()
{ 
    console.info("sort pipe");
    pipeTop.size=1+(Math.random()*4);
    if(pipeTop.size<2)
        {
        pipeTop.color="images/Defender.png";
    pipeTop.w=50;
}
    else if(pipeTop.size<3)
        {
            pipeTop.color="images/Defender_2.png";
            pipeTop.w=100;
        }
    else if(pipeTop.size<4)
        {
            pipeTop.color="images/Defender_3.png";
    pipeTop.w=150;
}
    else if(pipeTop.size<5)
        {
            pipeTop.color="images/Defender_4.png";
    pipeTop.w=200;
}
    console.info(pipeTop.size);
    console.info(pipeTop.w);
}
function sortPipebottom()
{ 
    console.info("sort pipe")
    ;pipeBottom.size=1+(Math.random()*4);
    if(pipeBottom.size<2)
        {
        pipeBottom.color="images/Defender.png";
    pipeBottom.w=50;
}
    else if(pipeBottom.size<3)
        {
            pipeBottom.color="images/Defender_2.png";
            pipeBottom.w=100;
        }
    else if(pipeBottom.size<4)
        {
            pipeBottom.color="images/Defender_3.png";
    pipeBottom.w=150;
}
    else if(pipeBottom.size<5)
        {
            pipeBottom.color="images/Defender_4.png";
    pipeBottom.w=200;
}

    pipeBottom.x=myCanvas.width-pipeBottom.w;
}
function sortPipeMid()
{ 
    console.info("sort pipe")
    ;pipeMid.size=1+(Math.random()*4);
    if(pipeMid.size<2)
        {
        pipeMid.color="images/Defender.png";
    pipeMid.w=50;
}
    else if(pipeMid.size<3)
        {
            pipeMid.color="images/Defender_2.png";
            pipeMid.w=100;
        }
    else if(pipeMid.size<4)
        {
            pipeMid.color="images/Defender_3.png";
    pipeMid.w=150;
}
    else if(pipeMid.size<5)
        {
            pipeMid.color="images/Defender_4.png";
    pipeMid.w=200;
}

    pipeMid.x=myCanvas.width-(pipeMid.w+Math.random()*400);
}
function sortPipeMove()
{ 
    console.info("sort pipe");
    pipeMove.x=100+(Math.random()*300);
}
function sortpointPU()
{ 
    console.info("sort pointPU");
    pointPU.x=100+(Math.random()*300);
}
function sortCoinPU()
{ 
    console.info("sort CoinPU");
    CoinPU.x=100+(Math.random()*300);
}
var gameLogicInterval = setInterval(upDateGame, 10);
function upDateGame()
{ 
    if(pipeMove.direction=="right")
        {
            pipeMove.x=pipeMove.x+5;
            if(pipeMove.x>myCanvas.width-(100+pipeMove.w))
                {
                    pipeMove.direction="left";
                    pipeMove.color="images/flipslide-tackle_transparent_defender.png";
                }
        }
    else{
        pipeMove.x=pipeMove.x-5;
        if(pipeMove.x<100)
                {
                    pipeMove.direction="right";
                    pipeMove.color="images/slide-tackle_transparent_defender.png"
                }
    }
    if(pipeMove.y < -pipeMove.y&& score.num>20)
        {
            pipeMove.y = myCanvas.height+(Math.random()*1000);
            while(pipeMove.y>pipeTop.y-100 && pipeMove.y<pipeTop.y+100)
                {
                   pipeMove.y = myCanvas.height+(Math.random()*1000); 
                }
            sortPipeMove();
            score.num = score.num + 1;
            score.text = "Score: "+score.num;
        }
    if(pipeMid.y < -pipeMid.y&& score.num>10)
        {
            pipeMid.y = myCanvas.height+(Math.random()*1000);
            while(pipeMid.y>pipeTop.y-100 && pipeMid.y<pipeTop.y+100)
                {
                   pipeMid.y = myCanvas.height+(Math.random()*1000); 
                }
            sortPipeMid();
            score.num = score.num + 1;
            score.text = "Score: "+score.num;
        }
    if(pipeBottom.y < -pipeBottom.y)
        {
            pipeBottom.y = myCanvas.height+(Math.random()*1000);
            while(pipeBottom.y>pipeTop.y-100 && pipeBottom.y<pipeTop.y+100)
                {
                   pipeBottom.y = myCanvas.height+(Math.random()*1000); 
                }
            sortPipebottom();
            score.num = score.num + 1;
            score.text = "Score: "+score.num;
        } 
        if(pipeTop.y < -pipeTop.y)
        {
            pipeTop.y = myCanvas.height+(Math.random()*1000);
            while(pipeTop.y>pipeBottom.y-100 && pipeTop.y<pipeBottom.y+100)
                {
                   pipeTop.y = myCanvas.height+(Math.random()*1000); 
                }
            sortPipetop();
            score.num = score.num + 1;
    score.text = "Score: "+score.num;
        } 
       pipeSpeed=3+(score.num*0.2);
       if(pointPU.y < -pointPU.y)
        {
            pointPU.y = myCanvas.height+3000+(Math.random()*5000); 
            while(pointPU.y>pipeTop.y-100 && pointPU.y<pipeTop.y+100)
                {
                   pointPU.y = myCanvas.height+3000+(Math.random()*5000); 
                }
            sortpointPU();
        }
        if(((bird.x + bird.w) > pointPU.x && bird.x < pointPU.x+pointPU.w) && ((bird.y+bird.h) > pointPU.y)&&bird.y < pointPU.y+pointPU.h){ pointPU.y = myCanvas.height+(Math.random()*1000);
            {
            while(pointPU.y>pipeTop.y-100 && pointPU.y<pipeTop.y+100)
                {
                   pointPU.y = myCanvas.height+3000+(Math.random()*5000); 
                   console.info("points")
                }
            sortpointPU();
            score.num = score.num + 5;
            score.text="Score: "+score.num;}
}
        if(CoinPU.y < -CoinPU.y)
        {
            CoinPU.y = myCanvas.height+3000+(Math.random()*5000); 
            while(CoinPU.y>pipeTop.y-100 && CoinPU.y<pipeTop.y+100)
                {
                   CoinPU.y = myCanvas.height+3000+(Math.random()*5000); 
                }
            sortCoinPU();
        }
        if(((bird.x + bird.w) > CoinPU.x && bird.x < CoinPU.x+CoinPU.w) && ((bird.y+bird.h) > CoinPU.y)&&bird.y < CoinPU.y+CoinPU.h){ CoinPU.y = myCanvas.height+(Math.random()*1000);
            bird.w=25;
            bird.h=25;
            {
            while(CoinPU.y>pipeTop.y-100 && CoinPU.y<pipeTop.y+100)
                {
                   CoinPU.y = myCanvas.height+3000+(Math.random()*5000); 
                   console.info("points")
                }
            sortCoinPU();
        }
}
    if(bird.w==25&&bird.count<1000)
        {
            bird.count++;
        }
        else{bird.count=0;
        bird.w=75;
        bird.h=75;
        if(bird.x+bird.w>myCanvas.width)
        bird.x=myCanvas.width-bird.w;}
}
