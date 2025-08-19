document.addEventListener("DOMContentLoaded", () => {
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

  // ----- POSTS (dùng cho search box) -----
const posts = [
  { title: "But what about economics?", url: "/blog2?slide=1" },
  { title: "But what is a market?", url: "/blog2?slide=2" },
  { title: "The economics of midnight studying", url: "/blog2?slide=3" },
  { title: "But what the hell is demand?", url: "http://localhost:3000/blog2?slide=4" },
  { title: "Changing demand - How do you come to want more or less of something?", url: "/blog2?slide=5" },
  { title: "Now, what is supply?", url: "/blog2?slide=6" },
  { title: "Changing Supply - When producers respond to their costs", url: "/blog2?slide=7" },
  { title: "Understanding Price Elasticity of Demand", url: "/blog2?slide=8" },
  { title: "Dive into Income Elasticity of Demand", url: "/blog2?slide=9" },
  { title: "How stretchy is your supply?", url: "/blog2?slide=10" },
  { title: "Market equilibrium", url: "/blog2?slide=11" },
  { title: "The wealth of a nation", url: "/blog2?slide=12" },
  { title: "The driving force of the economy", url: "/blog2?slide=13" },
  { title: "The backbone of our modern life", url: "/blog2?slide=14" },
  { title: "Why is our money so weird?", url: "/blog2?slide=15" },
  { title: "Market Reserves - Destroy The Curves", url: "/blog2?slide=16" },
  { title: "Fiscal policy and monetary policy", url: "/blog2?slide=17" },
  { title: "Exchange rate", url: "/blog2?slide=18" },
  { title: "Unemployment", url: "/blog2?slide=19" },
  { title: "IF SOME COUNTRIES ARE MORE PRODUCTIVE, THEN WHY WOULD THEY TRADE WITH OTHER COUNTRIES? - COMPARATIVE ADVANTAGE & ABSOLUTE ADVANTAGE", url: "/blog2?slide=20" },
  { title: "PROSPERITY OR PRESERVING TRADITIONS?", url: "/blog2?slide=21" },
  { title: "You cannot be the jack of all academic trade", url: "/blog2?slide=22" },
  { title: "Know your strengths, and be accepting of your limits", url: "/blog2?slide=23" },
  { title: "THỪA CÒN HƠN THIẾU(EXCESS THAN LACK) - IS IT ALWAYS TRUE?", url: "/blog2?slide=24" },
  { title: "GIVING IT ALL TO TOP EVERY EXAM YOU SIT FOR? HERE IS WHY IT IS NOT WORTH IT FROM THE LENS OF ECONOMICS.", url: "/blog2?slide=25" },
  { title: "Studying in a group of learners - standing on the shoulders of academic giants", url: "/blog2?slide=26" }
];


   // ----- SEARCH BOX -----
  const searchInput = document.querySelector(".search-box input");
  const searchIcon = document.querySelector(".search-icon");
  const suggestionsBox = document.querySelector(".suggestions");

  function showSuggestions(value) {
    const keyword = value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (!keyword) {
      suggestionsBox.classList.remove("active");
      return;
    }

    const matches = posts
      .map((post, i) => ({ title: post.title, url: post.url, index: i }))
      .filter(item => item.title.toLowerCase().includes(keyword));

    if (matches.length > 0) {
      matches.forEach(match => {
        const li = document.createElement("li");
        li.textContent = match.title;
        li.addEventListener("click", () => {
          searchInput.value = match.title;

          // 👉 Chuyển thẳng sang link url tương ứng
          window.location.href = match.url;

          suggestionsBox.classList.remove("active");
        });
        suggestionsBox.appendChild(li);
      });
      suggestionsBox.classList.add("active");
    } else {
      suggestionsBox.classList.remove("active");
    }
  }

  searchInput?.addEventListener("input", () => {
    showSuggestions(searchInput.value.trim());
  });

  searchIcon?.addEventListener("click", () => {
    showSuggestions(searchInput.value.trim());
  });

  searchInput?.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      const firstSuggestion = suggestionsBox.querySelector("li");
      if (firstSuggestion) firstSuggestion.click();
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      suggestionsBox.classList.remove("active");
    }
  });


  // ----- MULTI SLIDER IMAGE -----
  document.querySelectorAll(".slider-container").forEach(container => {
    if (container.id === "slider-text") return;
    const slides = container.querySelectorAll(".slide");
    const indicatorsTop = container.querySelectorAll(".slider-indicators.top span");
    const indicatorsBottom = container.querySelectorAll(".slider-indicators.bottom span");
    const sliderWrapper = container.querySelector(".slider-wrapper");

    let currentSlide = 0;
    function showImageSlide(index) {
      const totalSlides = slides.length;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;

      slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
      indicatorsTop.forEach((dot, i) => dot.classList.toggle("active", i === index));
      indicatorsBottom.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }
    indicatorsTop.forEach((dot, i) => dot.addEventListener("click", () => showImageSlide(i)));
    indicatorsBottom.forEach((dot, i) => dot.addEventListener("click", () => showImageSlide(i)));
    showImageSlide(currentSlide);

    sliderWrapper?.addEventListener("click", (e) => {
      const clickX = e.offsetX;
      if (clickX < sliderWrapper.offsetWidth / 2) {
        showImageSlide(currentSlide - 1);
      } else {
        showImageSlide(currentSlide + 1);
      }
    });
  });

  // ----- SLIDER TEXT -----
  const sliderTextContainer = document.getElementById("slider-text");
  const slidesText = sliderTextContainer ? sliderTextContainer.querySelectorAll('.slide') : [];
  const thumbs = document.querySelectorAll('.thumb-link');
  let currentTextSlide = 0;

  function showTextSlide(index) {
    const total = slidesText.length;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentTextSlide = index;
    slidesText.forEach((slide, i) => slide.classList.toggle('active', i === index));
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const slideNumber = parseInt(this.getAttribute('data-slide'), 10);
      showTextSlide(slideNumber - 1);
      window.history.pushState(null, "", `?slide=${slideNumber}`);
      sliderTextContainer?.scrollIntoView({ behavior: "smooth" });
    });
  });

  const urlParams = new URLSearchParams(window.location.search);
  const slideIndexFromURL = parseInt(urlParams.get('slide'), 10);
  if (!isNaN(slideIndexFromURL) && slideIndexFromURL > 0 && slideIndexFromURL <= slidesText.length) {
    showTextSlide(slideIndexFromURL - 1);
  } else {
    showTextSlide(0);
  }

  // ----- PREV/NEXT BUTTONS -----
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (slidesText.length) {
    let currentSlideIndex = slideIndexFromURL || 1;
    const totalSlides = slidesText.length;

    function updateSlide(index) {
      showTextSlide(index - 1);
      window.history.pushState(null, "", `?slide=${index}`);
    }

    prevBtn?.addEventListener("click", () => {
      currentSlideIndex = currentSlideIndex > 1 ? currentSlideIndex - 1 : totalSlides;
      updateSlide(currentSlideIndex);
    });

    nextBtn?.addEventListener("click", () => {
      currentSlideIndex = currentSlideIndex < totalSlides ? currentSlideIndex + 1 : 1;
      updateSlide(currentSlideIndex);
    });
  } else {
    // ----- QUIZ -----
    const quizConfigs = { quizpho: 14, quizbattrang: 12, quizcomvong: 16 };
    let quizType = null, currentNumber = null;
    for (const type in quizConfigs) {
      const match = window.location.pathname.match(new RegExp(`/${type}(\\d*)$`));
      if (match) {
        quizType = type;
        currentNumber = match[1] ? parseInt(match[1], 10) : null;
        break;
      }
    }
    if (quizType) {
      const maxQuestion = quizConfigs[quizType];
      prevBtn?.addEventListener("click", () => {
        if (currentNumber === null) return;
        if (currentNumber === 1) {
          window.location.href = `/${quizType}`;
        } else {
          window.location.href = `/${quizType}${currentNumber - 1}`;
        }
      });
      nextBtn?.addEventListener("click", () => {
        if (currentNumber === null) {
          window.location.href = `/${quizType}1`;
        } else if (currentNumber < maxQuestion) {
          window.location.href = `/${quizType}${currentNumber + 1}`;
        }
      });
      if (currentNumber === null && prevBtn) {
        prevBtn.style.visibility = "hidden";
      }
      if (currentNumber === maxQuestion && nextBtn) {
        nextBtn.style.visibility = "hidden";
      }
    }
  }

  // ----- QUIZ ĐÁP ÁN -----
  document.querySelectorAll(".quiz-option").forEach(btn => {
    btn.addEventListener("click", function () {
      const isCorrect = this.getAttribute("data-correct") === "true";
      if (isCorrect) {
        this.classList.add("correct");
      } else {
        this.classList.add("incorrect");
      }
      document.getElementById("answer-section")?.classList.remove("hidden");
      document.querySelectorAll(".quiz-option").forEach(b => b.disabled = true);
    });
  });

  // ----- MENU TOGGLE -----
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  menuToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("show");
  });
});
