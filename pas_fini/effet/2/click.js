const track = document.getElementById("image_track")
    const images = document.querySelectorAll(".image")

/* images.forEach(img => {
        img.addEventListener("click", e =>{
            gsap.to(track, {
                padding: "0",
                duration : "0.5",
            })
  
            gsap.to(img, {
            left: "0",
            top: "0",
            width: "100vw",
            height: "100vh",
            ease: "none",
            duration : "0.5"
            }), {
            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            ease: "none"
            }

            track.style.transform = `translateX(-${31.5*img.dataset.n}%)`
            })
            

}); */


/* 
    window.addEventListener("wheel", e =>{
    images.forEach(img => {
        gsap.to(img, {
    width: "40vmin",
    height: "56vmin",
    ease: "none",
    duration : "0.5",
})
    


gsap.to(track, {
        padding: "15% 0px 15% 50%",
        duration : "0.5"
            })
})
})
 */



var click = false;
var move = false;

document.addEventListener("mousemove", (e) => {
    if (track.dataset.full_screen === "1") return;
    if (click) {
        move = true;
        var mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
        var maxDelta = window.innerWidth / 2;

        var percentage = (mouseDelta / maxDelta) * -100;


        var prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
        var nextPercentageUnconstrained = prevPercentage + percentage;
        var nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
/*         if (nextPercentage < -88.5) {
            nextPercentage = -88.5;
        } */

        track.dataset.percentage = nextPercentage;


        track.animate(
            {
                transform: `translateX(${nextPercentage}%)`
            },
            { duration: 1200, fill: "forwards" }
        );

    } else {
        /* vérifier si la souris bouge + que x nombre de pixel */
        move = false;
    }
});

document.addEventListener("mousedown", (e) => {
    click = true;
    track.dataset.mouseDownAt = e.clientX;
});

document.addEventListener("mouseup", (e) => {
    click = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
});