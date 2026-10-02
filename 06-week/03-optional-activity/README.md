# Semana 6 - Entorno Ionic React

## Objetivo

Configurar el entorno de desarrollo con Node.js e Ionic CLI, crear un proyecto Ionic React y modificar la pantalla inicial.

## Herramientas utilizadas

- Node.js v24.20.0
- npm v11.19.0
- Ionic CLI v7.2.1
- Visual Studio Code

## Instalación del entorno

Primero se verificaron las versiones de Node.js y npm:

```bash
node -v
npm -v

Después se instaló Ionic CLI con:
npm install -g @ionic/cli

Se verificó la instalación con:
ionic -v

Se creó un proyecto Ionic React con:
ionic start miApp blank --type=react

Después se ingresó al proyecto:
cd miApp

Y se ejecutó con:
ionic serve

La aplicación se ejecutó correctamente en:
http://localhost:8100

Se modificó el archivo:
src/pages/Home.tsx

El título original se cambió por:
Horario Estudiantil

También se modificó:
src/components/ExploreContainer.tsx

para mostrar el mensaje:
Bienvenido a Horario Estudiantil
Organiza tus materias, horarios y notas desde tu celular.
