const { faker, fakerES_MX } = require('@faker-js/faker');
const { getCheckDigit, format } = require('rut.js')
const moment = require('moment')

let personas = [];


const numeroAleatorio = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const generarPersonas = (cantidad) => {
    for (let index = 0; index < cantidad; index++) {
        let numero = numeroAleatorio(1_000_000, 40_000_000);
        let dv = getCheckDigit(numero.toString());
        let sexo = faker.person.sex();
        let fechaNacimiento = faker.date.birthdate();

        let persona = {
            id: faker.string.uuid(),
            rut: format(`${numero}-${dv}`),
            nombre: faker.person.firstName(sexo),
            apellido: faker.person.lastName(),
            fecha_nacimiento: fechaNacimiento,
            ciudad: fakerES_MX.location.city(),
            sexo: sexo,
            edad: moment().diff(fechaNacimiento, 'years')
        }
        personas.push(persona)
    }
    console.log(personas);
}

generarPersonas(50)



const listarCiudades = () => {
    const ciudades = {};
    personas.forEach(persona => {
        let ciudad = persona.ciudad;

        if(!ciudades[ciudad]){
            ciudades[ciudad] = 1
        } else {
            ciudades[ciudad]++
        }
    })

    Object.keys(ciudades).forEach(ciudad => {
        console.log(`En la ciudad ${ciudad} viven ${ciudades[ciudad]} personas.`);
    })
}
listarCiudades();