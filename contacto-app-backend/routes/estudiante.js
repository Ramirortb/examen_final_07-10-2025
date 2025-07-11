const express = require('express');
const router = express.Router();

let estudiante = [
  { id: 1, nombre_completo: 'usuario Nelson', correo: 'nelson@gmail.com', contraseña: '123456', tipo_usuario: 'Estudiante', fecha_registro: '23/05/2025', estado_cuenta: 'Activo' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { nombre_completo, correo, contraseña, tipo_usuario, fecha_registro, estado_cuenta } = req.body;

  if (!nombre_completo || !correo || !contraseña || !tipo_usuario || !fecha_registro || !estado_cuenta) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevoestudiante = {
    id: estudiante.length + 1,
    nombre_completo,
    correo,
    contraseña,
    tipo_usuario,
    fecha_registro,
    estado_cuenta,
    
  };

  estudiante.push(nuevoestudiante);
  //res.status(201).json({ ok: true, mensaje: 'Estudiante guardado correctamente' });
  res.status(201).json(nuevoestudiante);
});

router.get('/', (req, res) => {
  res.json(estudiante);
});

// Actualizar estudiante por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre_completo, correo, contraseña, tipo_usuario, fecha_registro, estado_cuenta } = req.body;

  const index = estudiante.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  estudiante[index].nombre_completo = nombre_completo;
  estudiante[index].correo = correo;
  estudiante[index].contraseña= contraseña;
  estudiante[index].tipo_usuario = tipo_usuario;
  estudiante[index].fecha_registro = fecha_registro;
  estudiante[index].estado_cuenta = estado_cuenta;
  res.json(estudiante[index]);
});

// Eliminar estudiante por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = estudiante.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "estudiante no encontrado" });

  const estudianteEliminado = estudiante.splice(index, 1);
  res.json(estudianteEliminado[0]);
});

module.exports = router;
