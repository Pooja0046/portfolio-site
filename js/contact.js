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


//email function
document.addEventListener("DOMContentLoaded", () => {
  const emailBtn = document.getElementById("email-btn");
  const status = document.querySelector(".copy-status");

  emailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("pkaur0046@gmail.com")
      .then(() => {
        status.textContent = "Copied!";
        setTimeout(() => (status.textContent = ""), 1500);
      })
      .catch(() => {
        status.textContent = "Failed to copy";
      });
  });
});


//CV stuff
document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".scroll-wrapper");

    wrapper.addEventListener("click", () => {
        wrapper.classList.toggle("open");
    });
});

//BACK TO TOP BUTTON
document.querySelectorAll('.cv-back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('#screen-11').scrollIntoView({ behavior: 'smooth' });
  });
});

