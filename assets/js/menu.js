/* ==========================================================================
   Pappa's Grill Sabinas — Datos del menú
   --------------------------------------------------------------------------
   Estructura editable. Los datos del menú están SEPARADOS del HTML.

   CONVENCIÓN IMPORTANTE
   ---------------------
   Los productos actuales son PLACEHOLDERS basados únicamente en los tipos
   de platillo mencionados en fuentes públicas (hamburguesas, pizzas,
   ensaladas, tortas, alitas, boneless, hot dogs y botanas).

   NO inventamos precios ni ingredientes de la carta oficial:
   - `price`      → número en MXN. Pon `null` si aún no hay precio.
   - `priceNote`  → texto corto (p. ej. "Incluye refresco") solo si es real.
   - `image`      → ruta dentro de assets/images/menu/ o `null`.
                   Acepta JPG, PNG o WebP. Nombre sugerido: `slug.webp`.
   - `provisional`→ true = dato de ejemplo que DEBE sustituirse antes de
                   publicar. Se muestra un aviso junto al precio.
   - `description`→ no inventes ingredientes ni afirmaciones sobre alérgenos.
                   Con `null` se muestra "Descripción pendiente de la carta
                   oficial" y el plato aparece sin texto falso.
   --------------------------------------------------------------------------
   Cómo añadir un platillo real:
   1. Copia 2-3 líneas del formato de abajo.
   2. Cambia name/description/price con la carta oficial.
   3. Pon provisional en false (o elimina la propiedad).
   4. Guarda la foto en assets/images/menu/<slug>.jpg y añade la ruta.
   ========================================================================== */

window.PAPPAS_MENU = {
  /* Aviso global que se muestra bajo el título del menú. */
  disclaimer:
    "Menú provisional. Los platillos y precios de ejemplo deben sustituirse " +
    "por la carta oficial del restaurante.",

  categories: [
    {
      id: "hamburguesas",
      label: "Hamburguesas",
      icon: "🍔",
      items: [
        {
          id: "burger-clasica",
          name: "Hamburguesa clásica",
          description: null,
          price: 120,
          image: null,
          provisional: true
        },
        {
          id: "burger-bacon",
          name: "Hamburguesa con tocino",
          description: null,
          price: 145,
          image: null,
          provisional: true
        }
      ]
    },
    {
      id: "pizzas",
      label: "Pizzas",
      icon: "🍕",
      items: [
        {
          id: "pizza-pepperoni",
          name: "Pizza de pepperoni",
          description: null,
          price: 159,
          image: null,
          provisional: true
        },
        {
          id: "pizza-hawaiana",
          name: "Pizza hawaiana",
          description: null,
          price: 159,
          image: null,
          provisional: true
        }
      ]
    },
    {
      id: "botanas",
      label: "Botanas",
      icon: "🍟",
      items: [
        {
          id: "botana-alitas",
          name: "Alitas",
          description: null,
          price: 130,
          image: null,
          provisional: true
        },
        {
          id: "botana-boneless",
          name: "Boneless",
          description: null,
          price: 130,
          image: null,
          provisional: true
        }
      ]
    },
    {
      id: "hotdogs-tortas",
      label: "Hot dogs & tortas",
      icon: "🌭",
      items: [
        {
          id: "hotdog-pappa",
          name: "Hot dog",
          description: null,
          price: 65,
          image: null,
          provisional: true
        },
        {
          id: "torta-cubana",
          name: "Torta",
          description: null,
          price: 80,
          image: null,
          provisional: true
        }
      ]
    },
    {
      id: "ensaladas",
      label: "Ensaladas",
      icon: "🥗",
      items: [
        {
          id: "ensalada-mixta",
          name: "Ensalada mixta",
          description: null,
          price: 95,
          image: null,
          provisional: true
        },
        {
          id: "ensalada-cobb",
          name: "Ensalada del chef",
          description: null,
          price: 110,
          image: null,
          provisional: true
        }
      ]
    }
  ]
};