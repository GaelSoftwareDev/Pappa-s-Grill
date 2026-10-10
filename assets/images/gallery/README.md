# Galería de fotografías — Pappa's Grill Sabinas

Esta carpeta guarda las fotografías del restaurante que se muestran en la
sección "Galería" de la página.

> Importante: el navegador NO detecta automáticamente los archivos de esta
> carpeta. La galería depende de una lista (el "manifiesto") que se edita en
> un solo archivo: **`assets/js/gallery.js`**.

---

## Formatos admitidos

| Formato | Recomendado | Observaciones |
|---------|-------------|---------------|
| `.jpg` / `.jpeg` | ✅ | Ideal para fotos de comida (peso ligero) |
| `.webp` | ✅ | Mejor calidad/peso; preferido en móvil |
| `.png` | ⚠️ | Usar solo si necesitas transparencia (suele pesar más) |
| `.gif` / `.bmp` | ❌ | Evitar: pesados y con mala compresión |

**Tamaño sugerido por imagen:** entre 600 y 1600 px de ancho, comprimidas
(aprox. 100–300 KB cada una) para que la página cargue rápido en datos
móviles.

---

## Cómo se nombran las imágenes

Usa **slugs** descriptivos en minúsculas, sin espacios, sin acentos y sin
caracteres especiales. Separa palabras con guiones:

```text
ok
hamburguesa-clasica.webp
interior-del-restaurante.jpg
pizza-pepperoni.webp

no
Hamburguesa Clásica 1.JPG
IMG_20241006_1345221.jpg
foto 2 (final).png
```

Si una foto ya existe, **sobrescribe el archivo con el mismo nombre**: no
es necesario tocar el manifiesto.

---

## Cómo agregar una fotografía nueva (2 pasos)

1. **Copia el archivo** a esta carpeta (`assets/images/gallery/`).
2. **Registra la entrada** en el manifiesto de `assets/js/gallery.js`.

El manifiesto es la lista que empieza justo donde dice:

```js
var GALLERY_PHOTOS = [];
```

Cada fotografía se registra así (un objeto por imagen, separados por coma):

```js
var GALLERY_PHOTOS = [
  { src: "assets/images/gallery/hamburguesa-clasica.webp", alt: "Hamburguesa a la parrilla" },
  { src: "assets/images/gallery/interior-del-restaurante.jpg", alt: "Interior del restaurante" }
];
```

| Campo | Qué es | Ejemplo |
|-------|--------|---------|
| `src` | Ruta desde la **raíz del proyecto** hasta el archivo | `assets/images/gallery/pizza.webp` |
| `alt` | Texto alternativo (describe la foto para accesibilidad) | `"Pizza de pepperoni recién salida del horno"` |

Reglas del texto `alt`:
- Describe lo que se ve (nunca escribas frases como "foto de la hamburguesa").
- Ejemplo bueno: `"Hamburguesa con tocino y papas a la francesa en la mesa"`.
- Ejemplo a evitar: `"IMG_20241006.jpg"`.

**Añadir una foto = copiar el archivo + 1 línea en el manifiesto.**
No se modifica ni el HTML ni el CSS.

Si la lista queda vacía, la galería muestra un mensaje elegante
("La galería se está preparando") en lugar de romper o verse vacía.

---

## Cómo actualizar o eliminar imágenes

- **Sobrescribir:** reemplaza el archivo (mismo nombre). Nada que cambiar en código.
- **Quitar:** borra el archivo **y** elimina su línea del manifiesto.
- **Reordenar:** el manifiesto se muestra en el orden en que escribas las líneas.

---

## Recuento rápido

```text
assets/images/gallery/
├── README.md                  ← este archivo
├── hamburguesa-clasica.webp   ← tu fotografía (ejemplo)
├── interior-del-restaurante.jpg
└── ...

assets/js/gallery.js           ← único archivo donde se registran las fotos
```