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

//SKETCHES
document.addEventListener("DOMContentLoaded", () => {
  const sets = document.querySelectorAll(".sketch-set");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  let currentSet = 0;

  function showSet(index) {
    sets.forEach((set, i) => {
      set.classList.remove("active", "exit-left");
      if (i === index) {
        set.classList.add("active");
      } else if (i < index) {
        set.classList.add("exit-left");
      }
    });
  }

  // 👇 add this line
  showSet(currentSet);

  nextBtn.addEventListener("click", () => {
    currentSet = (currentSet + 1) % sets.length;
    showSet(currentSet);
  });

  prevBtn.addEventListener("click", () => {
    currentSet = (currentSet - 1 + sets.length) % sets.length;
    showSet(currentSet);
  });
});


//DIGITAL ART CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const artworks = document.querySelectorAll(".digital-art");
  const nextBtn = document.getElementById("digital-next");
  const prevBtn = document.getElementById("digital-prev");
  let current = 0;

  function showArt(index) {
    artworks.forEach((art, i) => {
      art.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % artworks.length;
    showArt(current);
  });

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + artworks.length) % artworks.length;
    showArt(current);
  });

  showArt(current);
});


//BACK TOP TOP BUTTON
document.querySelectorAll('.back-top-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#screen-5').scrollIntoView({ behavior: 'smooth' });
  });
});
