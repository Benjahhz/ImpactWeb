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
  var animation = bodymovin.loadAnimation({
    // animationData: { /* ... */ },
    container: document.getElementById("animation"), // required
    path: "./data.json", // required
    renderer: "svg", // required
    loop: true, // optional
    autoplay: true, // optional
    name: "Demo Animation", // optional
  });
  new Glider(document.querySelector(".glider"), {
    slidesToShow: 1,
    draggable: true,
    scrollLock: true,
    dots: ".dots",
    gap: "2rem",
    arrows: {
      prev: ".glider-prev",
      next: ".glider-next",
    },
  });
});

const acciones = () => {
  $(".container-menu").click(function () {
    $("body").toggleClass("menu-open");
    $("#nav-icon3").toggleClass("open");
  });
  $(".seccion-apasionados, .seccion-innovadores, .seccion-visionarios").click(
    function () {
      // attribute before to top 0
      $(this).toggleClass("--active");
    }
  );
  $(".seccion-formulario__form .btn-enviar").on("click", function (e) {
    e.preventDefault();
    if (
      $("#Nombre").val() === "" ||
      $("#Empresa").val() === "" ||
      $("#Email").val() === "" ||
      $("#Telefono").val() === "" ||
      $("#Requerimiento").val() === ""
    ) {
      Swal.fire({
        icon: "error",
        toast: true,
        title: "Validación",
        text: "Todos los campos son obligatorios",
        timer: 2500,
        position: "top-right",
        showConfirmButton: false,
      });
      // focus where is empty

      if ($("#Nombre").val() === "") {
        $("#Nombre").focus();
      }
      if ($("#Empresa").val() === "") {
        $("#Empresa").focus();
      }
      if ($("#Email").val() === "") {
        $("#Email").focus();
      }
      if ($("#Telefono").val() === "") {
        $("#Telefono").focus();
      }
      if ($("#Requerimiento").val() === "") {
        $("#Requerimiento").focus();
      }
    } else {
      enviarFormulario();
    }
  });
};

const toggleImageMain = () => {
  setInterval(() => {
    let random = Math.floor(Math.random() * 3);
    let imagenActiva = $(".seccion-impact__image.--active");
    let count = $(imagenActiva).attr("data-img");
    while (random === parseInt(count)) {
      random = Math.floor(Math.random() * 3);
    }
    $(".seccion-impact__image.--active").removeClass("--active");
    $(`.seccion-impact__image[data-img="${random}"]`).addClass("--active");
  }, 4000);
};

const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
};
const enviarFormulario = () => {
  let nombre = $("#Nombre").val();
  let empresa = $("#Empresa").val();
  let email = $("#Email").val();
  let telefono = $("#Telefono").val();
  let requerimiento = $("#Requerimiento").val();
  let data = {
    nombre,
    empresa,
    email,
    telefono,
    requerimiento,
  };
  Swal.fire({
    title: "Cargando...",
  });
  Swal.showLoading();
  $.ajax({
    url: "./application/controllers/mailController.php",
    type: "POST",
    data: data,
    success: (response) => {
      response = JSON.parse(response);
      if (response.sent === true) {
        $("#Nombre").val("");
        $("#Empresa").val("");
        $("#Email").val("");
        $("#Telefono").val("");
        $("#Requerimiento").val("");
        Swal.fire({
          imageUrl: "./assets/images/177-envelope-mail-send-outline.gif",
          imageWidth: 150,
          imageHeight: 150,
          title: "Se ha registrado correctamente",
          text: "Hemos enviado un mail de confirmación",
          timer: 2500,
        });
      } else if (response.sent === false) {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error",
          text: response.message,
          timer: 2500,
        });
      }
    },
  });
};
