var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 5,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function bubbleSort(array, field){
    var temp

    for(var i =0; i<array.length-1; i++){
        for(var j =i+1; j< array.length; j++){
            if(array[i][field] > array[j][field]){
                temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
        }
    }  
}
 
function sortBy(array,field){
    var sorted = []
    console.log('unsorted: ', array);
    bubbleSort(array, field)
    console.log('sorted by '+field+' : ', array);
}
 
sortBy(arr,'id')
sortBy(arr,'name') 