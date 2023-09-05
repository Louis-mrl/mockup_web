const track = document.getElementById("track")
const images = document.querySelectorAll(".image")
var click = false;
var move = false;
var full_screen = false;
var scrolling = 0;
const compteur = document.getElementById("left")
var compteur_img = 0
const mini_tarck = document.getElementById("mini_track")



images.forEach(img => {
    img.addEventListener("click", e => {
        var i = parseFloat(e.target.dataset.n)
        if (move == false) {
            if (full_screen){
                if(e.layerX >= window.innerWidth/2){
                    scrolling = window.innerWidth*(parseFloat(e.target.dataset.n)+1)
                    if(scrolling > window.innerWidth*7)scrolling = window.innerWidth*7;
                    console.log((i+1)*-20)
                    if(parseFloat(e.target.dataset.n != 7))update_compteur((i+1)*-20);
                }
                else {
                    scrolling = window.innerWidth*parseFloat(e.target.dataset.n-1)
                    if(scrolling < 0)scrolling = 0;
                    console.log((i-1)*-20)
                    if(parseFloat(e.target.dataset.n != 0))update_compteur((i+1)*-20);
                }

                anime_track_translate(-scrolling, 'px', 500)
                
            }
            else{
            
            full_screen = true
        track.animate({
            transform: `translateX(-${12.5*e.target.dataset.n}%)`,
            margin: `0`,
            gap:"0",

        }, {
            duration: 500,
            fill: "forwards"
        });
        

        gsap.to(".image", {

            width: "100vw",
            height: "100vh",
            ease: "none",
            duration: "0.5",
            objectPosition : "50%",
        }), {
            clipPath: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            ease: "none"
        }

        update_compteur(parseFloat(-img.dataset.n)*20)
    }

    
}})


});

window.addEventListener("wheel", e => {
    if (full_screen){
        annimation_fullscreen_off(e)
    }
    else {
        console.log("scroll")
    }
   
})


document.addEventListener("mousemove", (e) => {
    if (click) {
        move = true;
        if (full_screen == false){
            var mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
            var maxDelta = window.innerWidth / 2;
    
            var percentage = (mouseDelta / maxDelta) * -100;
    
    
            var prevPercentage = parseFloat(track.dataset.prevPercentage) || 0;
            var nextPercentageUnconstrained = prevPercentage + percentage;
            var nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
                     if (nextPercentage < -89.15) {
                        nextPercentage = -89.15;
                    }
    
            track.dataset.percentage = nextPercentage;
    
            
            anime_track_translate(nextPercentage, '%', 1200)
            anime_images_translate(nextPercentage /2)
            
            
            images.forEach(img => {
                /* choper les coordonés des images */
                coordonées = img.getBoundingClientRect()
                if(coordonées.x < window.innerWidth/2){
                    compteur_img = parseFloat(img.dataset.n)
                }

                
            });
            update_compteur(compteur_img * -20)
        }
        else {
            annimation_fullscreen_off(e)
            
            console.log("enlever l'annimation et scroll")
        }
       

    } else {
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