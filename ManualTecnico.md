# Proyecto 1 - Grupo 12

## INTEGRANTES

|   Carne   |        Nombre Completo        |
| :-------: | :---------------------------: |
| 202010055 |      Derek Esquivel Díaz      |
| 202004804 | José Andrés Montenegro Santos |
| 202004724 |  Carlos Daniel Acabal Pérez   |
| 201403793 | Kevin Nicolas Garcia Martinez |

## Objetivos del Manual

## Arquitectura del proyecto.

## Diagrama Entidad Relación

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

### RDS

## Conclusiones

- Se determinó que crear un usuario con permisos exclusivamente par aun servicio
  permite que varios integrantes puedan controlar ese servicio sin poner en
  riesgo otros servicios o al usuario Root.
- Se determinó que existen servicios que requieren estar en una misma Región,
  AZ, o VPC para comunicarse.
