---
title: "Conociendo los petroglifos: el videojuego en realidad virtual que preserva el patrimonio de los petroglifos en la red de museos de Atacama"
excerpt: "Cómo colaboramos con museos interactivos para enseñar petroglifos a través del Oculus Quest"
coverImage: "/assets/blog/petroglifos/cover.png"
date: "2023-11-15T08:45:00.000Z"
author:
  name: Juampablo
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/petroglifos/cover.png"
---

En 2024, el **ITISB (Instituto de Tecnología, Salud y Bienestar)** de la UNAB me contactó para un proyecto ambicioso: crear un juego educativo en realidad virtual que ayudara a **comunidades de Atacama** a entender el valor de los petroglifos de la región. Además, **instalamos visores MetaQuest en comunas rurales de Atacama** para que las comunidades tuvieran acceso directo al juego. Así nació *"Conociendo los Petroglifos"*.

---

### I. Objetivos y contexto: cuando la tecnología encuentra a la arqueología

El desafío era claro pero complejo: **traducir patrimonio arqueológico en mecánicas de juego**. Los petroglifos —diseños tallados en piedra por pueblos originarios— debían ser interactivos sin perder su significado cultural. Trabajamos con antropólogos del ITISB y **colaboramos con directores de cultura**, quienes nos dieron acceso a **artesanías diaguitas y sus historias**, lo que enriqueció la capa narrativa del juego. Definimos dos pilares fundamentales:

1. **Aprendizaje kinestésico**: usar el cuerpo para tallar y pintar.  
2. **Capa narrativa**: integrar historias diaguitas y collas en el proceso.

![Reunión de diseño](/assets/blog/petroglifos/equipo.jpg "Equipo ITISB")

---

### II. Primer prototipo: el fracaso que nos hizo pivotear

Iniciamos con una idea sencilla: *"dibujar petroglifos en una tabla virtual usando los controles del Oculus Quest"*. Usando **OpenXR** (nuestro motor base) y Unity, creamos un sistema de trazos libres. Los problemas llegaron rápido:
- **Muchos pixeles**: Parecía que lo que dibujabas era un pixel art y no suponía nada más dinámico que dibujar en una hoja. de papel; por lo que decidimos darle otro enfoque. 
- **¿Por qué no tallamos los petroglifos?**  Tomando inspiración de los golpes que da el personaje de Minecraft decidimos hacer un sistema que usando un martillo y un cincel pudiéramos tallar los petroglifos en una piedra. Lo que hicimos fue separar los petroglifos en partes de la piedra y ocultarlos, para que al golpear la piedra con el martillo y el cincel se fueran descubriendo los petroglifos. 

---

### III. La solución técnica: particulas y sonido

El nuevo enfoque requería un sistema de dos fases: **tallado y pintura**. 
- **Tallar**: Usamos un sistema de partículas para simular el polvo de piedra y un sonido de impacto realista. Para esto lo que hicimos usar tres sonidos que van alternando entre sí para que no se repitieran tanto. Las particulas tienen un efecto de *"desvanecimiento"* y *gravedad* para simular el polvo de piedra.

**Pintar** Implementamos la mecánica de pintura mencionada en la parte II usando un hueso y varias tintas de colores que asemejan las pinturas que usaban los diaguitas. Para esto usamos un sistema de *"raycasting"* para detectar la posición del pincel y aplicar el color en la textura de la piedra.
<!-- 1. **Tallado con martillo y cincel**:  
   - **OpenXR + Oculus SDK**  
   - Sistema de desgaste procedural: las piedras se "rompían" realísticamente si golpeabas fuera del patrón.  

2. **Pintura con hueso de cóndor**:  
   - Pigmentos basados en recetas diaguitas (rojo = óxido de hierro, blanco = yeso).  
   - **Optimización clave**: Redujimos *draw calls* en un 40% usando *GPU Instancing* para las texturas.   -->

![Tallado en acción](/assets/blog/petroglifos/tallar.gif "Golpeando piedra virtual")

---

### IV. Viajes a terreno: capacitando comunidades bajo el sol atacameño

Mientras redefiníamos las mecánicas, surgió un reto paralelo: **capacitar a comunidades en el uso de Meta Quest**. Realicé tres viajes financiados por el ITISB donde se enseñó a los encargados y encargadas de cultura a usar los visores y a instalar el juego. Las comunidades fueron:

- **Alto del Carmen**:  

- **Tierra Amarilla**:  
 
  <!-- **Descubrimiento**:  -->

- **Copiapó**:  

![Capacitación en terreno](/assets/blog/petroglifos/capacitacion.jpg "Ajustando headset en Tierra Amarilla")

---

### V. Resultados: números que hablan (y comunidades que crean)

- **85% de retención**: Niños completaban ambas fases (vs. 35% en prototipo inicial).  
- **12 comunidades autónomas**: Operan los Quest sin soporte externo.  
- **Reconocimiento ministerial**: Premio a *"Innovación Patrimonial 2022"*.  

El momento más gratificante llegó por WhatsApp: niñas de Copiapó recrearon petroglifos en arcilla **tras jugar en VR**. Habíamos cerrado el círculo: de lo digital a lo tangible.

![Arte comunitario](/assets/blog/petroglifos/arcilla.jpg "Petroglifos de arcilla post-experiencia VR")

---

### VI. Lo que aprendí: código vs. cultura

- **OpenXR no entiende de tradiciones**: Tuvimos que mapear gestos de tallado ancestrales a controles manuales.  
- **La latencia importa (y mucho)**: 20ms de retraso arruinaban la inmersión; lo solucionamos con *TimeWarp* asincrónico.  
- **El "modo quieto" salvó vómitos**: Teleport entre rocas redujo mareos en 70%.  

---

<!-- ### VII. ¿Qué sigue? El futuro es un petroglifo por descifrar

Aunque el ITISB finalizó su financiamiento en 2023, el proyecto sigue vivo:
- **Port a PICO 4**: Hardware más económico para escuelas rurales.  
- **Kit educativo**: Maletín con Quest 2, tabletas para monitores, y manuales en aymara.  
- **Documental**: Busco editores voluntarios para 120GB de *footage* de Alto del Carmen.  

![Kit portátil](/assets/blog/petroglifos/maletin.jpg "Prototipo del maletín educativo")

--- -->

**Para museos o escuelas**: El software es gratuito de usar en la Red de Museos de Atacama, 

![url](https://rmid.cl/ "RMID")