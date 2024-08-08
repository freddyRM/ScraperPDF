# Scrape PDF

Este proyecto es una aplicación web simple que permite extraer texto de archivos PDF y mostrarlo en una tabla. La tabla resultante puede ser copiada o exportada a un archivo Excel.

## Características

- Carga de archivos PDF.
- Extracción de texto desde PDF con opción de identificar líneas finales con una etiqueta personalizada.
- Presentación del texto extraído en una tabla con [DataTables](https://datatables.net/).
- Funciones de copia y exportación a Excel de la tabla generada.
- Soporte para múltiples páginas de un PDF.

## Requisitos

- Navegador moderno compatible con JavaScript y soporte para ES6 Modules.
- Conexión a internet para cargar las dependencias de [Bootstrap](https://getbootstrap.com/) y [DataTables](https://datatables.net/) desde CDNs.

## Uso

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio

2. **Abrir el archivo index.html en un navegador:**

- Simplemente abre el archivo index.html en tu navegador preferido.

3. **Subir un archivo PDF:**

- Utiliza el botón "Cargar archivo PDF" para seleccionar el PDF que deseas procesar.

4. **Opción de Etiqueta para el final de línea:**

- Puedes añadir una etiqueta personalizada que se utilizará para identificar el final de cada línea en el PDF (opcional).

5. **Extraer texto:**

- Haz clic en el botón "Extraer Texto a Tabla" para procesar el archivo y mostrar el contenido en una tabla.

6. **Copiar o exportar la tabla:**

- Utiliza los botones en la parte superior de la tabla para copiar el contenido o exportarlo a un archivo Excel.

## Dependencias

El proyecto utiliza las siguientes librerías y frameworks:

- Bootstrap 5 para estilos y componentes.
- DataTables para la manipulación de la tabla.
- jQuery para manipulación del DOM.
- PDF.js para procesar los archivos PDF.
- Personalización
- Puedes modificar el archivo CSS incorporado en la sección <style> del archivo index.html para cambiar el estilo de la aplicación según tus necesidades.

## Contribuciones
¡Las contribuciones son bienvenidas! Siéntete libre de hacer un fork del repositorio y enviar un pull request con mejoras o nuevas características.
