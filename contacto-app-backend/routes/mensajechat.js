const express = require('express');
const router = express.Router();

let mensajechat = [
  { id: 1, remitente_id: 'usuario Nelson', destinatario_id: 'nelson@gmail.com', mensaje: 'nuevo mensaje' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { remitente_id, destinatario_id, mensaje } = req.body;

  if (!remitente_id || !destinatario_id || !mensaje ) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevomensajechat = {
    id: mensajechat.length + 1,
    remitente_id,
    destinatario_id,
    mensaje,
    
    
  };

  mensajechat.push(nuevomensajechat);
  //res.status(201).json({ ok: true, mensaje: 'Mensajechat guardado correctamente' });
  res.status(201).json(nuevomensajechat);
});

router.get('/', (req, res) => {
  res.json(mensajechat);
});

// Actualizar mensajechat por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { remitente_id, destinatario_id, mensaje } = req.body;

  const index = mensajechat.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  mensajechat[index].remitente_id = remitente_id;
  mensajechat[index].destinatario_id = destinatario_id;
  mensajechat[index].mensaje= mensaje;
  
  res.json(mensajechat[index]);
});

// Eliminar mensajechat por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = mensajechat.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "mensaje chat no encontrado" });

  const mensajechatEliminado = mensajechat.splice(index, 1);
  res.json(mensajechatEliminado[0]);
});

module.exports = router;