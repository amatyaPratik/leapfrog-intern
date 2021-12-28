
 
    const minX  = 0
    const minY  = 0
    const maxX = 1300
    const maxY = 600
    const ballCount = 20

    //holds wall boundaries
    let walls

    let colorList = ['lightblue','coral','lawngreen','pink','blue','red','gray','yellow'] 
    // let newBall

let balls = []    

const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}     

function startGame() {
    container.init()
    walls = container.getWalls(); 
    const randInits = []  // array of {rx, ry, rradius} that were initialized with getRandomInt

    for(let i =0; i < ballCount; i++){
        let randRadius = getRandomInt(5, 9)
        let ranX = getRandomInt(walls.left, walls.right - 2*randRadius)
        let ranY = getRandomInt(walls.top, walls.bottom - 2*randRadius) 

        if(randInits.length===0){
            randInits.push({rx: ranX, ry: ranY, rradius: randRadius})
        }

        //re-adjust colliding inits of (x,y)
        //FAILS FOR BALLCOUNT > 10 BECAUSE OF REINITIALIZING BY FOLLOWING CONDITION FOR ENORMOUS POINTS + MATH LOAD + SETINTERVAL LOAD
        randInits.forEach(p => {
            while( ((ranX + 2*randRadius) >= p.rx ) && ( ranX <= (p.rx + 2*p.rradius)) && 
            ((ranY + 2*randRadius) >= p.ry ) && (ranY <= (p.ry + 2*p.rradius))){
                ranX = getRandomInt(walls.left, walls.right - 2*randRadius)
                ranY = getRandomInt(walls.top, walls.bottom - 2*randRadius) 
            }
        randInits.push({rx: ranX, ry: ranY, rradius: randRadius})
        })

        const newBall = new ball(randRadius, ranX, ranY, colorList[getRandomInt(0,8)]);
        newBall.initBall()
        container.start(); 
    } 
}
 

