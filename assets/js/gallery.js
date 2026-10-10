/* ==========================================================================
   Pappa's Grill Sabinas — Galería (administrada por archivos)
   --------------------------------------------------------------------------
   ¿CÓMO FUNCIONA?
   El navegador NO detecta solo los archivos de una carpeta estática. Por eso
   registramos cada fotografía en el "manifiesto" de abajo (única lista).
   Así, para añadir fotos solo tienes que:

     1. Copiar la imagen en  assets/images/gallery/
        (formatos: .jpg, .jpeg, .png o .webp — evita .gif y .bmp pesados).
     2. Añadir una entrada en GALLERY_PHOTOS, p. ej.:
          { src: "assets/images/gallery/parrilla.webp", alt: "Hamburguesa a la parrilla" }

   Nombres sugeridos: describe el contenido con slugs en minúscula,
   sin espacios ni acentos: "hamburguesa-clasica.webp".

   Consulta assets/images/gallery/README.md para más detalle.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------- MANIFIESTO (única lista) ------------------- */
  var GALLERY_PHOTOS = [];
  /* ---------------------------------------------------------------------- */

  var gridEl = document.getElementById("gallery-grid");
  var emptyEl = document.getElementById("gallery-empty");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lastFocused = null;

  function openLightbox(src, alt) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Fotografía de la galería";
    lightboxCaption.textContent = alt || "";
    lightbox.hidden = false;
    lightbox.classList.add("lightbox--open");
    document.body.classList.add("has-lightbox");
    lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    lightbox.classList.remove("lightbox--open");
    document.body.classList.remove("has-lightbox");
    lightboxImg.src = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = "";
    gridEl.hidden = false;
    emptyEl.hidden = true;

    if (!GALLERY_PHOTOS.length) {
      gridEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }

    GALLERY_PHOTOS.forEach(function (photo, index) {
      var figure = document.createElement("figure");
      figure.className = "gallery-item";
      figure.style.animationDelay = (index * 0.06) + "s";

      var img = document.createElement("img");
      img.src = photo.src;
      img.alt = photo.alt || "Fotografía del restaurante";
      img.loading = "lazy";
      img.decoding = "async";
      img.tabIndex = 0;
      img.setAttribute("role", "button");

      img.addEventListener("click", function () {
        openLightbox(photo.src, photo.alt);
      });
      img.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(photo.src, photo.alt);
        }
      });

      figure.appendChild(img);
      gridEl.appendChild(figure);
    });
  }

  function bindLightboxEvents() {
    if (!lightbox) return;

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox || event.target.classList.contains("lightbox__backdrop")) {
        closeLightbox();
      }
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderGrid();
    bindLightboxEvents();
  });

  window.PAPPAS_GALLERY = {
    render: renderGrid,
    manifest: GALLERY_PHOTOS
  };
})();