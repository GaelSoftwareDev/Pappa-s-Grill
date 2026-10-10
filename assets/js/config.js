/* ========================================================================== 
   Pappa's Grill Sabinas — Configuración central
   --------------------------------------------------------------------------
   Este archivo concentra TODOS los datos que probablemente cambien:
   nombre, dirección, teléfonos, WhatsApp, reseñas de Google, horarios,
   redes sociales y mensajes.

   IMPORTANTE:
   - La página funciona aunque algunas URLs estén vacías: esos botones se
     ocultan automáticamente (no enlazan a direcciones inventadas).
   - Los datos marcados como "pendiente de confirmar" son provisionales:
     provienen de directorios públicos y deben validarse con el propietario
     antes de publicarse como definitivos.
   ========================================================================== */

window.PAPPAS_CONFIG = {

  /* ------------------------------------------------------------------- 
     Negocio
  ------------------------------------------------------------------- */
  businessName: "Pappa's Grill",
  businessNameLong: "Pappa's Grill Sabinas",
  tagline: "Grill americano en Sabinas, Coahuila",
  city: "Sabinas, Coahuila",

  /* Dirección pública verificada en Google Maps / directorios. */
  address: {
    street: "Av. M. Abasolo y La Madrid 885",
    neighborhood: "Col. del Valle",
    city: "Sabinas",
    state: "Coahuila",
    postalCode: "26770",
    mapsSearchQuery: "Av. M. Abasolo y La Madrid 885, Col. del Valle, Sabinas, Coahuila, México"
  },

  /* ------------------------------------------------------------------- 
     Teléfonos
     - phone        : línea del establecimiento (tel:)
     - whatsapp     : número SOLO para WhatsApp / pedidos (wa.me)
     Ambos son datos públicos. Confírmalos con el propietario.
  ------------------------------------------------------------------- */
  phone: {
    display: "+52 861 612 8704",
    rawForTel: "+528616128704"
  },
  whatsapp: {
    display: "861 798 6927",
    numberForWaMe: "528617986927",
    /* Mensaje inicial para el pedido. Se codifica automáticamente. */
    defaultMessage: "¡Hola Pappa's Grill! Quiero hacer un pedido a domicilio."
  },

  /* ------------------------------------------------------------------- 
     Enlaces
     - reviewsUrl        : perfil/URL pública de reseñas de Google.
       PENDIENTE: reemplazar por el enlace oficial del Perfil de Empresa
       de Google del propietario (tab "Reseñas"). Mientras esté vacío,
       el botón "Leer reseñas en Google" no se muestra.
     - reviewSubmitUrl   : formulario directo "Escribir una reseña" en Google.
       PENDIENTE: el propietario lo obtiene en su Perfil de Empresa de Google
       (Botón "Pedir una reseña" → enlace corto). Si lo dejas vacío, se usa
       el enlace 'reviewsUrl' al construir el botón secundario.
     - mapsDirectionsUrl : "Cómo llegar". Se construye por defecto con una
       búsqueda de la dirección. Cambia aquí si el propietario comparte un
       enlace corto de Google Maps.
  ------------------------------------------------------------------- */
  links: {
    reviewsUrl: "",
    reviewSubmitUrl: "",
    mapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Av. M. Abasolo y La Madrid 885, Col. del Valle, Sabinas, Coahuila, México"),

    /* Verificado: página de Facebook visible en directorios públicos. */
    social: [
      {
        label: "Facebook",
        url: "https://www.facebook.com/377426792595877/"
      }
    ]
  },

  /* ------------------------------------------------------------------- 
     Horarios
     Verificado en directorios públicos con valores DISCREPANTES:
     - restaurants10.com: Lun–Jue 12:30–00:00, Vie–Sáb 12:30–01:00, Dom 12:30–24:00
     - restaurantguru.com: todos los días 12:30–23:00
     Por eso NO los mostramos como definitivos en la página. Ajusta este
     objeto con los horarios confirmados por el propietario.
     Formato: cada día con opening/closing en formato 24h ("12:30", "00:00").

     PENDIENTE DE CONFIRMACIÓN DEL PROPIETARIO.
  ------------------------------------------------------------------- */
  hours: {
    confirmed: false, // cambia a true cuando el propietario confirme
    note: "Horario sin confirmar. Consulta antes de publicar.",
    schedule: {
      "Lunes":     { opening: "12:30", closing: "00:00" },
      "Martes":    { opening: "12:30", closing: "00:00" },
      "Miércoles": { opening: "12:30", closing: "00:00" },
      "Jueves":    { opening: "12:30", closing: "00:00" },
      "Viernes":   { opening: "12:30", closing: "01:00" },
      "Sábado":    { opening: "12:30", closing: "01:00" },
      "Domingo":   { opening: "12:30", closing: "00:00" }
    }
  },

  /* ------------------------------------------------------------------- 
     Reseñas de Google — Dato provisional
     Fuente pública (restaurantguru, sept 2026): calificación 4.4 con 836
     votos. NO lo mostramos como cifra actual del negocio: necesita
     verificación con el propietario. El valor se muestra con una nota
     "provisional" y se puede ocultar con showBadge = false.
  ------------------------------------------------------------------- */
  reviews: {
    showBadge: false,        // pon en true solo cuando el propietario confirme la cifra
    ratingProvisional: 4.4,
    reviewCountProvisional: 836,
    note: "Dato provisional de terceros, pendiente de confirmar."
  }
};