const track = document.getElementById("track");
const mini_track =document.getElementById("mini_track");
const images = document.querySelectorAll(".image")
var full_screen = 0
var click = false
var move = false
var clickX = 0
var clickY = 0

images.forEach(image => {
    image.addEventListener("click", e => {
        if(full_screen == 1 && move == false){
            gsap.to(track, {
                x: `-${12.5*image.dataset.n}%`,
                duration: 0.2,
            })
            track.dataset.prevPercentage = -12.5*image.dataset.n
            track.dataset.percentage = track.dataset.prevPercentage
            track.dataset.mouseDownAt = window.innerWidth /2

            change_full_screen(0)
        }
        else if(full_screen == 0 && move == false){
            console.log("changer de slide")
        }
    });
});



window.addEventListener('wheel', e => {
    if(full_screen == 0) {
        change_full_screen(1)
    }
    else {

        console.log("scroll")

    }
})

document.addEventListener("mousedown", (e) => {
    click = true;
    track.dataset.mouseDownAt = e.clientX;
    clickX = e.clientX
    clickY = e.clientY
});

document.addEventListener("mouseup", (e) => {
    click = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
    if(clickX - e.clientX < -20 || clickY - e.clientY < -20 || clickX - e.clientX > 20 || clickY - e.clientY > 20){
        move = true
    }
});

document.addEventListener("mousemove", (e) => {
    if (click) {
        if(full_screen == 0){
            change_full_screen(1)
        }
        else{
            var mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        var maxDelta = window.innerWidth / 2;

        var percentage = (mouseDelta / maxDelta) * -100;


        var prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
        var nextPercentageUnconstrained = prevPercentage + percentage;
        var nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
        
        if (nextPercentage < -89.2) {
            nextPercentage = -89.2;
        }
        else if(nextPercentage == 0){
            nextPercentage = track.dataset.percentage
        }
        track.dataset.percentage = nextPercentage;

        gsap.to(track, {
            x : `${nextPercentage}%`,
            duration: 1.2
        })
        
        }
        



    } else {
        move = false;
    }
});


function change_full_screen(etat, px=track.dataset.percentage) {
    if(etat == 0){
        gsap.to(track, {
            height: "100%",
            gap: "0",
            marginLeft: "0%",
            duration : 0.5,
            delay : 0.3
        })
    
        gsap.to(".image", {
            width: '100vw',
            duration : 0.5,
            delay : 0.3
        })

        gsap.to (mini_track, {
            y: "0",
            delay : 0.8
        })

        full_screen--
        console.log("change full_screen for 1")
    }

    else if (etat == 1){
    
        gsap.to(track, {
            height: "55%",
            gap: "4vw",
            marginLeft: "39%",
            duration : 0.5,
            x: `${px}%`
        })
    
        gsap.to(".image", {
            width: '38vmin',
            duration : 0.5,
        })

        gsap.to (mini_track, {
            y: "10vh"
        })

        full_screen++
        console.log("change full_screen for 0")
    }

    
}