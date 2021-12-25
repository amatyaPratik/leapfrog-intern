

 
 
var direction = 1
var ball = document.getElementById('ball')
var box = document.getElementById('box')

function bounce(){ 
 
    if(ball.getBoundingClientRect().bottom >= box.getBoundingClientRect().bottom){
        direction = -1
    }
    else if(ball.getBoundingClientRect().top <=0){
        direction = 1
    } 
        ball.style.top = ((ball.getBoundingClientRect().top) +(direction*3))+'px';
 
}



setInterval(bounce,10)
