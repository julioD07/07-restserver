const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema ({
    nombre : {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type:String ,
        required: [true, 'El Correo es obligatorio'],
        unique: [true,'Este usuario ya existe'],
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
    }, 
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true // false - Inactivo / true- Activo
    },
    google: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Usuario', UsuarioSchema)