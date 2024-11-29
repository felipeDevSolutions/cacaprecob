const express = require('express');
const cors = require('cors');
const produtoRoutes = require('./routes/produtoRoutes');
const supermercadoRoutes = require('./routes/supermercadoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const admin = require('firebase-admin');



const app = express();
const port = 5000;

const corsOptions = {
  origin: [
    'http://localhost:3000', // URL do seu frontend local
    'https://cacaprecob.onrender.com' // URL do seu aplicativo web no Firebase
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Permite todos os métodos
  allowedHeaders: 'Content-Type,Authorization', // Permite cabeçalhos importantes
  credentials: true // Permite cookies e credenciais
};


app.use(cors());
app.use(express.json());

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/supermercados', supermercadoRoutes);
app.use('/produtos', produtoRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

