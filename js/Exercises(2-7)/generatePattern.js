function generatePattern(n) {
    for (var i = n; i > 0; i--) {
      var newLine = ''
      for (var j = 0; j < i; j++) {
        newLine += '*'
      }
      console.log(newLine);
      newLine =''
    }
  }
  
  generatePattern(5)
  