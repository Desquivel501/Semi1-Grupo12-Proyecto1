# Proyecto 1 - Grupo 12

## INTEGRANTES

|   Carne   |        Nombre Completo        |
| :-------: | :---------------------------: |
| 202010055 |      Derek Esquivel Díaz      |
| 202004804 | José Andrés Montenegro Santos |
| 202004724 |  Carlos Daniel Acabal Pérez   |
| 201403793 | Kevin Nicolas Garcia Martinez |

## Objetivos del Manual

- Dar a entender la arquitectura que se utilizó para crear la aplicación, a manera de brindar una idea a las personas acerca de la forma en la que funciona y las tecnologías que se utilizaron.

- Describir y dar a entender la forma en la que se encuentra organizada la información, a manera de facilitar algún tipo de mantenimiento a futuro o la implementación de nuevas funciones en la aplicación.

- Explicar de una forma clara la configuración de cada uno de los servicios en la nube utilizados en la arquitectura del proyecto, a manera de dar una idea de cual es el propósito de cada uno, así como de sus ventajas y limitaciones.

- Informar acerca de los usuarios IAM creados para la administración de cada uno de los servicios involucrados en la aplicacion, de forma que se pueda interactuar con cada uno de los servicios sin poner en peligro información importante de los demás servicios o del usuario root.

## Arquitectura del proyecto

Toda la aplicación será desplegada usando exclusivamente servicios en la nube. La primera caba de la aplicación será el Frontend, el cuál será desarrollado usando el maro de trabajo React, después de haber realizado la aplicación esta será almacenada haciendo uso de S3 (Amazon Simple Storage Service), el cual es un servicio de almacenamiento de objetos ofrecido en AWS. Este servicio también posee la opción para alojar un sitio web estático por lo cual ser hará uso de esta característica para alojar y presentar al usuario el sitio web creado.

![Arquitectura](./img/Arquitectura_1.png)

Posteriormente, la siguiente capa de la aplicación será la de backend, para manejar las peticiones que se hagan desde el frontend se utilizarán dos API's desarrolladas en Nodejs y en Python, estas API's estarán EC2 (Amazon Elastic Compute Cloud) el cual es un servicio con el que se pueden crear instancias de computadoras virtuales, por lo que cada API se encontrará en su propia instancia. Debido a esto se necesita una forma de distribuir el tráfico proveniente desde el Frontend hacia estas API's, para solucionar este problema se utilizará un balanceador de carga (igualmente de AWS) que se encargue de recibir el tráfico proveniente de el Frontend alojadon en S3 y lo distribuya ya sea a la API desarrollada en Python o a la desarrollada en NodeJS.

![Arquitectura](./img/Arquitectura_2.png)

Finalmente se encuentra la base de datos, para la base de datos se utilizará el servicio RDS (Amazon Relational Database Services) el cual, como indica su nombre, es un servicio de base de datos relacionales de Amazon en el cual se pueden desplegar bases de datos que sigan este esquema. El DBMS elegido es MySQL y a este se conectarán las API's para almacenar la información necesaria para la aplicación.

![Arquitectura](./img/Arquitectura_3.png)

Sin embargo, almacenar archivos multimedia resultaría muy costoso en términos de espacio (y precio) si se hace en la base de datos, por lo tanto se hará uso nuevamente de S3, en el cual se creará un bucket donde almacenar todos estos archivos y en la base de datos solamente se almacenará el enlace a estos recursos.
Debido a esta implementación, las API's también contarán con una conexión hacia S3 (aparte de la conexión hacia RDS).

![Arquitectura](./img/Arquitectura_4.png)

## Diagrama Entidad Relación

En el diagrama entidad relacion se puede observar que se creó una entidad **User** la cual será la encargada de almacenar los usuarios registrados en la base de datos y su información, así como su rol, el cual indicará si son usuarios comunes o administradores. La entidad **History** será la encargada de almacenar el historial de canciones reproducidas de todos los usuarios en la base de datos. Las entidades **Playlist** y **Playlist_detail** son las encargadas de almacenar la información de las listas de reproducción creadas por los usuarios y las canciones que pertenecen a estas canciones. La entidad **Favorites** se encarga de almacenar la canciones que los usuarios agregan a sus canciones favoritas. **Song** se encarga de almacenar las canciones registradas en la base de datos, **Artist** de almacenar los artistas y, finalmente, **Album** almacena la información de los albumes registrados.

