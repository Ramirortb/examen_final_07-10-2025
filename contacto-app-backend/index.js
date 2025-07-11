const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const contactoRoutes = require('./routes/contacto');
const mensajeRoutes = require('./routes/mensaje');
const notificacionRoutes = require('./routes/notificacion');
const estudianteRoutes = require('./routes/estudiante');
const solicitudRoutes = require('./routes/solicitud');
const calendarioRoutes = require('./routes/calendario')
const mensajechatRoutes = require('./routes/mensajechat')
const permisosRoutes = require('./routes/permisos')
const admacademicaRoutes = require('./routes/admacademica')



const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/login', authRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/mensaje', mensajeRoutes);
app.use('/api/notificacion',notificacionRoutes);
app.use('/api/estudiante',estudianteRoutes);
app.use('/api/calendario',calendarioRoutes);
app.use('/api/mensajechat',mensajechatRoutes);
app.use('/api/permisos',permisosRoutes);
app.use('/api/admacademica',admacademicaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
