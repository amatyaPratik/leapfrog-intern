var arr = [1,2,3,4]

function twice(val){ 
    return val * 2
}
function sqrt(val){ 
    return Math.pow(val, 0.5) 
}
function cube(val){ 
    return val ** 3
}

function transform(array, func){
    var newarr = array.map(func) 
    return newarr
}

console.log(transform(arr,twice))