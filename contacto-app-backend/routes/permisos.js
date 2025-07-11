const express = require('express');
const router = express.Router();

let permisos = [
  { id: 1, nombre_rol: 'Administrador', permisos: 'completos', fecha_expiracion: '12/12/2025', usado: 'si' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { nombre_rol, permisos, fecha_expiracion, usado } = req.body;

  if (!nombre_rol || !permisos || !fecha_expiracion || !usado) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevopermisos = {
    id: permisos.length + 1,
    nombre_rol,
    permisos,
    fecha_expiracion,
    usado,
    
    
  };

  permisos.push(nuevopermisos);
  //res.status(201).json({ ok: true, mensaje: 'Permisos guardado correctamente' });
  res.status(201).json(nuevopermisos);
});

router.get('/', (req, res) => {
  res.json(permisos);
});

// Actualizar permisos por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre_rol, permisos, fecha_expiracion, usado } = req.body;

  const index = permisos.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  permisos[index].nombre_rol = nombre_rol;
  permisos[index].permisos = permisos;
  permisos[index].fecha_expiracion= fecha_expiracion;
  permisos[index].usado = usado;
  
  res.json(permisos[index]);
});

// Eliminar permisos por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = permisos.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "permisos no encontrado" });

  const permisosEliminado = permisos.splice(index, 1);
  res.json(permisosEliminado[0]);
});

module.exports = router;