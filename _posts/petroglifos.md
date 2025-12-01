---
title: "Conociendo los petroglifos: desarrollando una experiencia VR para preservar el patrimonio en la Red de Museos de Atacama"
excerpt: "Mi experiencia creando y testeando un videojuego educativo en Meta Quest junto al museo interactivo de Atacama"
coverImage: "https://resourcesyacare.blob.core.windows.net/juampablo/itisb/juego_petroglifos.png"
date: "2023-11-15T08:45:00.000Z"
author:
  name: Juampablo
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/petroglifos/cover.png"
---

En 2024 tuve la oportunidad de desarrollar una experiencia VR para Meta Quest enfocada en la preservación del patrimonio arqueológico de la región de Atacama. El proyecto —desarrollado junto al Museo Interactivo y al ITISB— buscaba acercar los petroglifos a las comunidades a través de un videojuego educativo. Para mí, fue una mezcla desafiante de programación, investigación cultural y mucha prueba en terreno con equipos que nunca habían usado realidad virtual.

---

### I. De la idea al prototipo: mi acercamiento al diseño en VR

El proyecto comenzó con una meta clara: crear una experiencia donde cualquier persona, incluso sin conocimiento previo en tecnología, pudiera **tallar y pintar petroglifos** de forma intuitiva dentro del visor.

Mi primer prototipo era muy simple: permitir que los usuarios dibujaran directamente sobre una superficie con los controles de Meta Quest. Sin embargo, durante las primeras pruebas me di cuenta de que:

- **Los trazos parecían pixelados**.  
- La experiencia se sentía más como una app de dibujo que como una actividad vinculada al patrimonio.  

Ese fracaso inicial me ayudó a replantear el enfoque. Pensé: *“¿qué es lo más real que puedo recrear en VR sin perder accesibilidad?”* Y allí surgió la idea del **martillo y cincel virtual**, inspirada en el trabajo real de tallado.

Creé un sistema donde los petroglifos estaban divididos en fragmentos ocultos dentro de la roca. Cuando el jugador golpeaba con el martillo y el cincel, pequeñas partículas saltaban y revelaban gradualmente la figura.

Fue la primera vez que sentí: *“Ok, esto realmente se siente como tallar piedra.”*

![Prototipo en VR](https://resourcesyacare.blob.core.windows.net/juampablo/itisb/Screenshot%202024-07-08%20at%201.06.57%E2%80%AFPM.png "Prototipo en VR")

---

### II. Resolviendo la técnica: partículas, sonido y texturas vivas

Una vez definido el concepto, me enfoqué en hacerlo satisfactorio a nivel sensorial.

**Para el tallado:**
- Usé un sistema de partículas con gravedad para simular el polvo desprendiéndose.  
- Incorporé tres sonidos de impacto que rotan aleatoriamente para evitar repetición.  
- Ajusté la vibración háptica para que cada golpe se sintiera diferente.

**Para la pintura:**
- Implementé un sistema de raycasting que detecta la posición del pincel (un “hueso” inspirado en las herramientas diaguitas).  
- La textura de la piedra se va coloreando en tiempo real, igual que pintar sobre yeso.

Este fue uno de los puntos donde más aprendí de VR: pequeños detalles —una sombra, un sonido, un delay mínimo— cambian completamente la experiencia.

<!-- ![Tallado en acción](/assets/blog/petroglifos/tallar.gif "Golpeando piedra virtual") -->

---

### III. La parte más importante: testeo en terreno con el Museo Interactivo

Desarrollar VR es una cosa. Ver a las personas usarla por primera vez, otra totalmente distinta.

Durante tres viajes a terreno trabajé directamente con **encargados y encargadas de cultura** del Museo Interactivo y de la Red de Museos de Atacama. Mi rol fue doble:

1. **Instalar y configurar los Meta Quest**.  
2. **Enseñar a los equipos a usar el visor y a testear el videojuego con sus comunidades.**

Y aquí es donde todo lo que había programado se puso a prueba.

![Instruyendo](https://resourcesyacare.blob.core.windows.net/juampablo/itisb/instruyendo.jpg "Capacitación e instrucción")

---

### IV. Alto del Carmen, Tierra Amarilla y Copiapó: lo que aprendí en terreno

Cada comuna tenía una realidad distinta, pero todas compartían algo: era la primera vez que el museo y su personal trabajaban con VR. Las sesiones de testeo fueron clave para ajustar el juego.

- **Alto del Carmen:**  
  Aquí descubrí que debía mejorar el *teleport*. Varias personas se mareaban cuando la transición quedaba muy brusca, así que ajusté el "modo quieto".
-
![Guanacos 1](https://resourcesyacare.blob.core.windows.net/juampablo/itisb/guanacos.png "Guanacos")

- **Tierra Amarilla:**  
  El equipo del museo fue muy activo en dar feedback. Noté que el cilindro del martillo era muy pequeño para usuarios sin experiencia, así que hice una versión más grande y fácil de manipular.
-
![Guanacos 2](https://resourcesyacare.blob.core.windows.net/juampablo/itisb/guanacos2.png "Guanacos 2")

- **Copiapó:**  
  Probamos la experiencia con niños y adultos mayores. Fue donde comprobé que la mecánica de pintura generaba mucha conexión emocional. Varias personas comentaron que querían replicar los petroglifos en casa.

![GORE](https://resourcesyacare.blob.core.windows.net/juampablo/itisb/gore.jpg "Reunión con GORE")

![Capacitación en terreno](/assets/blog/petroglifos/Innauguracion.jpg "Ajustando headset en Tierra Amarilla")

---

### V. Resultados: más que un videojuego

Tras las sesiones con el museo, ajustes y optimización para Quest, logramos:

- **Que los equipos del museo aprendieran a operar los visores sin depender de soporte técnico.**  
- **Que las comunidades reconocieran los petroglifos** y entendieran mejor su origen gracias a la experiencia práctica.  
- **Que la experiencia se volviera parte del programa educativo de la Red de Museos de Atacama.**

Uno de mis mejores recuerdos es un mensaje del Museo Interactivo donde me enviaron fotos de niñas y niños recreando los petroglifos en arcilla después de usar la experiencia en VR. Ese tipo de impacto es difícil de medir en código, pero muy fácil de sentir en terreno.

<!-- ![Arte comunitario](/assets/blog/petroglifos/arcilla.jpg "Petroglifos de arcilla post-experiencia VR") -->

---

### VI. Reflexiones finales: desarrollar VR con sentido

Este proyecto me enseñó que:

- La realidad virtual no tiene que ser compleja para ser significativa.  
- Testear en terreno cambia completamente tus decisiones de diseño.  
- Cuando trabajas con patrimonio cultural, **cada mecánica importa** y debe respetar lo que representa.

Desarrollar este juego no fue solo hacer VR: fue un puente entre tecnología, cultura y educación. Y fue un honor construirlo junto al museo y las comunidades.

---

**Para museos o escuelas:** La experiencia está disponible dentro de la Red de Museos de Atacama.

![url](https://rmid.cl/wp-content/uploads/2023/12/logo-rmid.png "RMID")
