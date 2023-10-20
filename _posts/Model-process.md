---
title: "Pasos para hacer un modelo 3D con esqueleto"
excerpt: "mi proceso para modelar y riggear un personaje 3D en blender"
coverImage: "/assets/blog/preview/cover.png"
date: "2022-03-16T05:35:07.322Z"
author:
  name: Juampablo Rodríguez
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/preview/cover.png"
---

## El siguiente Proceso es el más cómodo que he encontrado para modelar personajes en 3d sin excederse de tiemp ni poligonos en el intento.

El primer paso al abrir blender será tomar el cubo por defecto

![cubo](/assets/blog/preview/cubo.jpg "Text to show on mouseover")

Dividirlo por la mitad con command + R

![cubo](/assets/blog/preview/subdividido.jpg "Text to show on mouseover")

Eliminar los vertices del eje -x

![cubo](/assets/blog/preview/noverts.jpg "Text to show on mouseover")

y aplicar un modificador de mirror

![cubo](/assets/blog/preview/mirror.png "Text to show on mouseover")

Extruiremos y subdividiremos las caras del cubo para darle una forma humanoide

![cubo](/assets/blog/preview/cubeman.png "Text to show on mouseover")

Aplicaremos un subdivisor de superficie (surface modifier en seccion de modificadores) y empezaremos a marcar las UVs de nuestro personaje.

![cubo](/assets/blog/preview/smoothman.png "Text to show on mouseover")

Con nuestras UVs marcadas y detalles agregados solo queda aplicar un sombreado suave para que los vertices de nuestro modelo no se vean tan marcados

![cubo](/assets/blog/preview/marked.png "Text to show on mouseover")

Luego de aplicar nuestros modificadores quedaremos con algo similar a esto

![cubo](/assets/blog/preview/semi.png "Text to show on mouseover")

Un buen tip sería unir los vertices sobrantes por distancia para evitar duplicados; esto se hace con Command + M

Luego agregaremos los huesos del cuerpo y las extremidades y asignaremos cuanta fuerza tendrá en el modelo cada hueso usando weight paint

![cubo](/assets/blog/preview/bones.jpg "Text to show on mouseover")

Terminaremos con un resultado como el siguiente, capaz de correr en motores de videojuegos contando menos de 6.000 poligonos en total

![cubo](/assets/blog/preview/finished.jpg "Text to show on mouseover")
