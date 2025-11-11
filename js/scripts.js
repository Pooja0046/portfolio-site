/*!
* Start Bootstrap - Creative v7.0.6 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });

});

















// ---------- SCROLL BUTTONS ----------
document.getElementById("start-btn").addEventListener("click", () => {
  document.querySelector("#screen-2").scrollIntoView({ behavior: "smooth" });
});
document.getElementById("bio-btn").addEventListener("click", () => {
  document.querySelector("#screen-4").scrollIntoView({ behavior:"smooth" });
});
document.querySelectorAll('.back-top-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#screen-2').scrollIntoView({ behavior: 'smooth' });
  });
});


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

// ---------- CHARACTER DIALOG ----------

(function() {
  const sectionSelector = "#screen-2";
  const dialogTextEl = document.getElementById("dialog-text");
  const dialogBoxEl = document.getElementById("dialog-box");
  const charSprite = document.getElementById("char-sprite");
  const skipBtn = document.getElementById("dialog-skip");

  if (!dialogTextEl || !charSprite || !dialogBoxEl) return;

  const fullText = "Welcome to my portfolio! Select a file to begin exploring.";
  const charSmileSrc = "./assets/img/character.png";
  const charTalkSrc  = "./assets/img/charactertalking.png";

  const typingSpeed = 90; // ms per character

  let typingInterval = null;
  let mouthInterval = null;
  let charIndex = 0;
  let typingActive = false;

  function startTyping() {
    if (typingActive) return;
    typingActive = true;
    dialogTextEl.textContent = "";
    charIndex = 0;

    // show bubble
    dialogBoxEl.style.opacity = "1";
    dialogBoxEl.style.transform = "translateY(0)";

    // mouth animation
    mouthInterval = setInterval(() => {
      charSprite.src = (charSprite.src && charSprite.src.includes("charactertalking"))
        ? charSmileSrc
        : charTalkSrc;
    }, 160);

    // typing interval
    typingInterval = setInterval(() => {
      charIndex++;
      dialogTextEl.textContent = fullText.slice(0, charIndex);

      // dynamically adjust width of bubble based on text length
      dialogBoxEl.style.width = "auto"; // width
      const textWidth = dialogTextEl.scrollWidth + 32; // text + padding
      const maxWidth = Math.min(textWidth, window.innerWidth * 0.7); // don't exceed 70vw
      dialogBoxEl.style.width = maxWidth + "px";

      if (charIndex >= fullText.length) {
        finishTyping();
      }
    }, typingSpeed);
  }

  function finishTyping() {
    typingActive = false;
    if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
    if (mouthInterval) { clearInterval(mouthInterval); mouthInterval = null; }

    charSprite.src = charSmileSrc;

    // hide bubble
    dialogBoxEl.style.opacity = "0";
    dialogBoxEl.style.transform = "translateY(-10px)";
  }

  // skip button
  skipBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (typingActive) {
      if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
      if (mouthInterval) { clearInterval(mouthInterval); mouthInterval = null; }

      dialogTextEl.textContent = fullText;
      charSprite.src = charSmileSrc;
      typingActive = false;

      // hide bubble shortly after skip
      setTimeout(() => {
        dialogBoxEl.style.opacity = "0";
        dialogBoxEl.style.transform = "translateY(-10px)";
      }, 500);
    }
  });

  // ensure section is in view and trigger typing
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // scroll to section to make bubble visible
        entry.target.scrollIntoView({ behavior: "smooth" });

        // small delay to let layout settle
        setTimeout(() => startTyping(), 300);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });

  const section = document.querySelector(sectionSelector);
  if (section) observer.observe(section);
})();

//BIO BOOK
// BOOK open/close (wrapper-based)
(function() {
  // find the first book-wrapper inside screen-4 (this matches your HTML)
  const wrapper = document.querySelector('#screen-4 .book-wrapper');
  if (!wrapper) return;

  // elements inside
  const closedImg = wrapper.querySelector('.closed-img');
  const openImg = wrapper.querySelector('.open-img');
  const pages = wrapper.querySelector('.book-pages');

  // guard
  if (!closedImg || !openImg || !pages) return;

  // click handler on wrapper (or closed image)
  wrapper.addEventListener('click', (e) => {
    // if already open, don't re-trigger / or you could toggle
    if (wrapper.classList.contains('open')) return;

    // add class to animate in CSS
    wrapper.classList.add('open');

    // optional:focus to pages for keyboard users
    setTimeout(() => {
      const firstPara = pages.querySelector('.page-left, .page');
      if (firstPara) firstPara.focus?.();
    }, 400);
  });

})();



