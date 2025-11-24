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