var container = { 
    box : document.createElement("div"),
    init: function(){
        this.box.setAttribute('id','box')  
        this.box.style.width = maxX+'px'
        this.box.style.height = maxY+'px' 
        this.box.style.margin= '10px auto';  
        document.body.insertBefore(this.box, document.body.childNodes[0]);
    },
    start : function() {        
        this.interval = setInterval(updateGameArea, 100);       
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() { 
        document.getElementById('box').innerHTML = ''
    },

    getWalls: function(){ 
        return this.box.getBoundingClientRect()
    }    
}

function ball(radius = 55, x, y, color) { 
    this.radius = radius;
    this.x = x;
    this.y = y;    
    this.mass = radius **3  // assume radius^2 is equivalent to mass. because it is proportional
    // this.speed = 0;
    // this.angle = undefined;    
    // this.dx = (Math.random() > 0.5) ? 1*Math.random()*1: -Math.random()*1
    // this.dy = (Math.random() > 0.5) ? 1*Math.random()*1: -Math.random()*1
    this.dx = (Math.random() > 0.5) ? 1: -1
    this.dy = (Math.random() > 0.5) ? 1: -1
    this.color = color
    this.ballHandle = document.createElement('div') 
    this.speed = () =>{
        return Math.sqrt(this.dx**2 + this.dy**2)
    }
    this.angle = () =>{
        return Math.atan(this.dy, this.dx)
    }

    this.initBall = function(){
        // ballHandle = document.createElement('div')
        this.ballHandle.style.position = 'absolute'
        this.ballHandle.style.borderRadius = '50%'
        this.ballHandle.style.width = (2*this.radius) + 'px'
        this.ballHandle.style.height = (2*this.radius) + 'px'
        this.ballHandle.style.backgroundColor = this.color
        this.ballHandle.style.left = this.x +'px'
        this.ballHandle.style.top = this.y + 'px'

        // console.log(b);
        document.getElementById('box').appendChild(this.ballHandle)
        balls.push(this)
    }

    this.update = ()=> { 
        this.ballHandle.style.left = this.x+'px'
        this.ballHandle.style.top = this.y+'px' 
        document.getElementById('box').appendChild(this.ballHandle)
    }
    this.newPos = () => {
        this.x = this.x + this.dx
        this.y = this.y + this.dy
        this.checkBallCollision() 
        this.checkWallCollision()  
    }

    this.checkWallCollision = function(){
        // container.getWalls()
        if((this.x + 2*this.radius + this.dx) >= walls.right){
            // console.log('collided');
            this.dx = -this.dx
        }
        if((this.y + 2*this.radius + this.dy) >= walls.bottom){
            // console.log('collided');
            this.dy = -this.dy
        }
        if(this.x+this.dx <= walls.left){
            // console.log('collided');
            this.dx = -this.dx
        }
        if( this.y + this.dy <= walls.top){
            // console.log('collided');
            this.dy = -this.dy
        }
    }

    this.checkBallCollision = function(){
        balls.forEach( ball =>{
            if(ball !== this){
                let distanceX = (ball.x+ball.radius) - (this.x+this.radius)
                let distanceY = (ball.y+ball.radius) - (this.y+this.radius)
                let distance = Math.sqrt(distanceX**2 + distanceY**2)
                if(this.radius+ball.radius >= distance){
 

                    let theta1 = this.angle();
                    let theta2 = ball.angle();
                    let phi = Math.atan2(ball.y - this.y, ball.x - this.x);
                    let m1 = this.mass;
                    let m2 = ball.mass;
                    let v1 = this.speed();
                    let v2 = ball.speed();

                    let dx1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.cos(phi) + v1*Math.sin(theta1-phi) * Math.cos(phi+Math.PI/2);
                    let dy1F = (v1 * Math.cos(theta1 - phi) * (m1-m2) + 2*m2*v2*Math.cos(theta2 - phi)) / (m1+m2) * Math.sin(phi) + v1*Math.sin(theta1-phi) * Math.sin(phi+Math.PI/2);
                    let dx2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.cos(phi) + v2*Math.sin(theta2-phi) * Math.cos(phi+Math.PI/2);
                    let dy2F = (v2 * Math.cos(theta2 - phi) * (m2-m1) + 2*m1*v1*Math.cos(theta1 - phi)) / (m1+m2) * Math.sin(phi) + v2*Math.sin(theta2-phi) * Math.sin(phi+Math.PI/2);

                    this.dx = dx1F;                
                    this.dy = dy1F;                
                    ball.dx = dx2F;                
                    ball.dy = dy2F;

                    staticCollision(this, ball)     
                    // this.checkWallCollision()                            
                }
            }
        })
    } 
}

function staticCollision(ob1, ob2, emergency=true)
{ 
    let distanceX = (ob1.x+ob1.radius) - (ob2.x+ob2.radius)
    let distanceY = (ob1.y+ob1.radius) - (ob2.y+ob2.radius)
    let distance = Math.sqrt(distanceX**2 + distanceY**2)

    let overlap = ob1.radius + ob2.radius - distance;
    let smallerObject = ob1.radius < ob2.radius ? ob1 : ob2;
    let biggerObject = ob1.radius > ob2.radius ? ob1 : ob2; 
    if (emergency) [smallerObject, biggerObject] = [biggerObject, smallerObject]
    
    let theta = Math.atan2((biggerObject.y - smallerObject.y), (biggerObject.x - smallerObject.x));
    smallerObject.x -= overlap * Math.cos(theta);
    smallerObject.y -= overlap * Math.sin(theta); 

    if (distance < ob1.radius + ob2.radius) { 
        if (!emergency) staticCollision(ob1, ob2, true)
    }
}

updateGameArea = () =>{
    container.clear();

    balls.forEach(b=>{
        b.newPos()
        b.update(); 
    })
    
}
 
console.log(balls);