const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Add class to element when it is 50% visible
    if (entry.isIntersecting) {
        entry.target.classList.add("--active");
    } else {
        entry.target.classList.remove("--active");
    }

    
  });
},options);
const targets = document.querySelectorAll(".seccion-nosotros__item");
targets.forEach((target) => observer.observe(target));
