const express = require('express');
const router = express.Router();

let calendario = [
  { id: 1, tipo_evento: 'Matriculas', fecha_inicio: '12/12/2025', fecha_fin: '30/12/2025'},
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { tipo_evento, fecha_inicio, fecha_fin } = req.body;

  if (!tipo_evento || !fecha_inicio || !fecha_fin ) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevocalendario = {
    id: calendario.length + 1,
    tipo_evento,
    fecha_inicio,
    fecha_fin,
        
  };

  calendario.push(nuevocalendario);
  //res.status(201).json({ ok: true, mensaje: 'Calendario guardado correctamente' });
  res.status(201).json(nuevocalendario);
});

router.get('/', (req, res) => {
  res.json(calendario);
});

// Actualizar calendario por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { tipo_evento, fecha_inicio, fecha_fin } = req.body;

  const index = calendario.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "notificacion no encontrado" });

  calendario[index].tipo_evento = tipo_evento;
  calendario[index].fecha_inicio = fecha_inicio;
  calendario[index].fecha_fin= fecha_fin;
  res.json(calendario[index]);
});

// Eliminar calendario por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = calendario.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "calendario no encontrado" });

  const calendarioEliminado = calendario.splice(index, 1);
  res.json(calendarioEliminado[0]);
});

module.exports = router;
