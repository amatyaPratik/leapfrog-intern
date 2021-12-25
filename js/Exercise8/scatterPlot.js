var points = [
    {x: 0, y: 0},
    {x: 40, y: 40},
    {x: 60, y: 20},

    {x: 130, y: 160},
    {x: 260, y: 360},
    {x: 120, y: 120},
    {x: 340, y: 340}
 
];
 

var unit = 30 //px
var graphOffsetLeft = document.getElementById('graph').getBoundingClientRect().left
var graphOffsetBottom = screen.height - document.getElementById('graph').getBoundingClientRect().bottom
console.log(graphOffsetBottom, graphOffsetLeft);

function grid(){
    var graph = document.getElementById('graph')
    var width = parseInt(graph.getBoundingClientRect().right) - parseInt(graph.getBoundingClientRect().left)
    // console.log(width); 

 var offset = -1 // to adjust for 2px border thickness

    for(var i =0; i< (width-4) / unit; i++){
    
        var lineX = document.createElement('div')
        lineX.setAttribute('class', 'barx')
        lineX.style.marginLeft = offset+'px'

        var lineY = document.createElement('div')
        lineY.setAttribute('class', 'bary')  
        // lineY.style.marginLeft = graphOffsetLeft + 'px'
        lineY.style.marginTop = offset+'px'

        graph.appendChild(lineX)
        graph.appendChild(lineY)
        
        offset+=30
    }

    // graph.innerHTML ='sth'
}

function plot(){
    grid()

    for(var i=0; i<points.length; i++){
        var graph = document.getElementById('graph')
        var point = document.createElement('div') 

        point.setAttribute('class','point')
        point.style.left = (points[i].x - 5) + 'px'
        point.style.bottom = (points[i].y - 5) + 'px'
        graph.appendChild(point)

        point.onclick = function(event){
            event.target.style.backgroundColor = (event.target.style.backgroundColor ==='deeppink'? 'green': 'deeppink') 
        }

        point.onmouseover = function(event){
            var coordinate = document.getElementById('coordinate')
            var guideY = document.getElementById('guideY')
            var guideX = document.getElementById('guideX')

            coordinate.innerText = '[x: '+ (+event.target.style.left.split('px').join('') +5) +' , y: ' + (+event.target.style.bottom.split('px').join('')+5) + ' ]'
            coordinate.style.left = event.target.style.left
            coordinate.style.bottom = event.target.style.bottom
            event.target.style.transform = 'scale(1.6)' 

                guideY.style.display='initial' 
                guideY.style.width = event.target.style.left
                guideY.style.bottom = (+event.target.style.bottom.split('px').join('')+4)+'px'

                guideX.style.display='initial'
                guideX.style.height= event.target.style.bottom 
                guideX.style.left = (+event.target.style.left.split('px').join('')+4)+'px'
            }
    
            point.onmouseout = function(event){
                var guideY = document.getElementById('guideY')
                var guideX = document.getElementById('guideX')
                guideY.style.display='none' 
                guideX.style.display='none'
                guideY.style.width='0px' 
                guideX.style.height='0px'

                var coordinate = document.getElementById('coordinate')
                coordinate.innerText = '' 
                event.target.style.transform = 'scale(1)'
            }
    }
}
 
plot()