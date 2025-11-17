---
title: "Oh Tocar Guitarra: el inicio de un devlog"
excerpt: "Primeras ideas, pruebas técnicas y decisiones creativas detrás de mi nuevo videojuego musical"
coverImage: "https://resourcesyacare.blob.core.windows.net/juampablo/OTG/Screenshot%202025-11-05%20at%204.35.05%E2%80%AFPM.png"
date: "2024-11-08T05:35:07.322Z"
author:
  name: Juampablo
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/ohtocarguitarra/portada.png"
---

# I. Un viaje y una idea

Un día, mientras volvía de Santiago a Viña, me encontré jugando con la idea de un **ragdoll que caminara**. Imaginaba aplicar fuerzas físicas: el rigidbody de la cabeza subiendo, el de las piernas bajando. Entre esas pruebas mentales apareció una visión más potente:  
¿qué pasaría si este personaje **tocara guitarra en una habitación** y, con la fuerza de sus vibraciones, hiciera que las cosas alrededor **cayeran y rodaran por el suelo**?

# II. Física y ritmo

El primer desafío fue hacer que el movimiento del muñeco pareciera orgánico. No quería animaciones pregrabadas: quería **física pura**, caos controlado.  
Poco a poco el personaje comenzó a parecer un **Tamagochi musical**.

# III. Las herramientas

Para darle forma a esta idea me apoyé en tres pilares:  
- **Unity**, para la programación y físicas.  
- **Blender**, para modelar la habitación y los objetos que cobrarían vida con las vibraciones.  
- **Ableton**, para grabar guitarras y dar alma al proyecto.  

Desde el principio supe que la música no sería acompañamiento, sino **parte central de la mecánica**.

# IV. Los límites del navegador

Mi primer objetivo fue publicarlo en **WebGL**. Quería que cualquiera pudiera jugarlo desde el navegador.  
Pero el motor de físicas, con tantos colliders y cuerpos dinámicos, terminó siendo demasiado pesado. La simulación colapsaba.  
Tuve que aceptar una decisión importante: el juego debía nacer como **versión para PC y Mac**. Esto me dio más libertad y una mejor base para seguir iterando.

# V. Ritmo, feedback y drum machines

El siguiente paso fue vincular la guitarra con la percusión.  
Empecé con pistas simples, pero pronto me di cuenta de que necesitaba algo más dinámico: una **drum machine integrada** al juego, que respondiera al tiempo y a la energía del personaje.  
Fue el primer gran salto de esta idea experimental hacia algo jugable.

# VI. Primeras conclusiones

“Oh Tocar Guitarra” nació como un experimento entre física y música, pero rápidamente se transformó en algo más: un **laboratorio de sonido y movimiento**.  
Este primer acercamiento marcó la base técnica y conceptual sobre la que seguiré construyendo.

