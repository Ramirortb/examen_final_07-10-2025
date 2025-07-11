const express = require('express');
const router = express.Router();

let notificacion = [
  { id: 1, usuario_id: 'usuario ramiro', tipo: 'estudiante', titulo: 'desarrollo de software', mensaje: 'Hola amigos' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { usuario_id, tipo, titulo, mensaje } = req.body;

  if (!usuario_id || !tipo || !titulo || !mensaje) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevonotificacion = {
    id: notificacion.length + 1,
    usuario_id,
    tipo,
    titulo,
    mensaje,
    
  };

  notificacion.push(nuevonotificacion);
  //res.status(201).json({ ok: true, mensaje: 'Mensaje guardado correctamente' });
  res.status(201).json(nuevonotificacion);
});

router.get('/', (req, res) => {
  res.json(notificacion);
});

// Actualizar notificacion por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { usuario_id, tipo, titulo, mensaje } = req.body;

  const index = notificacion.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  notificacion[index].usuario_id = usuario_id;
  notificacion[index].tipo = tipo;
  notificacion[index].titulo= titulo;
  notificacion[index].mensaje = mensaje;
  res.json(notificacion[index]);
});

// Eliminar contacto por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = notificacion.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  const notificacionEliminado = notificacion.splice(index, 1);
  res.json(notificacionEliminado[0]);
});

module.exports = router;
