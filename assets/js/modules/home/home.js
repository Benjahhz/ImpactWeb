const base = "http://localhost/ImpactPagina/impact_sistema/assets/images/";
const Imagenes = [
  {
    src: "/impulsa-2.webp",
  },
  {
    src: "/Imagina.gif",
  },
  {
    src: "/Impresiona.gif",
  },
];
$(function () {
  smoothScroll();
  acciones();
  toggleImageMain();
});

const acciones = () => {
  $(".container-menu").click(function () {
    $("body").toggleClass("menu-open");
    $("#nav-icon3").toggleClass("open");
    
  });
  $(".seccion-apasionados, .seccion-innovadores, .seccion-visionarios").click(function () {
    // attribute before to top 0
    $(this).toggleClass("--active");
    if ($(this).hasClass("--active")) {
      $(this).find(".seccion-nosotros__item__text").slideToggle();
    } else {
      $(this).find(".seccion-nosotros__item__text").css("display", "none");
    }
  });
};

const toggleImageMain = () => {
  const imagenContainer = $(".seccion-impact");
  imagenContainer.on("click", function () {
    // random number between 0 and 2
    let random = Math.floor(Math.random() * 3);
    let imagenActiva = $(".seccion-impact__image.--active");
    let count = $(imagenActiva).attr("data-img");
    while (random === parseInt(count)) {
      random = Math.floor(Math.random() * 3);
    }
    $(".seccion-impact__image.--active").removeClass("--active");
    $(`.seccion-impact__image[data-img="${random}"]`).addClass("--active");
  });
};

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
