const anime_track_translate = (x, échelle, duration) => {
    track.animate({
        transform: `translateX(${x}${échelle})`
    }, {
        duration: duration,
        fill: "forwards"
    });   
}

const anime_images_translate = (nextPercentage) => {
    for(var image of track.getElementsByClassName("image")) {
        image.animate({
          objectPosition: `${50 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
      }
}

const update_compteur = (px) => {
    compteur.animate({
        transform : `translateY(${px}px)`
    }, {duration: 500, fill: "forwards"});
}

const annimation_fullscreen_on = () => {
    gsap.from(mini_tarck, {
        y: "10%",
        duration: "1",
    })

}

const annimation_fullscreen_off = (e) => {
    images.forEach(img => {
        gsap.to(".image", {
            width: "39vmin",
            height: "100%",
            ease: "none",
            duration: "1",
            objectPosition : "100%",
        })

        track.animate({
            transform: `translateX(-${12.5*e.target.dataset.n}%)`,
            margin: "12.5% 0px 0px 39%",
            gap:"4vw",

        }, {
            duration: 3000,
            fill: "forwards"
        });
        track.dataset.percentage  = `-${12.5*e.target.dataset.n}`;
        track.dataset.prevPercentage  = `-${12.5*e.target.dataset.n}`;

        full_screen = false

        gsap.to(mini_tarck, {
            y: "100px",
            duration : "1"
            
        })
})}