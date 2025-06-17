
function toggleOverlay(){
    console.log('connect');
    let overlayRef = document.getElementById('overlay');
    let overlay_content = document.getElementById('overlay-content-loader')
    overlayRef.classList.toggle('d-none');
    if(!overlayRef.classList.contains('d-none')){
        overlay_content.innerHTML= getTaskOverlay();
    }
}