![Relacional](./img/Relational_1.png)

## Usuarios IAM

Proceso para crear usuarios IAM

Creando un usuario IAM de ejemplo con el nombre "nuevo". ![IAM](./img/IAM3.png)

Configurando el tipo de contraseña de usuario. ![IAM](./img/IAM4.png)

Selección de permisos/políticas directamente. ![IAM](./img/IAM5.png)

### Administrador

En el caso del usuario Administrador tendrá el permiso "AdministratorAccess"
![IAM](./img/IAM1.png)

### Acceso Completo S3

Para el manejo de Buckets se crea un usuario con permisos "AmazonS3FullAccess"
![IAM](./img/IAM2.png)

## Servicios utilizados

### S3

Se configuró el nombre del Bucket, la región dónde reside y los dueños de los
objetos. ![S3](./img/S3_1.png)

Se permitió el acceso público al Bucket y se confirmó la decisión.
![S3](./img/S3_2.png)

Deshabilitamos el manejo de versiones de objetos del Bucket para no tener
variantes. ![S3](./img/S3_3.png)

El cifrado del Bucket se queda por defecto. ![S3](./img/S3_4.png)

Una vez creado el Bucket, se configura la política para el acceso a objetos del
Bucket. ![S3](./img/S3_policy.png)

Carpetas donde se almacenará la multimedia de SoundStream
![S3](./img/S3_final.png)

### EC2

Se configuró el nombre de la instancia EC2 como "python-server"
![EC2](./img/EP_1.png)

Se selección de SO Ubuntu 22.04 LTS ![EC2](./img/EP_2.png)

Selección del tipo de instancia para la capa gratuita. Se reutilizaron un par de
llaves para conectarse a la instancia. ![EC2](./img/EP_3.png)

Se seleccionó un grupo de segorudad existente [Ver aquí.](#grupos-de-seguridad)
![EC2](./img/EP_4.png)

Se configuró el almacenamiento con 8GB de tipo EBS ![EC2](./img/EP_5.png)

#### Grupos de seguridad

Se configuró el nombre del grupo de seguridad, la descripción es opcional
![VPC](./img/SG_1.png)

Se configuran las reglas de entrada. Específicamente HTTP, HTTPS, SSH y Custom
TCP en 3000 donde estará escuchando el servidor![VPC](./img/SG_2.png)

Se configura las reglas de salida a todos lados. ![VPC](./img/SG_3.png) Grupo de
seguridad creado. ![VPC](./img/SG_4.png)

### Load Balancer

Se configuró el nombre del balanceador, el tipo de esquema es Internet-facing
para que esté expuesto al internet y se seleccionó el tipo de subred que usará.
![LB](./img/LB_1.png) En el mapeo de red se seleccionó una VPC por defecto para
balanceadores de carga y tendrá acceso a 2 AZ cada una con su subred.
![LB](./img/LB_2.png)

Se seleccionó un grupo de segorudad existente [Ver aquí.](#grupos-de-seguridad)
![LB](./img/LB_3.png)

Se seleccionó un grupo objetivo existente [Ver aquí.](#grupos-de-seguridad)
![LB](./img/LB_4.png)

#### Grupo Objetivo

Se seleccionó el tipo de objetivo como ip para agregar IPs de las instancias EC2
![TargetGroup](./img/TG_3.png)

Configuramos el nombre, el tipo de IP y protocolo HTTP. También una VPC por
defecto. HTTP1 para enviar las solicitudes a los objetivos HTTP.
![TargetGroup](./img/TG_4.png)

Para que el balanceador verifique el estado del grupo deberá hacer una petición
HTTP a "/". ![TargetGroup](./img/TG_5.png)

Agregamos un objetivo ingresando su dirección IP y puerto.
![TargetGroup](./img/TG_1.png)

Monitoreo de objetivos configurados. ![TargetGroup](./img/TG_2.png)

## Conclusiones

- Se determinó que crear un usuario con permisos exclusivamente par aun servicio
  permite que varios integrantes puedan controlar ese servicio sin poner en
  riesgo otros servicios o al usuario Root.
- Se determinó que existen servicios que requieren estar en una misma Región,
  AZ, o VPC para comunicarse.
