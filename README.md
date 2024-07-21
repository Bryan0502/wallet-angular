README

## Table of contents
* [Información General](#información-general)
* [Tecnologías](#tecnologías)
* [Configuración](#configuración)
* [Ejemplo de Uso](#ejemplo-de-uso)
* [Funcionalidades](#funcionalidades)
* [Estado](#estado)
* [Inspiración](#inspiración)
* [Contacto](#contacto)

## Información General
Este proyecto es una billetera digital básica utilizando Angular y Ionic.

## Tecnologías
Proyecto creado con:
* Angular core: 12
* Ionic Framework: 5
* Ionic CLI: 6

## Configuración
Antes de ejecutar los comandos para levantar el proyecto hay que tener instalado Nodejs
1. Si tiene nvm puede ejecutar este código:
```
nvm install 18.13
nvm use 18.13
```
2. Si no tiene nvm entonces debe instalar Nodejs versión 18.13 que es compatible con el proyecto.

Luego para levantar el proyecto, hay que instalarlo localmente usando npm:
```
cd ../wallet-angular
npm install
set NODE_OPTIONS=--openssl-legacy-provider
ng serve
```
Se usa el comando set NODE_OPTIONS=--openssl-legacy-provider para que el Nodejs pueda usar el antiguo proveedor de OpenSSL ya que las nuevas versiones no son compatibles con la configuración del proyecto.
<br>
Si se usa otro sistemas operativo que no es Windows como macOS o Linux, entonces se cambia el comando set NODE_OPTIONS=--openssl-legacy-provider por export NODE_OPTIONS=--openssl-legacy-provider

## Ejemplo de Uso
Un flujo funcional de la aplicación sería:

1. Iniciar sesión con las credenciales:
```
email: bryanfront@gmail.com
contraseña: contrapro
```
2. Ver tus cuentas en la pestaña de cuentas.
3. Realizar una transferencia entre tus cuentas.
4. Ver tu historial de transacción para ver tu último movimiento.

## Funcionalidades
Lista de funcionalidades activas:
* Inicio de Sesión
* Listado de Cuentas
* Transferencia de dinero entre cuentas
* Listado de Historial de Transferencias

Lista TODOs para desarrollo futuro:
* Agregar reglas de seguridad en el firebase y medidas de seguridad en la aplicación
* Implementar Capacitor para generar el apk y probar el app como aplicación móvil

## Estado
El proyecto está: _terminado_

## Inspiración
Este proyecto usa inspiración en la distribución de colores del App de Banco General. Descubrí que el background del ion-content, el background de las cards y el background del ion-tab-bar eran diferentes. Esto para dar una mejor experiencia visual al usuario.
La distribución de contenido en la pantalla fue parte del anexo que se agregó al reto y otra parte mía que agregué todos los cuadros con border radius en las ion-card.

## Contacto
Creado por [@Bryan0502](https://github.com/Bryan0502) - no dudes en contactarme.
```