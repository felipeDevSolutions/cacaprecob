// controllers/listaComprasController.js
const { db } = require('../firebaseConfig');
const ListaCompras = require('../models/listaCompras');

const criarListaCompras = async (req, res) => {
  try {
    const { usuarioId, itens } = req.body;
    const novaLista = new ListaCompras(null, usuarioId, itens); // ID será gerado pelo Firestore
    const docRef = await db.collection('listasCompras').add(novaLista.toJSON());
    res.status(201).json({ id: docRef.id, message: 'Lista de compras criada!' });
  } catch (error) {
    console.error('Erro ao criar lista de compras:', error);
    res.status(500).json({ error: 'Erro ao criar lista de compras' });
  }
};

const getListaCompras = async (req, res) => {
    const listaId = req.params.id;
    try {
        const docRef = db.collection('listasCompras').doc(listaId);
        const docSnap = await docRef.get();
        if(docSnap.exists()) {
            res.json({id: docSnap.id, ...docSnap.data()})
        } else {
            res.status(404).json({ error: "Lista de compras não encontrada" });
        }
    } catch (error) {
        console.error("Erro ao buscar lista de compras:", error);
        res.status(500).json({ error: "Erro ao buscar lista de compras" });
    }
}


module.exports = { criarListaCompras, getListaCompras };