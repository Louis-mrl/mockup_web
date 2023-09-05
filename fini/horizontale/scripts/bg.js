const background = document.getElementById('img');

var btn_hovers = document.getElementsByClassName("slide_secondary")

const images = ['img/1.png', 'img/2.png', 'img/3.jpg', 'img/4.png', 'img/5.jpg'];		


const slides = document.querySelectorAll(".slide_secondary")


slides.forEach(slide => {
	slide.addEventListener("mouseover", () => {
		next_image(`url(${images[slide.dataset.img]})`)
		for (var btn of btn_hovers) {
			btn.classList.add('border-off')
		}

	});

	slide.addEventListener("mouseout", () => {
		next_image('')
		for (var btn of btn_hovers) {
			btn.classList.remove('border-off')
		}
	});
});

function next_image(url) {
	gsap.to(background, {
	  duration: 0.3,
	  opacity: 0,
	  onComplete: function() {
		background.style.backgroundImage =  url;
		gsap.to(background, {
		  duration: 0.1,
		  opacity: 1,
		});
	  }
	});
  }
  