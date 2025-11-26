// ---------- NAV LOGIC ----------
(function(){
  const sectionNavs = document.querySelectorAll('.section-nav');

  function visibleRatio(el){
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const top = Math.max(0, r.top);
    const bottom = Math.min(vh, r.bottom);
    return Math.max(0, bottom - top) / vh;
  }

  function updateNavs(){
    sectionNavs.forEach(nav => {
      const section = nav.parentElement;
      const ratio = visibleRatio(section);
      if(ratio > 0.01){
        nav.style.backgroundColor = section.dataset.navcolor;
        nav.classList.add('visible');
      } else {
        nav.classList.remove('visible');
      }
    });
  }

  window.addEventListener('scroll', updateNavs);
  window.addEventListener('resize', updateNavs);
  updateNavs();
})();


//HAMBURGER
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerButtons = document.querySelectorAll(".hamburger");
  const mobileMenu = document.getElementById("global-mobile-menu");
  const closeBtn = mobileMenu.querySelector(".close-menu");

  // OPEN MENU FROM ANY SCREEN
  hamburgerButtons.forEach(button => {
    button.addEventListener("click", () => {
      const section = button.closest("section");
      const navColor = section.dataset.navcolor;

      mobileMenu.style.backgroundColor = navColor;
      mobileMenu.style.display = "flex";
    });
  });

  // CLOSE USING X
  closeBtn.addEventListener("click", () => {
    mobileMenu.style.display = "none";
  });

  // CLOSE WHEN CLICKING A LINK
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.style.display = "none";
    });
  });
});

// adaptive sketches carousel: desktop -> sets, mobile -> individual images
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".sketches-wrapper");
  if (!wrapper) return;

  const sets = Array.from(wrapper.querySelectorAll(".sketch-set"));
  const images = Array.from(wrapper.querySelectorAll(".sketch-img"));
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  // build mobile slides container (clones of images)
  const mobileContainer = document.createElement("div");
  mobileContainer.className = "mobile-slides";
  images.forEach(img => {
    const slide = document.createElement("div");
    slide.className = "mobile-slide";
    const clone = img.cloneNode(true);
    // remove angle classes on clones so they render straight on mobile
    clone.classList.remove("img-left", "img-right");
    clone.classList.add("img-center");
    slide.appendChild(clone);
    mobileContainer.appendChild(slide);
  });
  wrapper.appendChild(mobileContainer);

  // state
  let currentSet = 0;      // for desktop (which set index)
  let mobileIndex = 0;     // for mobile (which image index)
  let mobileMode = window.innerWidth < 768;

  // helper: show desktop set
  function showSet(index) {
    sets.forEach((set, i) => {
      set.classList.remove("active", "exit-left");
      if (i === index) {
        set.classList.add("active");
      } else if (i < index) {
        set.classList.add("exit-left");
      }
    });
    // ensure mobile slides hidden when desktop active
    mobileContainer.querySelectorAll(".mobile-slide").forEach(s => s.classList.remove("active"));
  }

  // helper: show mobile slide
  function showMobile(i) {
    const slides = Array.from(mobileContainer.querySelectorAll(".mobile-slide"));
    slides.forEach(s => s.classList.remove("active"));
    const idx = ((i % slides.length) + slides.length) % slides.length;
    slides[idx].classList.add("active");
  }

  // switch mode based on viewport
  function updateMode() {
    const wasMobile = mobileMode;
    mobileMode = window.innerWidth < 768;

    if (mobileMode) {
      // hide original sets (desktop UI) and show mobile container
      sets.forEach(s => s.style.display = "none");
      mobileContainer.style.display = "flex";
      // show current mobile index
      showMobile(mobileIndex);
    } else {
      // show original sets and hide mobile container
      sets.forEach(s => s.style.display = "");
      mobileContainer.style.display = "none";
      // show current set
      showSet(currentSet);
    }

    // if mode changed, you may want to keep position sensible:
    if (wasMobile && !mobileMode) {
      // map mobileIndex -> corresponding set index (floor)
      const imgsPerSet = Math.max(1, sets[0] ? sets[0].querySelectorAll('.sketch-img').length : 3);
      currentSet = Math.floor(mobileIndex / imgsPerSet) % sets.length;
      showSet(currentSet);
    } else if (!wasMobile && mobileMode) {
      // map currentSet -> mobileIndex start
      const imgsPerSet = Math.max(1, sets[0] ? sets[0].querySelectorAll('.sketch-img').length : 3);
      mobileIndex = (currentSet * imgsPerSet) % images.length;
      showMobile(mobileIndex);
    }
  }

  // initial
  updateMode();
  showSet(currentSet);

  // button handlers
  nextBtn.addEventListener("click", () => {
    if (mobileMode) {
      mobileIndex = (mobileIndex + 1) % images.length;
      showMobile(mobileIndex);
    } else {
      currentSet = (currentSet + 1) % sets.length;
      showSet(currentSet);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (mobileMode) {
      mobileIndex = (mobileIndex - 1 + images.length) % images.length;
      showMobile(mobileIndex);
    } else {
      currentSet = (currentSet - 1 + sets.length) % sets.length;
      showSet(currentSet);
    }
  });

  // respond to resize
  window.addEventListener("resize", () => {
    updateMode();
  });
});



// DIGITAL ART CAROUSEL (standalone safe)
document.addEventListener("DOMContentLoaded", () => {
  const artworks = Array.from(document.querySelectorAll(".digital-art"));
  const nextBtn = document.getElementById("digital-next");
  const prevBtn = document.getElementById("digital-prev");
  if (!artworks.length) return;

  let current = 0;

  function showArt(index) {
    artworks.forEach((art, i) => {
      art.classList.toggle("active", i === index);
    });
  }

  // buttons (guarded)
  if (nextBtn) nextBtn.addEventListener("click", () => {
    current = (current + 1) % artworks.length;
    showArt(current);
  });

  if (prevBtn) prevBtn.addEventListener("click", () => {
    current = (current - 1 + artworks.length) % artworks.length;
    showArt(current);
  });

  // keyboard support
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      current = (current + 1) % artworks.length;
      showArt(current);
    } else if (e.key === "ArrowLeft") {
      current = (current - 1 + artworks.length) % artworks.length;
      showArt(current);
    }
  });

  showArt(current);
});


//BACK TOP TOP BUTTON
document.querySelectorAll('.back-top-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#screen-5').scrollIntoView({ behavior: 'smooth' });
  });
});
