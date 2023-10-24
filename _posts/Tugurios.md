---
title: "TUGURIOS: emulación de sueños y desarrollar un videojuego en solitario"
excerpt: "Todo lo que puede interesarte de mi primer videojuego"
coverImage: "/assets/blog/tugurios/cielorosa.png"
date: "2023-10-23T05:35:07.322Z"
author:
  name: Juampablo
  picture: "/assets/blog/authors/juan.jpg"
ogImage:
  url: "/assets/blog/tugurios/cielorosa.png"
---

Tenía meses queriendo desarrollar un videojuego y alguien me dijo haz algo chico y así nació Tugurios.

# I. ¿Por qué emular sueños?

corría diciembre de 2022, mientras decidía que hacer para mi primer videojuego me encontré con la corriente de los emuladores de sueños gracias a [este artículo de Astrid Budgor](https://reallifemag.com/a-warm-place/) donde habla de una corriente del videojuego alternativo que está centrado en brindar un espacio confortable para el jugador. Una serie de escenarios oníricos donde no hay mas objetivo que deambular en este mundo virtual; Sin armas, sin enemigos que derrotar.


A otras personas esto les podrá parecer aburridísimo, pero a mi no. Me obsesioné con el tema y jugué _“LSD dream emulator”_, encontré una comunidad online que se dedica a hacer un juego como este anualmente para homenajear el original y me propuse en tres meses desarrollar un emulador de sueños en mi estilo.

![cubo](/assets/blog/tugurios/IMG_1.GIF "Text to show on mouseover")

# II. ingenuidad

Llevaba meses programando mecánicas en Unity y entre esas estaba lo necesario para el juego que quería hacer: Una cámara en primera persona, movimiento, salto, terrenos y cambio de escena. No podía ser tan difícil, así que empecé a unir estas mecánicas y al poco tiempo me di cuenta que lo que me estaba faltando era lo que haría que mi juego se sintiera menos vacío, un sistema de audio; ahí empezaron los problemas.

![cubo](/assets/blog/tugurios/IMG_3.GIF "Text to show on mouseover")
# III. Dos, porqué no usé el sistema de audio de unity:

Mientras ponía varios de estos mundos en orden me confié que podría usar el audio de unity, pues aunque no lo había probado cuando leí el manual sonaba sencillo, pero a la hora de implementarlo no funcionaba como me gustaría, daba la sensación de que todo el audio venía del mismo lugar.

Mi principal ilusión de este proyecto era hacer yo mismo la música y los sonidos, pero para esto iba a tener que controlarlos en el mixer, sino iba a saturar las salidas de audio del juego.

# IV. FMOD salvó mi sistema de audio:

Así, luego de buscar en internet, leer foros, reddit, ver videos de youtube, encontré una tecnología llamada FMOD studio, un mixer que se encargaría de procesar el audio del juego y procesarlo como eventos de C# que luego podría engatillar y configurar de una manera más cómoda.

![cubo](/assets/blog/tugurios/IMG_2.GIF "Text to show on mouseover")
# V. Publicación.

Para cuando leas esta entrada Tugurios ya estará publicado y podrás jugarlo gratis desde el navegador en el siguiente [enlace](https://zamuroatomico.itch.io/tugurios).
