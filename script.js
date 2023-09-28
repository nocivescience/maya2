const joystickEl = document.querySelector('.joystick');
const joystickHeadEl = document.querySelector('.head-joystick');
const noteEl = document.querySelector('.note');
const mazeEl = document.querySelector('#maze');
let mouseStartX, mouseStartY;
let debbug = false;
let gameInProgress = false;
Math.minmax=(value, limit)=> Math.min(limit, Math.max(value, -limit));
function main(){
    console.log('main');
};
joystickHeadEl.addEventListener('mousedown', function(e) {
    if(!gameInProgress){
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        gameInProgress = true;
        window.requestAnimationFrame(main);
        noteEl.style.opacity = 0;
        joystickHeadEl.style.cssText = `
            animation: none;
            cursor: grabbing;
        `;
        if(debbug )console.log(mouseDeltaX, mouseDeltaY);
    }
});
window.addEventListener('mousemove', function(e) {
    if(gameInProgress){
        const mouseDeltaX = Math.minmax(e.clientX - mouseStartX, 15);
        const mouseDeltaY = Math.minmax(e.clientY - mouseStartY, 15);
        joystickHeadEl.style.cssText = `
            left: ${mouseDeltaX}px;
            top: ${mouseDeltaY}px;
            animation: none;
            cursor: grabbing;
        `;
        const rotationX=mouseDeltaY*2;
        const rotationY=mouseDeltaX*2;
        mazeEl.style.cssText = `
            transform: rotateX(${rotationX}deg) rotateY(${rotationY}deg);
        `;
    }
});
window.addEventListener('mouseup', function(e) {
    if(gameInProgress){
        gameInProgress = false;
        joystickHeadEl.style.cssText = `
            left: 0;
            top: 0;
            animation: joystick 0.2s linear infinite;
            cursor: grab;
        `;
        mazeEl.style.cssText = `
            transform: rotateX(0deg) rotateY(0deg);
        `;
        noteEl.style.opacity = 1;
    }
});