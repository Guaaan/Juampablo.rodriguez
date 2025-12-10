---
title: 'Recopilación Masiva de Datos en Portales de Venta'
excerpt: 'Cómo hice una app para comparar los precios de los medicamentos en Chile usando Python'
coverImage: '/assets/blog/dynamic-routing/cover.png'
date: '2021-08-10T05:35:07.322Z'
author:
  name: 
  picture: '/assets/blog/authors/juan.jpg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpeg'
---

Este proyecto incluye una **demo funcional del scrapper para Farmacias Ahumada**, cuyo código puedes revisar en GitHub:  
👉 **Repositorio:** https://github.com/Guaaan/scrapping-medicines

Esta demo muestra cómo realizar scraping a gran escala para obtener precios y datos de medicamentos en una farmacia específica.  
Si te interesa acceder al **scraper completo para todas las farmacias de Chile**, junto con una **API lista para producción**, puedes **contactarme directamente** y con gusto te comparto más información.

---

En este artículo, exploraremos un proyecto que utiliza Scrapy en Python para extraer datos de manera masiva de estos portales, almacenarlos en archivos JSON y, finalmente, cargarlos en una base de datos SQL Server.

## El Proyecto

Este proyecto se centra en recopilar información de portales de venta en línea, como tiendas de comercio electrónico o sitios de subastas, de manera masiva. A continuación, desglosaremos las principales etapas del proyecto y cómo utilizamos diferentes componentes tecnológicos para lograrlo.

### 1. Spiders

La primera parte de nuestro proyecto involucra la creación de spiders, que son scripts diseñados específicamente para extraer información de páginas web. En este caso, estos spiders se encargan de recopilar información de productos, como descripciones, precios, categorías y cualquier otro dato relevante. Utilizamos **Scrapy**, un potente framework de scraping en Python que nos permite definir fácilmente cómo deben recopilarse los datos desde las páginas web de destino.

### 2. Outputs

Una vez que nuestros spiders han recopilado la información necesaria, almacenamos estos datos en archivos JSON dentro de una carpeta llamada `"outputs"`. Los archivos JSON son una opción flexible para almacenar datos estructurados, ya que son fáciles de procesar, mantener y transportar. Esto permite realizar análisis posteriores o compartir los datos con otros sistemas de manera sencilla.

### 3. Store

La última fase del proyecto implica la inserción de los datos recopilados en los archivos JSON dentro de una base de datos SQL Server. Para lograr esto, utilizamos Python con la librería **PyODBC**, que nos permite conectarnos y manipular bases de datos SQL Server de manera eficiente. Creamos scripts que toman los datos desde la carpeta `"outputs"` y los insertan en tablas específicas dentro de la base de datos.

---

## Resumen

En este proyecto, hemos aprovechado la potencia de Python y Scrapy para extraer datos de manera masiva desde portales de venta en línea. Usamos archivos JSON para almacenar temporalmente esta información y luego la cargamos en SQL Server para análisis y uso posterior. Además, dejamos disponible una **demo del sistema de scraping para Farmacias Ahumada**, con posibilidad de obtener el **scraper completo con API** para todas las farmacias de Chile bajo contacto directo.
