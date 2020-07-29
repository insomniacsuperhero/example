let paintbox = document.getElementById('paintbox');
let context = paintbox.getContext('2d')
let gameOn = true;
let iniy = 2;
class box{
    constructor(size,color){
        this.size = size;
        this.color = color;
        this.x = 0
        this.y = 0
    }
}

class Player extends box {
    constructor(){
        super(20,'blue')
        this.x = 0
        this.y = 225
        this.speed = 5
        this.moving = false
    }
    move(){
        if(this.moving){
            this.x+=this.speed
        }
    }
}

class enemy extends box {
    constructor(speed){
        super(50,'red')
        this.speed = speed
    }

    move(){
        this.y +=this.speed
        if(this.y + this.size > 500){
            this.speed = -(Math.abs(this.speed))
        }
        if(this.y<0){
            this.speed = Math.abs(this.speed);
        } 
    }
}

paintbox.addEventListener('mousedown',()=>{
    player.moving = true
    console.log("mousedown");
})
paintbox.addEventListener('mouseup',()=>{
    player.moving = false
    console.log("mouseup");
})

let player = new Player()
let e1 = new enemy(4)
let e2 = new enemy(8)
let e3 = new enemy(6)
e1.x = 120
e2.x = 240
e3.x = 360

function drawBox (box){
    context.fillStyle = box.color
    context.fillRect(box.x,box.y,box.size,box.size)
} 

setInterval(()=>{
    let randomi = 100*Math.random()
    player.y = player.y+randomi
    if(player.y+player.size>=500){
        randomi = -(Math.abs(randomi));
    }
    if(player.y<=0){
        randomi = Math.abs(randomi)
    }
},2000)


function isColliding(box1,box2){
    if(((box2.x+box2.size)>=box1.x) && ((box1.x+box1.size)>=box2.x) &&(box2.y<(box1.y+box1.size)) && ((box2.y+box2.size)>box1.y)){
        return true;
    }
    
    return false;
}

function complete(box1){
    if((box1.x+box1.size)>=500){
        return true;
    }
    return false;
}


/*setInterval(()=>{
    context.clearRect(0,0,500,500)
    e1.y+=e1.speed
    e2.y+=e2.speed
    drawBox(e1)
    drawBox(e2)
    
},1000)*/

function gameloop(){
    if(!gameOn){return}
    context.clearRect(0,0,500,500)
    drawBox(e1)
    drawBox(e2)
    drawBox(e3)
    drawBox(player)
    if(isColliding(e1,player)||isColliding(e2,player)||isColliding(e3,player)){
        gameOn = false
        window.alert("GAME OVER!")
    }
    if(complete(player)){
        gameOn = false
        window.alert("YAY! YOU WON")
    }
    e1.move()
    e2.move()
    e3.move()
    player.move()
    window.requestAnimationFrame(gameloop)
}


gameloop()


/*function update(){
    window.requestAnimationFrame(()=>{
    context.clearRect(0,0,500,500)
    e1.move()
    e2.move()
    e3.move()
    drawBox(player)
    drawBox(e1)
    drawBox(e2)
    drawBox(e3)
    update();
    })
    
}
update()*/



