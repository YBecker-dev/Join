
function toggleBoardOverlay(){
    console.log('connect');
    let overlayRef = document.getElementById('overlayBoard');
    let overlay_content = document.getElementById('overlay-content-loader')
    overlayRef.classList.toggle('d-none');
    if(!overlayRef.classList.contains('d-none')){
        overlay_content.innerHTML= getTaskOverlay();
    }
}