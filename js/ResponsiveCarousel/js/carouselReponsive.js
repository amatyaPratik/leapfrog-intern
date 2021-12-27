let computed_style = function (element, style) {
    return parseFloat(window.getComputedStyle(element).getPropertyValue(style))
  };
  

const allCarousels = document.getElementsByClassName('carousel') 
let carouselList = []

for(let i = 0; i< allCarousels.length; i++){
    allCarousels[i].setAttribute('id',`carousel-${i}`) 
    let obj ={
        id : `carousel-${i}`,
        // width :(+allCarousels[i].classList[1].split('w').join('')),
        // height :(+allCarousels[i].classList[2].split('h').join('')),
        hold :(+allCarousels[i].classList[1].split('hold-').join('')),
        transition :(+allCarousels[i].classList[2].split('transition-').join(''))
    }

    carouselList.push(obj) 
} 


  let Carousel = function (id = "carousel-0", hold = 1000, transition = 50) {
      
    this.id = id
    this.hold = hold
    this.transition = transition
  
 
    let carouselContainer = document.getElementById(this.id)
    carouselContainer.style.position= 'relative'
    let images = carouselContainer.getElementsByClassName("images")[0]
    let imageList = images.getElementsByTagName("img")
    let imgTags = imageList.length
  
    let carouselWidth = computed_style(carouselContainer, "width")
  
    carouselContainer.style.overflow = "hidden"
    carouselContainer.style.position = "relative"
  
   
    for(let i = 0; i < imgTags; i++){
      imageList[i].style.left = (i * carouselWidth) + "px"
    }
  
    //setup previous button
    let previousBtn = document.createElement("button")
    previousBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'
    // previousBtn.setAttribute("class", "arrow-left")
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
    carouselContainer.appendChild(previousBtn)
  
    previousBtn.onclick = function () {
      timer = 0
      clearTimeout(sliderInterval)
      let nextSlide = currentSlide - 1
      if(nextSlide < 0) nextSlide = imgTags - 1
      switchToNextSlide(nextSlide)
      sliderIndex = nextSlide 
    }
  
    let nextBtn = document.createElement("button")
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>' 
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
    carouselContainer.appendChild(nextBtn)
  
    nextBtn.onclick = function () {
      timer = 0
      clearTimeout(sliderInterval)
      let nextSlide = currentSlide + 1
      if(nextSlide > (imgTags - 1)) nextSlide = 0
      switchToNextSlide(nextSlide)
      sliderIndex = nextSlide 
    }
  
    //setup Dots (container)
    let dots = document.createElement("div")
    dots.setAttribute("class", "dots")
    dots.style.position = 'absolute' 
    dots.style.width= '100%' 
    dots.style.bottom= 0 
    // dots.style.background= 'pink'
    dots.style.textAlign = 'center' 
    dots.style.height= '40px'  
    dots.classList.add('dots')
    
    let dotArray = []
    
    for (let i = 0; i < imgTags; i++){
      let dot = document.createElement('i') 
      dot.setAttribute("class", "dot fas fa-circle")
    //   .innerHTML = '<i class="fas fa-chevron-right"></i>'
      dot.style.margin = '0 1%'
      dot.style.color = 'lightgray'
      dot.style.cursor = 'pointer'

      dot.onclick = (function (index) {
        return function(){
          timer = 0
          clearTimeout(sliderInterval)
          switchToNextSlide(index)
          sliderIndex = index
        }
      })(i)
      dotArray.push(dot)
      dots.appendChild(dot)
    }
 
    carouselContainer.appendChild(dots)
  
    let setCurrentDot = function(){
      for(let dotIndex = 0; dotIndex < dotArray.length; dotIndex++){
        if(dotIndex === sliderIndex){
            dotArray[dotIndex].setAttribute("class","dot fas fa-circle active")
            dotArray[dotIndex].style.color = 'white'
            dotArray[dotIndex].style.transform = 'scale(1.2)'
        } 
        else{
            dotArray[dotIndex].setAttribute("class","dot fas fa-circle")
            dotArray[dotIndex].style.color = 'lightgray'
            dotArray[dotIndex].style.transform = 'scale(1)'
        } 

      }
    }
    
    images.onmouseover = function () {
      clearTimeout(sliderInterval)
      clearInterval(transitionInterval)
    }
    
    
    images.onmouseout = function () {
      timer = 0
      initSliderTransition()
    } 
  
    //setup timing for transitions
    let timer = 0
    let sliderIndex = 0
    let nextSlide = 0
    let currentSlide = 0
    let sliderhold = this.hold
    let flag = 1
    let sliderInterval
    let transitionTime = this.transition
  
    if(imgTags == 1) return
  
    let initSliderTransition = function () {
      setCurrentDot()
      sliderInterval = setTimeout(function () {
        timer = 0
  
        if(sliderIndex > (imgTags - 1)) sliderIndex = 0
  
        if(sliderIndex === 0) flag = 1
        if(sliderIndex == (imgTags - 1)) flag = -1
  
        nextSlide = sliderIndex + flag
  
        switchToNextSlide(nextSlide)
  
        sliderIndex += flag
  
      }, sliderhold)
    }
  
    let switchToNextSlide = function (index) {
      timer = 0
      let currentMargin = computed_style(images, "margin-left")
      let targetMargin = -index * carouselWidth
      let dx = (targetMargin - currentMargin)/transitionTime
      
      let transitionInterval = setInterval(function () {
        let currentMargin = computed_style(images, "margin-left")
        if(timer > (transitionTime - 2)) {
          clearInterval(transitionInterval)
          clearTimeout(sliderInterval)
          currentSlide = index
  
          initSliderTransition()
        }
        timer++
        images.style.marginLeft = (currentMargin + dx) + "px"
      }, 10)
    }
  
    initSliderTransition()
  
  }
    
carouselList.forEach((item, index) => { 
      new Carousel(item.id, item.hold, item.transition)
})