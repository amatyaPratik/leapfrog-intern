
let currentImg = 0
 
let interval

//SETUP the CAROUSEL
function setupCarousel(){ 
const carousel = document.getElementsByClassName('carousel')[0]
carousel.style.position= 'relative'
carousel.style.width= '300px'
carousel.style.height= '200px'
carousel.style.margin= '10% auto'
carousel.style.border= '3px solid black'
carousel.style.overflow= 'hidden'

//style the images container 
const images = document.getElementsByClassName('images')[0]
images.style.width= '900px'
images.style.position= 'relative'
images.style.height= '200px'

//make all the images uniform
const imageList = document.getElementsByTagName('img')

for(let i = 0; i<imageList.length; i++){
    imageList[i].style.width= '300px'
    imageList[i].style.float= 'left'
    imageList[i].style.height= '200px' 
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
        let currentLeft = 0
        console.log(currentImg);
    
    
        if(currentImg === 2){ 
         
            currentLeft = +(images.style.left.split('px').join('')) 
            resetInterval = setInterval(()=>{
                 
                images.style.left = `${currentLeft++}px`;
    
                if(currentLeft === 0){  
                    currentImg = 0
                    clearInterval(resetInterval)

                    changeActiveDot(currentImg)
                } 
            },2)
        } 
        else{
            interval = setInterval(()=>{ 
                images.style.left = `-${(currentImg)*300+currentLeft++}px`;
                if(currentLeft >= 300){
                      
                    currentImg = (currentImg+1) % 3 
                    clearInterval(interval)

                    changeActiveDot(currentImg)
                } 
            },1)
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
        let currentLeft = 0

        // document.getElementsByClassName('dot')

        console.log(currentImg);
    
    
        if(currentImg === 0){ 
         
            resetInterval = setInterval(()=>{
                 
                images.style.left = `${currentLeft--}px`;
    
                if(currentLeft <= -600){  
                    currentImg = 2
                    currentLeft = 0
                    clearInterval(resetInterval)

                    changeActiveDot(currentImg)
                } 
            },2)
        } 
        else{    
            currentLeft = +(images.style.left.split('px').join('')) 
            let dx = 0

            interval = setInterval(()=>{  
                images.style.left = `${currentLeft + dx++}px`;
                
                if(dx == 300){
                      
                    currentImg = (currentImg-1) % 3  
                    clearInterval(interval)

                    changeActiveDot(currentImg)
                } 
            },1)
        }
    }  
    carousel.appendChild(previousBtn) 

    //setup dots
    const numberOfImages = images.getElementsByTagName('img').length
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

function switchto(slideIndex){
    const images = document.getElementsByClassName('images')[0]
    images.style.left = -(slideIndex * 300) + 'px'
    console.log('dot',slideIndex);
    currentImg = slideIndex

    changeActiveDot(currentImg)
}

function changeActiveDot(dotIndex){
    const allDots = document.getElementsByClassName('dot')
    
    // allDots.forEach(dot =>{
    //     dot.style.color = 'lightgray'
    //     dot.style.transform = 'scale(1)'
    // })
    for(let i = 0; i < allDots.length; i++){ 
        allDots[i].style.color = 'lightgray'
        allDots[i].style.transform = 'scale(1)'
    }
    allDots[dotIndex].style.color = 'white'
    allDots[dotIndex].style.transform = 'scale(1.2)'
}
setupCarousel()

 