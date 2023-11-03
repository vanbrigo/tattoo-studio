<div align=center>

# Proyecto de Backend
## Tattoo Studio

 Este es el backend del sistema de gestion de citas de un estudio de tatuaje. Este proyecto se realizó como parte del Bootcamp Full Stack Developer de Geekshubs Academy.

## Tecnologias Utilizadas

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)[![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)](https://stackoverflow.com/)[![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)[![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)[![TypeOrm](https://img.shields.io/badge/TypeOrm-%23C70D2C?style=for-the-badge&color=%23C70D2C)](https://typeorm.io/)[![ThunderClient](https://img.shields.io/badge/Thunder_Client-%237A1FA2?style=for-the-badge)](https://www.thunderclient.com/)
</div>

## Tabla de Contenidos
- 🧾[Diseño BBDD](#diseño-bbdd)
- ⚙️[Instalacion en local](#einstalacion-en-local)
- 🎯[Endpoints](#endpoints)
- 🛠️[Posibles Mejoras](#posibles-mejoras)
- 💻[Contacto](#contacto)

## Diseño BBDD
![Diseño BBDD](./src/images/diseño-base-datos.png)

## Instalacion en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ` $ Ejecutamos las migraciones `
5. ` $ npm run dev `


## Endpoints
<details>
<summary> Endpoints </summary>

- REGISTER

            POST http://localhost:6000/user/register
        body:
            {
                "name":"vanessa",
                "email":"vanessa@gmail.com",
                "password": "Vanessa9",
                "phone_number":"695185577"
            }
        
- LOGIN

            POST http://localhost:6000/user/login 
        body:
            {
                "email":"vanessa@gmail.com",
                "password":"Vanessa9"
            }

- UPDATE USER

            PUT http://localhost:6000/user/update 
        body:
            {
                "name":"Vanessa",
                "phone_number":"0034695184499"
            }

- CREATE PROFILE

            POST http://localhost:6000/user/profile 
        body:
            {
                "birthdate":"1995-01-09",
                "gender":"female",
                "address":"puerto la cruz"
            }

- UPDATE PROFILE

            PUT http://localhost:6000/user/profile 
        body:
            {
                "gender":"female",
                "address":"polo y peyrolon",
                "id":1
            }

- TAKE APPOINTMENT

            POST http://localhost:6000/user/newAppointment 
        body:
            {
                "appointment_available_id":6,
                "purpose":"tattoo"
            }

- CANCEL APPOINTMENT

            DELETE http://localhost:6000/user/cancelAppointment
        body:
            {
               "id":4
            }

- GET ALL APPOINTMENTS AS USER

            GET http://localhost:6000/user/myAppointments

- GET ALL APPOINTMENTS AVAILABLE

            GET http://localhost:6000/appointment_available/all

- CREATE APPOINTMENT AVAILABLE

            POST http://localhost:6000/appointment_available/new
        body:
            {
              "date":"2023-11-01",
              "time":"10:00",
              "tattoo_artist_id":4
            }

- UPDATE APPOINTMENT AVAILABLE

            PUT http://localhost:6000/appointment_available/update
        body:
            {
              "id":2,
              "date":"2023-09-24",
              "time":"10:00",
              "tattoo_artist_id":1,
              "is_available":false
            }

- DELETE APPOINTMENT AVAILABLE

            DELETE http://localhost:6000/appointment_available/delete
        body:
            {
              "id":7
            }

- GET ALL APPOINTMENT AVAILABLE AS TATTOO ARTIST

            GET http://llocalhost:6000/user/tattooArtist/appointments

- GET ALL APPOINTMENT TAKEN WITH TATTOO ARTIST(AS TATTO ARTIST)

            GET http://localhost:6000/user/tattooArtist/appointmentsTaken

- POST NEW PROJECT AS TATTOO ARTIST

            POST http://localhost:6000/user/tattooArtist/portfolio/new
        body:
            {
              "title":"My first tattoo",
              "image_url":"https://resizer.sevilla.abc.es/resizer/resizer.php?imagen=https://sevilla.abc.es/estilo/bulevarsur/wp-content/uploads/sites/14/2021/02/mini-tatuaje-twotattoo-p.jpg&nuevoancho=652"
            }

- DELETE PROJECT AS TATTOO ARTIST

            DELETE http://localhost:6000/user/tattooArtist/portfolio/delete
        body:
            {
              "id":1
            }

- MODIFY ROLE AS SUPER_ADMIN

            PUT http://localhost:6000/user/superAdmin/createNewTattooArtist
        body:
            {
              "id":5,
              "role":"tatto_artist"
            }

- DELETE USER AS SUPER_ADMIN

            DELETE http://localhost:6000/user/superAdmin/deleteUser
        body:
            {
              "id":1
            }
</details>

## Contacto

[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vanessabritogonzalez@gmail.com)[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vanessabritogonzalez/)

