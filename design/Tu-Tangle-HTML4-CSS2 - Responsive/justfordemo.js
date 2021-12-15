document.getElementsByClassName('btn-toggle-recents')[0].
addEventListener('click',()=>{
    document.getElementById('tabright').style.display='none'
    document.getElementById('tableft').style.display='block'
})

document.getElementsByClassName('btn-toggle-videos')[0].
addEventListener('click',()=>{
    document.getElementById('tableft').style.display='none'
    document.getElementById('tabright').style.display='block'
})