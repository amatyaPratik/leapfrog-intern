var input = {
    '1': {
      id: 1,
      name: 'John',
      children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
    },
    '5': {
      id: 5,
      name: 'Mike',
      children: [{ id: 6, name: 'Peter' }]
    }
  };

  var output = {}

  function getChildrenId(item){
    var childIds = item.map(function(child){ 
      if(child.children){
        let childrenOfChild = getChildrenId(child.children)
        output[child.id]={id: child.id, name: child.name, children: childrenOfChild}
        return child.id 
      }else{
        output[child.id]={id: child.id, name: child.name}
        return child.id 
      }                      
  })
  return childIds  
}

  function normalize(object){ 
      Object.entries(object).forEach(val=>{  
          var c = getChildrenId(val[1].children)
          output[val[0]]= {id: val[1].id, name: val[1].name, children: c} 
      }) 
  }            
normalize(input)
console.log(output); 