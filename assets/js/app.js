/* ==========================================================================
   Pappa's Grill Sabinas — Lógica principal
   --------------------------------------------------------------------------
   Depende de: config.js (datos del negocio) y menu.js (carta).
   Responsabilidades: nav móvil, menú por categorías, enlaces de contacto
   (WhatsApp / teléfono / Maps / reseñas), pie de página y horarios.
   ========================================================================== */

(function () {
  "use strict";

  var CONFIG = window.PAPPAS_CONFIG;
  var MENU = window.PAPPAS_MENU;
  var activeCategoryId = null;

  /* ----------------------------- Utilidades ---------------------------- */

  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function formatPriceMXN(value) {
    if (value == null || value === "") return null;
    return "$" + Number(value).toLocaleString("es-MX");
  }

  function buildWhatsAppUrl(message) {
    return (
      "https://wa.me/" +
      CONFIG.whatsapp.numberForWaMe +
      "?text=" +
      encodeURIComponent(message)
    );
  }

  function setLinkOrHide(linkEl, url, fallbackUrl) {
    if (!linkEl) return;
    var finalUrl = url || fallbackUrl || "";
    if (!finalUrl) {
      linkEl.hidden = true;
      return;
    }
    linkEl.href = finalUrl;
    linkEl.classList.remove("is-disabled");
  }

  /* ------------------------- Negocio / contacto ------------------------ */

  function applyBusinessData() {
    var brandName = $("#brand-name");
    if (brandName) brandName.textContent = CONFIG.businessName;

    var heroTitle = $("#hero-title");
    if (heroTitle) heroTitle.textContent = CONFIG.businessNameLong;

    document.title = CONFIG.businessNameLong + " | Menú digital";
    var metaDesc = $('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        CONFIG.businessNameLong +
          ". Menú digital: " +
          CONFIG.tagline.toLowerCase() +
          ". Pide por WhatsApp y conoce nuestra ubicación."
      );
    }

    /* Botones de WhatsApp (enlaces wa.me con mensaje codificado) */
    var waUrl = buildWhatsAppUrl(CONFIG.whatsapp.defaultMessage);
    document.querySelectorAll("[data-whatsapp]").forEach(function (link) {
      link.href = waUrl;
    });

    /* Teléfono del establecimiento */
    document.querySelectorAll("[data-tel]").forEach(function (link) {
      link.href = "tel:" + CONFIG.phone.rawForTel;
      link.setAttribute("aria-label", "Llamar a " + CONFIG.phone.display);
    });

    /* Texto visible de teléfono/WhatsApp */
    document.querySelectorAll("[data-phone-display]").forEach(function (el) {
      el.textContent = CONFIG.phone.display;
    });
    document.querySelectorAll("[data-whatsapp-display]").forEach(function (el) {
      el.textContent = CONFIG.whatsapp.display;
    });

    /* Dirección */
    var addr = CONFIG.address;
    var addrEl = $("#location-address");
    if (addrEl) {
      addrEl.textContent =
        addr.street + ", " + addr.neighborhood + ". " + addr.city + ", " + addr.state + ".";
    }

    /* "Cómo llegar" → Google Maps con búsqueda de la dirección */
    setLinkOrHide($("#maps-directions"), CONFIG.links.mapsDirectionsUrl);
    setLinkOrHide($("#maps-embed-link"), CONFIG.links.mapsDirectionsUrl);

    /* Aviso del menú (carta provisional) */
    var disclaimerEl = $("#menu-disclaimer");
    if (disclaimerEl && MENU && MENU.disclaimer) {
      disclaimerEl.textContent = MENU.disclaimer;
    }

    /* Redes sociales verificadas */
    var socialList = $("#social-links");
    if (socialList) {
      socialList.innerHTML = "";
      CONFIG.links.social.forEach(function (item) {
        var a = document.createElement("a");
        a.href = item.url;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.className = "social-link button button--ghost button--small";
        a.textContent = item.label;
        socialList.appendChild(a);
      });
    }
  }

  /* ----------------------------- Reseñas ------------------------------- */

  function applyReviews() {
    var links = CONFIG.links;

    var primary = $("#review-primary");
    if (primary) {
      if (links.reviewsUrl) {
        primary.href = links.reviewsUrl;
      } else {
        primary.hidden = true;
      }
    }

    var secondary = $("#review-secondary");
    if (secondary) {
      var url = links.reviewSubmitUrl || links.reviewsUrl;
      if (url) {
        secondary.href = url;
      } else {
        secondary.hidden = true;
      }
    }

    var badge = $("#review-badge");
    if (badge) {
      if (CONFIG.reviews.showBadge && CONFIG.links.reviewsUrl) {
        badge.hidden = false;
        $("#badge-rating").textContent = CONFIG.reviews.ratingProvisional.toFixed(1);
        $("#badge-count").textContent =
          "· " + CONFIG.reviews.reviewCountProvisional + " reseñas (dato provisional)";
      } else {
        badge.hidden = true;
      }
    }
  }

  /* ------------------------------- Menú -------------------------------- */

  function renderCategoryTabs() {
    var nav = $("#category-tabs");
    if (!nav) return;

    nav.innerHTML = "";
    MENU.categories.forEach(function (category, index) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-tab";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", "false");
      btn.setAttribute("aria-controls", "menu-items");
      btn.style.animationDelay = index * 0.05 + "s";
      btn.innerHTML =
        '<span class="category-tab__icon" aria-hidden="true">' +
        (category.icon || "") +
        "</span>" +
        "<span class=\"category-tab__label\">" + category.label + "</span>";

      btn.dataset.categoryId = category.id;

      btn.addEventListener("click", function () {
        selectCategory(category.id);
      });

      nav.appendChild(btn);
    });
  }

  function selectCategory(categoryId) {
    activeCategoryId = categoryId;
    var category = MENU.categories.find(function (item) {
      return item.id === categoryId;
    });
    if (!category) return;

    /* Estado visual de las pestañas */
    document.querySelectorAll(".category-tab").forEach(function (tab) {
      var isActive = tab.dataset.categoryId === categoryId;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    renderItems(category);
  }

  function placeholderMarkup(name) {
    return (
      '<div class="placeholder" role="img" aria-label="Fotografía pendiente de ' + name + '">' +
      '<span class="placeholder__icon" aria-hidden="true">✦</span>' +
      '<span class="placeholder__text">Foto pendiente</span>' +
      "</div>"
    );
  }

  function renderItems(category) {
    var container = $("#menu-items");
    if (!container) return;

    container.innerHTML = "";

    category.items.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "dish-card";

      var media = item.image
        ? '<img class="dish-card__img" src="' + item.image + '" alt="' + item.name + '" loading="lazy" decoding="async">'
        : placeholderMarkup(item.name);

      var priceHtml = "";
      var price = formatPriceMXN(item.price);
      if (price) {
        priceHtml =
          '<div class="dish-card__price">' +
          price +
          "<small> MXN</small>" +
          (item.provisional ? '<span class="dish-card__tag">ejemplo</span>' : "") +
          "</div>";
      } else {
        priceHtml =
          '<div class="dish-card__price dish-card__price--pending">Precio por confirmar</div>';
      }

      var description = item.description
        ? "<p class=\"dish-card__desc\">" + item.description + "</p>"
        : '<p class="dish-card__desc dish-card__desc--pending">Descripción pendiente de la carta oficial</p>';

      card.innerHTML =
        '<div class="dish-card__media">' + media + "</div>" +
        '<div class="dish-card__body">' +
        "<h3 class=\"dish-card__name\">" + item.name + "</h3>" +
        description +
        priceHtml +
        "</div>";

      container.appendChild(card);
    });
  }

  /* ----------------------------- Nav móvil ----------------------------- */

  function setupMobileNav() {
    var toggle = $("#nav-toggle");
    var menu = $("#nav-menu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setupHeaderScroll() {
    var header = $(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------- Horarios / footer ----------------------- */

  function applyHours() {
    var hoursBlock = $("#hours-block");
    if (!hoursBlock) return;

    hoursBlock.innerHTML = "";

    if (CONFIG.hours.confirmed) {
      Object.keys(CONFIG.hours.schedule).forEach(function (day) {
        var item = CONFIG.hours.schedule[day];
        var row = document.createElement("div");
        row.className = "hours-row";
        row.innerHTML =
          "<span>" + day + "</span>" +
          "<span>" + item.opening + " – " + item.closing + "</span>";
        hoursBlock.appendChild(row);
      });
    } else {
      var note = document.createElement("p");
      note.className = "hours-note";
      note.textContent =
        "Horario en proceso de confirmación. " + CONFIG.hours.note;
      hoursBlock.appendChild(note);

      var openSince = $("#hours-open-since");
      if (openSince) {
        openSince.textContent = "Abierto a partir de las 12:30 (datos por confirmar)";
      }
    }
  }

  function applyFooter() {
    var yearEl = $("#footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var footerName = $("#footer-name");
    if (footerName) footerName.textContent = CONFIG.businessNameLong;

    var footerAddress = $("#footer-address");
    if (footerAddress) {
      footerAddress.textContent =
        CONFIG.address.street + ", Col. del Valle. " + CONFIG.address.city + ", " + CONFIG.address.state + ".";
    }

    setLinkOrHide($("#footer-maps"), CONFIG.links.mapsDirectionsUrl);
  }

  /* ------------------------------- Init -------------------------------- */

  document.addEventListener("DOMContentLoaded", function () {
    applyBusinessData();
    applyReviews();
    applyHours();
    applyFooter();
    setupMobileNav();
    setupHeaderScroll();

    renderCategoryTabs();
    if (MENU.categories.length) {
      selectCategory(MENU.categories[0].id);
    }
  });
})();