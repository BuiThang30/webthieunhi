// ----- NAVIGATION MENU ACTIVE LINK -----
const menuLinks = document.querySelectorAll('.nav-menu a');

let currentPath = location.pathname + location.hash;
if (currentPath === "/" || currentPath === "") {
  currentPath = "/home";
}

menuLinks.forEach(link => {
  const linkPath = link.getAttribute('href');
  if (linkPath === currentPath) {
    link.classList.add('active');
  }

  link.addEventListener('click', () => {
    document.querySelector('.nav-menu a.active')?.classList.remove('active');
    link.classList.add('active');
  });
});

// ----- SLIDESHOW HANDLING -----
const slides = document.querySelectorAll(".slide");
const indicatorsTop = document.querySelectorAll(".slider-indicators.top span");
const indicatorsBottom = document.querySelectorAll(".slider-indicators.bottom span");

let currentSlide = 0;

function showSlide(index) {
  const totalSlides = slides.length;
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;

  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  if (indicatorsTop.length) {
    indicatorsTop.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  if (indicatorsBottom.length) {
    indicatorsBottom.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }
}



// Gán sự kiện click cho indicators
indicatorsTop.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});
indicatorsBottom.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

// ----- LẤY SLIDE TỪ URL -----
const urlParams = new URLSearchParams(window.location.search);
const slideIndexFromURL = parseInt(urlParams.get('slide')) || 1;

if (slideIndexFromURL <= slides.length) {
  currentSlide = slideIndexFromURL - 1;
  showSlide(currentSlide);
}

// ----- CLICK TRÁI/PHẢI CHUYỂN SLIDE -----
const sliderWrapper = document.querySelector(".slider-wrapper");
if (sliderWrapper) {
  sliderWrapper.addEventListener("click", (e) => {
    const wrapperWidth = sliderWrapper.offsetWidth;
    const clickX = e.offsetX;

    if (clickX < wrapperWidth / 2) {
      // Click bên trái -> lùi slide
      showSlide(currentSlide - 1);
    } else {
      // Click bên phải -> tiến slide
      showSlide(currentSlide + 1);
    }
  });
}


document.querySelectorAll(".quiz-option").forEach(btn => {
  btn.addEventListener("click", function() {
    const isCorrect = this.getAttribute("data-correct") === "true";
    if (isCorrect) {
      this.classList.add("correct");
    } else {
      this.classList.add("incorrect");
    }

    document.getElementById("answer-section").classList.remove("hidden");

    document.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
  });
});

