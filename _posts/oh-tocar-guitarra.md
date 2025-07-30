---
title: "Oh tocar guitarra: un devlog sobre escalas, física y caos armónico"
excerpt: "Primer vistazo a un videojuego que une física, ragdolls y teoría musical para explorar las escalas modales de una forma interactiva."
coverImage: "/assets/blog/ohtocarguitarra/portada.png"
date: "2025-07-30T19:57:14.419389"
author:
  name: Juampablo
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/ohtocarguitarra/portada.png"
---

Volvía de Santiago a Viña del Mar cuando una idea medio absurda me atravesó la cabeza: ¿y si hacía un ragdoll que caminara aplicando fuerza entre la cabeza y las piernas, como si tirara de sí mismo? Y aún más raro: ¿y si este personaje tocaba guitarra en una habitación y su sonido hacía vibrar tanto las cosas que todo empezara a caer y rodar por el piso?

# I. Componer un videojuego

No era solo una idea mecánica, también estaba pasando por un momento musical. Llevaba meses haciendo un curso de composición, y justo estaba comprendiendo los modos de la escala mayor: dórico, frigio, lidio, etc. Todo hizo clic. Este juego no solo podía tener un componente físico interesante, sino también una función educativa y sensorial: visualizar y experimentar las escalas modales.

# II. Herramientas al servicio de la locura

Elegí Unity para el motor del juego, Blender para modelar el entorno y Ableton para grabar la guitarra. Quería que cada modo de la escala mayor tuviera su propia atmósfera: luz, color, comportamiento de los objetos en la habitación. Que todo en pantalla respondiera a la música de alguna manera.

# III. Física, WebGL y límites reales

Mi primer impulso fue publicarlo como juego WebGL, pero la cantidad de elementos físicos y colliders era tan alta que rápidamente se volvió inviable. La performance caía en picada. Decidí que esta experiencia debía estar pensada para PC y Mac, al menos en esta etapa.

También cambié la forma de reproducir ritmos: comencé usando pistas de batería pregrabadas, pero luego desarrollé una pequeña drum machine programada, más flexible e interactiva.

# IV. Una decisión clave: escalas con la misma tónica

Uno de los momentos más importantes del desarrollo fue cuando entendí que para realmente mostrar la diferencia entre los modos, tenía que mantener la misma tónica en todas las escalas. Eso me permitió que el cambio de atmósfera no fuera por el tono en sí, sino por el modo. Y ahí el juego empezó a tener sentido como herramienta sensorial para explorar música.

# V. Estado del proyecto

Este proyecto sigue en desarrollo, pero pronto lanzaré una beta para que puedas experimentar esta locura sonora y física por ti mismo. Será una forma de tocar guitarra, pero también de ver cómo la música puede sacudir un espacio.

