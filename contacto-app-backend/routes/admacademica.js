const express = require('express');
const router = express.Router();

let admacademica = [
  { id: 1, nombre_programa: 'usuario Nelson', descripcion: 'nelson@gmail.com', nivel: '123456', duracion: 'admacademica', estado_activo: '23/05/2025' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { nombre_programa, descripcion, nivel, duracion, estado_activo } = req.body;

  if (!nombre_programa || !descripcion || !nivel || !duracion || !estado_activo) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevoadmacademica = {
    id: admacademica.length + 1,
    nombre_programa,
    descripcion,
    nivel,
    duracion,
    estado_activo,
    
  };

  admacademica.push(nuevoadmacademica);
  //res.status(201).json({ ok: true, mensaje: 'Admacademica guardado correctamente' });
  res.status(201).json(nuevoadmacademica);
});

router.get('/', (req, res) => {
  res.json(admacademica);
});

// Actualizar admacademica por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre_programa, descripcion, nivel, duracion, estado_activo } = req.body;

  const index = admacademica.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  admacademica[index].nombre_programa = nombre_programa;
  admacademica[index].descripcion = descripcion;
  admacademica[index].nivel= nivel;
  admacademica[index].duracion = duracion;
  admacademica[index].estado_activo = estado_activo;
  res.json(admacademica[index]);
});

// Eliminar admacademica por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = admacademica.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "admacademica no encontrado" });

  const admacademicaEliminado = admacademica.splice(index, 1);
  res.json(admacademicaEliminado[0]);
});

module.exports = router;