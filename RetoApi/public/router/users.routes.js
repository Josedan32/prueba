const {Router} = require('express')
const {check} = require('express-validator')
const router = Router();
const {allUsers,createUser,EditUser,DeleteUser,getOneUser} = require('../controller/usersController')
const {validationAll} = require('../middlewares/validationUser')


router.get('/',allUsers)//Ruta para obtener el usuario 
router.get('/:id',getOneUser)//Ruta para obtener el usuario 
router.post('/',
check("nombre","El nombre es obligatorio").not().isEmpty(),
check("nombre","El nombre tiene que ser String").isString(),
check("edad","la edad es obligatorio").not().isEmpty(),
check("edad","la edad tiene que ser entero").isNumeric(),
check("ciudadResidencia","La ciudad de recidencia es obligatoria").not().isEmpty(),
check("ciudadResidencia","La ciudad de recidencia tiene que ser tipo texto").isString(),
check("nombreUsuario","El nombre de usuario es obligatoria").not().isEmpty(),
check("nombreUsuario","El nombre de usuario tiene que ser tipo texto").isString(),
check("password","La contraseña es obligatoria").not().isEmpty(),
check("password","La contraseña tiene que ser String").isString(),
validationAll
,createUser)//Ruta de creacion de usuario
router.put('/:id',EditUser)//Ruta para editra el usuarioi
router.delete('/:id',DeleteUser)



module.exports = router