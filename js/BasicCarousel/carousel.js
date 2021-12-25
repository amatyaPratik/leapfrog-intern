
let currentImg = 0
const MAX_WIDTH = 300
const MAX_HEIGHT = 200
const STEP = 4

let imgTags
let interval
let lockButtons // initially 'undefined'

//SETUP the CAROUSEL
function setupCarousel(){ 
const carousel = document.getElementsByClassName('carousel')[0]
carousel.style.position= 'relative'
carousel.style.width= MAX_WIDTH+'px'
carousel.style.height= MAX_HEIGHT+'px'
carousel.style.margin= '10% auto'
carousel.style.border= '3px solid black'
carousel.style.overflow= 'hidden'

//style the images container 
const images = document.getElementsByClassName('images')[0]
imgTags = document.getElementsByTagName('img').length
images.style.width= (imgTags * MAX_WIDTH) + 'px'
images.style.position= 'relative'
images.style.height= MAX_HEIGHT+'px'

//make all the images uniform
const imageList = document.getElementsByTagName('img')

for(let i = 0; i<imageList.length; i++){
    imageList[i].style.width= MAX_WIDTH+'px'
    imageList[i].style.float= 'left'
    imageList[i].style.height= MAX_HEIGHT+'px'
}


    const dots = document.createElement('div')
    dots.style.position = 'absolute' 
    dots.style.width= '100%' 
    dots.style.bottom= 0 
    dots.style.textAlign = 'center' 
    dots.style.height= '30px'  
    dots.classList.add('dots')
    
    carousel.appendChild(dots)

    //setup next button
    const nextBtn = document.createElement('button')
    nextBtn.classList.add('next')
    nextBtn.style.position= 'absolute'
    nextBtn.style.top= '0'
    nextBtn.style.bottom= '0'
    nextBtn.style.right= '0'
    nextBtn.style.backgroundColor = 'transparent'
    nextBtn.style.color= 'aliceblue'
    nextBtn.style.border= 'none'
    nextBtn.style.cursor= 'pointer'
    nextBtn.style.fontSize= '20px'
    nextBtn.style.padding= '0 10px'
    

    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'
    nextBtn.onclick = function(){  
        
        if(lockButtons === undefined || lockButtons === false){
            lockButtons = true
            let currentLeft = 0
            //console.log(currentImg);
         
            if(currentImg === imgTags-1){ 
            
                currentLeft = -(imgTags-1)*MAX_WIDTH 
                resetInterval = setInterval(()=>{
                    currentLeft = currentLeft + STEP
                    images.style.left = `${currentLeft}px` 
        
                    if(currentLeft >= 0){  
                        currentImg = 0
                        clearInterval(resetInterval) 
                        changeActiveDot(currentImg)
                        lockButtons = false
                    } 
                },2)
            } 
            else{
                interval = setInterval(()=>{ 
                    currentLeft = currentLeft + STEP
                    images.style.left = `-${(currentImg) * MAX_WIDTH + currentLeft}px`

                    if(currentLeft >= MAX_WIDTH){ 
                        currentImg = (currentImg+1) % imgTags
                        clearInterval(interval) 
                        changeActiveDot(currentImg)
                        lockButtons = false
                    } 
                },1)
            }
        }
      
    } 
    carousel.appendChild(nextBtn)

    //setup previous button
    const previousBtn = document.createElement('button')
    previousBtn.classList.add('previous')
    previousBtn.style.position= 'absolute'
    previousBtn.style.top= '0'
    previousBtn.style.bottom= '0'
    previousBtn.style.left= '0'
    previousBtn.style.backgroundColor = 'transparent'
    previousBtn.style.color= 'aliceblue'
    previousBtn.style.border= 'none'
    previousBtn.style.cursor= 'pointer'
    previousBtn.style.fontSize= '20px'
    previousBtn.style.padding= '0 10px'
    previousBtn.classList.add('next')

    previousBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'
    previousBtn.onclick = function(){  
        if(lockButtons === undefined || lockButtons === false){
            lockButtons = true          
            let currentLeft = 0 
        
            if(currentImg === 0){ 
             
                resetInterval = setInterval(()=>{
                    currentLeft = currentLeft - STEP
                    images.style.left = `${currentLeft}px`;
        
                    if(currentLeft <= -(imgTags - 1)*MAX_WIDTH){  
                        currentImg = imgTags-1
                        currentLeft = 0
                        clearInterval(resetInterval) 
                        changeActiveDot(currentImg)
                        lockButtons = false   
                    } 
                },5)
            } 
            else{    
                currentLeft = +(images.style.left.split('px').join('')) 
                let dx = 0
    
                interval = setInterval(()=>{  
                    dx = dx + STEP
                    images.style.left = `${currentLeft + dx}px`;
                    
                    if(dx == MAX_WIDTH){
                          
                        currentImg = (currentImg-1) % imgTags 
                        clearInterval(interval) 
                        changeActiveDot(currentImg)
                        lockButtons = false  
                    } 
                },5)
            }
        }
    }  
    carousel.appendChild(previousBtn) 

    //setup dots
    const numberOfImages = imgTags
    if(numberOfImages <= 5){
        for(index = 0; index < numberOfImages; index++){
            const dot = document.createElement('i')
            dot.setAttribute('class','dot fas fa-circle')
            dot.setAttribute('id',index)
            dot.setAttribute('onclick',`switchto(${index})`)
            dot.style.margin = '0 1%'
            dot.style.color = 'lightgray'
            dot.style.cursor = 'pointer'
            dots.appendChild(dot)
        }      
        
    document.getElementsByClassName('dot')[currentImg].style.color = 'white'
    document.getElementsByClassName('dot')[currentImg].style.transform = 'scale(1.2)'
    } 
}  

function switchto(slideIndex){
    const images = document.getElementsByClassName('images')[0]
    images.style.left = -(slideIndex * MAX_WIDTH) + 'px' 
    currentImg = slideIndex

    changeActiveDot(currentImg)
}

function changeActiveDot(dotIndex){
    const allDots = document.getElementsByClassName('dot')
     
    for(let i = 0; i < allDots.length; i++){ 
        allDots[i].style.color = 'lightgray'
        allDots[i].style.transform = 'scale(1)'
    }
    allDots[dotIndex].style.color = 'white'
    allDots[dotIndex].style.transform = 'scale(1.2)'
}
setupCarousel()

 