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