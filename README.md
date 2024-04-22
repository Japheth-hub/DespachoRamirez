# Sistema de envio de Notificaciones

Pasos a seguir para poder probar la aplicaicon en tu local
* Clonar o descargar repositorio
* Instalar dependencias "npm install"
* Crear la base de datos con postgresql
* Crear un .env en la carpeta "back" con las siguientes variables : 
    * DB_USER = Tu_nombre_de_usuario
    * DB_PASSWORD = Tu_password
    * DB_HOST = localhost
    * DB_DATABASE = Base_de_datos_que_acabas_de_crear
    * PORT = 3001
    * TEST = TRUE
* Crear un .env.local en la carpeta "client" con las siguientes variables : 
    * NEXT_PUBLIC_URL='http://localhost:3001/'

Una vez aplicados los siguientes pasos deberas posicionarte en la carpeta "back" abrir la consola y ejecutar el comando :
    * npm start
Deberas hacer lo mismo en la carpeta "client" y ejecutar el comando : 
    * npm run dev

Con estos pasos podras probar la aplicacion desde tu local.
![despacho](https://github.com/Japheth-hub/DespachoRamirez/assets/116044535/2ce41750-2166-4a8b-848e-355d95b93b7c)

Selecciona una de las categorias disponibles, y el sistema buscara en la base de datos a todos los usuarios que esten inscritos en esa categoria.
Escribe el mensaje que deseas enviar a los usuarios registrados en dicha categoria.
Una vez enviado el mensaje podras visualizar en el historial de registros a los usuarios que fueron notificados.
Ademas podras ver el canal por el cual se les envio la notificacion de forma individual.
