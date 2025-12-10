---
title: "Cómo hice mis tarjetas de presentación en Realidad Aumentada"
excerpt: "El proceso completo para crear tarjetas de presentación interactivas usando 8th Wall, modelos 3D y webAR."
coverImage: "/assets/blog/ar-cards/front.png"
date: "2025-11-10T10:12:00.000Z"
author:
  name: Juampablo Rodríguez
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/ar-cards/front.png"
---

# Cómo hice mis tarjetas de presentación en Realidad Aumentada

Este proyecto nació en el curso de **Artes Mediales de la Universidad Católica**, donde experimenté con **WebGL**, modelado 3D y **WebAR**. Siempre he creído que la web es un medio perfecto para experiencias creativas, y 8th Wall me permitió llevar esa idea directamente a mis tarjetas de presentación.

Quería que, al apuntar el teléfono a la tarjeta física, apareciera un **modelo 3D animado** que representara mi estilo y mi trabajo.  
Aquí explico el proceso completo.

---

## La idea: una tarjeta que se transforma en una mini-experiencia AR

Mi objetivo era crear una tarjeta simple, pero que se transformara digitalmente. Gracias al **image tracking de 8th Wall**, pude usar la propia tarjeta como marcador AR y desplegar modelos 3D sobre ella sin instalar apps adicionales.

En la carpeta del proyecto (`/assets/blog/ar-cards/`) usé tres imágenes:

- **front.png** — portada del artículo y *target principal*.  
- **back.png** — el reverso, usado como segundo marcador.  
- **tarjetas.png** — foto general de las tarjetas impresas.

---

## Las tarjetas físicas

### Cara frontal (target principal)
![Front — target](/assets/blog/ar-cards/front.png)

### Reverso
![Back — reverso](/assets/blog/ar-cards/back.png)

### Todas las tarjetas juntas
![Tarjetas — overview](/assets/blog/ar-cards/tarjetas.png)

---

## Vista del proyecto en 8th Wall

Aquí pueden ver una captura del viewport donde probé los modelos y el tracking:

![Viewport 8th Wall](https://resourcesyacare.blob.core.windows.net/juampablo/portfolio/ar-cards-in-viewport.png)

---

## Los modelos 3D y su inspiración

Quería una estética retro, así que tomé referencias visuales de **Windows 95** y las transformé en modelos low-poly: una mini-computadora y un globo que rota en el reverso.

**Parte frontal (computadora 3D)**
![Computadora](https://resourcesyacare.blob.core.windows.net/juampablo/portfolio/compu.png)

**Parte trasera (globo giratorio)**
![Globo](https://resourcesyacare.blob.core.windows.net/juampablo/portfolio/globo.png)

**Icono original que inspiró los modelos**
![Inspiración Windows 95](https://resourcesyacare.blob.core.windows.net/juampablo/portfolio/inspocompu.png)

---

## Integración en 8th Wall

Una vez diseñadas las tarjetas y los modelos, el flujo fue:

1. Subir `front.png` como *target* dentro del Image Target System.  
2. Importar mis modelos `.glb` y montarlos con JavaScript.  
3. Ajustar iluminación, escala y animaciones para que se sintieran “pegados” a la tarjeta.  
4. Probar en dispositivos reales y refinar el tracking.

8th Wall pedirá permisos de cámara y sensores como giroscopio, que son necesarios para el tracking en WebAR.

---

## Pruébalo tú mismo

Puedes probar la experiencia directamente desde tu móvil:

[👉 **https://8th.io/xjtgb**](https://8th.io/xjtgb)

(La app pedirá permisos de cámara y giroscopio — son completamente necesarios para que funcione WebAR).

Además, **puedes probar apuntando tu teléfono a las imágenes de este mismo artículo**.  
El target principal es **front.png**, que está visible en esta página.

---

## Resultado

Ver cómo la tarjeta impresa cobra vida con un modelo 3D animado fue increíble. El proyecto mezcla tres cosas que me encantan:

- WebGL  
- diseño y modelado 3D  
- WebAR directo desde el navegador  

Fue una forma de unir identidad visual, interacción digital y creatividad técnica.

---

## Lo que aprendí

- WebAR permite experiencias ricas sin que el usuario instale nada.  
- El image tracking de 8th Wall es preciso y fácil de configurar.  
- La web sigue siendo un medio poderoso para 3D, interacción y contenido artístico.

Mis próximos pasos: mejorar la interacción, añadir gestos táctiles y optimizar los modelos para una carga aún más rápida.

