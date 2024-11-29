const { db } = require('../firebaseConfig');
const Supermercado = require('../models/supermercado');

const getSupermercados = async (req, res) => {
  try {
    const supermercadosRef = db.collection('supermercados');
    const snapshot = await supermercadosRef.get();
    const supermercados = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      supermercados.push(new Supermercado(doc.id, data.nome, data.cidade));
    });
    res.json(supermercados);
  } catch (error) {
    console.error('Erro ao buscar supermercados:', error);
    res.status(500).json({ error: 'Erro ao buscar supermercados' });
  }
};


module.exports = { getSupermercados };