const express = require('express');
const router = express.Router();

let solicitud = [
  { id: 1, solicitud_id: 1, tipo_documento: 'titulo bachiller', nombre_archivo: 'contabilidad', url_archivo: 'http://usuario', fecha_carga: '23/05/2025' },
]; // Simulación de base de datos en memoria

router.post('/', (req, res) => {
  const { solicitud_id, tipo_documento, nombre_archivo, url_archivo, fecha_carga } = req.body;

  if (!solicitud_id || !tipo_documento || !nombre_archivo || !url_archivo || !fecha_carga ) {
    return res.status(400).json({ ok: false, mensaje: 'Todos los campos son requeridos' });
  }

  const nuevosolicitud= {
    id: solicitud.length + 1,
    solicitud_id,
    tipo_documento,
    nombre_archivo,
    url_archivo,
    fecha_carga,
        
  };

  solicitud.push(nuevosolicitud);
  //res.status(201).json({ ok: true, mensaje: 'solicitud guardado correctamente' });
  res.status(201).json(nuevosolicitud);
});

router.get('/', (req, res) => {
  res.json(solicitud);
});

// Actualizar soliocitud por ID
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { solicitud_id, tipo_documento, nombre_archivo, url_archivo, fecha_carga } = req.body;

  const index = solicitud.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "solicitud no encontrado" });

  estudiante[index].solicitud_id = solicitud_id;
  estudiante[index].tipo_documento = tipo_documento;
  estudiante[index].nombre_archivo= nombre_archivo;
  estudiante[index].url_archivo = url_archivo;
  estudiante[index].fecha_carga = fecha_carga;
  res.json(solicitud[index]);
});

// Eliminar solicitud por ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = solicitud.findIndex(m => m.id === id);
  if (index === -1) return res.status(404).json({ error: "solicitud no encontrado" });

  const solicitudEliminado = solicitud.splice(index, 1);
  res.json(solicitudEliminado[0]);
});

module.exports = router;
