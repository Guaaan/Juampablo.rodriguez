# ZamuroAtomico - Blog personal de Juampablo Rodríguez

> Este proyecto es el código fuente de mi blog personal, desplegado en Vercel: [juampablorodriguez-raak-git-master-guaaans-projects.vercel.app](https://juampablorodriguez-raak-git-master-guaaans-projects.vercel.app)

## Descripción

ZamuroAtomico es un blog personal donde comparto artículos, tutoriales, procesos creativos y experiencias sobre desarrollo de software, videojuegos, modelado 3D y más. El sitio está construido con **Next.js**, **TypeScript**, **Tailwind CSS** y utiliza archivos **Markdown** para gestionar los posts.

El proyecto está basado en el repositorio [blog-starter de Vercel](https://github.com/vercel/next.js/tree/canary/examples/blog-starter), adaptado y personalizado para mis necesidades.

## Tecnologías principales

- **Next.js**: Framework React para aplicaciones web modernas y generación estática.
- **TypeScript**: Tipado estático para mayor robustez y mantenibilidad.
- **Tailwind CSS**: Utilidades CSS para estilos rápidos y personalizables.
- **Markdown**: Los posts se escriben en formato Markdown y se almacenan en la carpeta `/_posts`.
- **remark** y **remark-html**: Procesan y convierten Markdown a HTML.
- **gray-matter**: Extrae metadatos (front matter) de los archivos Markdown.
- **Vercel**: Despliegue automático y hosting.

## Estructura del proyecto

- `/_posts`: Artículos y entradas del blog en formato Markdown.
- `/components`: Componentes reutilizables de React para la UI.
- `/pages`: Páginas principales del sitio (inicio, about, quien-soy, posts dinámicos).
- `/public/assets`: Imágenes y recursos multimedia usados en los posts y la web.
- `/styles`: Archivos CSS y módulos de estilos.
- `/lib`: Funciones utilitarias para manejo de posts y Markdown.
- `/interfaces`: Tipos TypeScript para posts y autores.

## Características

- **Blog estático**: Los posts se generan de forma estática para máxima velocidad y SEO.
- **Soporte para imágenes**: Cada post puede tener imágenes de portada y contenido.
- **Diseño responsivo y moderno**: Gracias a Tailwind CSS.
- **Página de autor**: Información sobre Juampablo Rodríguez.
- **Despliegue continuo**: Cada push en el repo se despliega automáticamente en Vercel.

## Cómo agregar un nuevo post

1. Crea un archivo Markdown en la carpeta `/_posts` siguiendo el formato de los ejemplos existentes.
2. Incluye los metadatos (front matter) al inicio del archivo:
   ```md
   ---
   title: "Título del post"
   excerpt: "Resumen breve"
   coverImage: "/ruta/a/imagen.jpg"
   date: "YYYY-MM-DD"
   author:
     name: Juampablo Rodríguez
     picture: "/ruta/a/foto.jpg"
   ogImage:
     url: "/ruta/a/imagen.jpg"
   ---
   Contenido en Markdown...
   ```
3. Al hacer push, el post aparecerá automáticamente en el blog tras el despliegue en Vercel.

## Instalación y desarrollo local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Guaaan/Juampablo.rodriguez.git
   cd Juampablo.rodriguez
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a [http://localhost:3000](http://localhost:3000) para ver el blog en local.

## Despliegue

El blog se despliega automáticamente en Vercel. Puedes hacer tu propio fork y conectar el repo a Vercel para tener tu versión online.

## Créditos y agradecimientos

- Basado en [blog-starter de Vercel](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).
- Personalizado y mantenido por Juampablo Rodríguez ([LinkedIn](https://www.linkedin.com/in/juampablorodriguez/)).

## Licencia

Este proyecto se distribuye bajo la licencia MIT.
