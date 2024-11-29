const { db } = require('./firebaseConfig');
const { collection, addDoc } = require("firebase/firestore");
const Produto = require('./models/produto');
const Supermercado = require('./models/supermercado');

const supermercados = [
  { nome: 'Mercado Central', cidade: 'Fortaleza' },
  { nome: 'Supermercado Boa Vista', cidade: 'Fortaleza' },
  { nome: 'Empório da Vila', cidade: 'Fortaleza' }
];

const categorias = {
  'Laticínios': ['Leite Integral', 'Queijo Minas', 'Requeijão Cremoso', 'Iogurte Natural', 'Manteiga', 'Queijo Prato', 'Coalhada', 'Iogurte Grego', 'Queijo Mussarela', 'Petit Suisse'],
  'Frios': ['Presunto', 'Mortadela', 'Salame', 'Salsicha', 'Linguiça Calabresa', 'Bacon', 'Queijo Provolone', 'Pernil', 'Salpicão', 'Patê'],
  'Hortifrúti': ['Alface', 'Tomate', 'Cebola', 'Batata', 'Cenoura', 'Chuchu', 'Abobrinha', 'Pepino', 'Couve', 'Brócolis'],
  'Bebidas': ['Coca-Cola', 'Guaraná', 'Suco de Laranja', 'Água Mineral', 'Cerveja', 'Refrigerante de Limão', 'Suco de Uva', 'Água Tônica', 'Refrigerante de Cola', 'Chopp'],
  'Limpeza': ['Detergente', 'Sabão em Pó', 'Amaciante', 'Álcool', 'Desinfetante', 'Lustra Móveis', 'Limpa Vidros', 'Desengordurante', 'Escova de Banheiro', 'Pano de chão'],
  'Higiene': ['Sabonete', 'Shampoo', 'Condicionador', 'Creme Dental', 'Desodorante', 'Papel Higiênico', 'Absorvente', 'Fralda', 'Lenço Umedecido', 'Cotonete'],
  'Doces': ['Chocolate', 'Bala', 'Biscoito', 'Bolo', 'Bombom', 'Geléia', 'Docinho', 'Marshmallow', 'Meringue', 'Torrone'],
  'Congelados': ['Pizza', 'Batata Frita', 'Espinafre', 'Hambúrguer', 'Frango Empanado', 'Sorvete', 'Milho', 'Ervilha', 'Arroz', 'Feijão']
};


const gerarProdutos = async (supermercadoId) => {
  const produtos = [];
  for (const categoria in categorias) {
    const categoriaProdutos = categorias[categoria];
    for (let i = 0; i < 10; i++) {
      const produtoNome = categoriaProdutos[i % categoriaProdutos.length];
      const imageUrl = `https://via.placeholder.com/150?text=${categoria} ${produtoNome}`;

      produtos.push(new Produto(null, produtoNome, parseFloat((Math.random() * 100).toFixed(2)), categoria, supermercadoId, imageUrl, "Descrição do produto"));
    }
  }
  return produtos;
};

const popularSupermercados = async () => {
  const supermercadosRef = collection(db, "supermercados");
  await Promise.all(supermercados.map(async (supermercadoData) => {
    await addDoc(supermercadosRef, supermercadoData);
  }));
};


const popularProdutos = async () => {
    const supermercadosSnap = await getDocs(collection(db, "supermercados"));
    const supermercados = supermercadosSnap.docs.map(doc => ({ id: doc.id }));

    await Promise.all(supermercados.map(async (supermercado) => {
        const produtos = await gerarProdutos(supermercado.id);
        const produtosRef = collection(db, "produtos");
        await Promise.all(produtos.map(async (produto) => {
          await addDoc(produtosRef, produto.toJSON()); //Salva como JSON
        }));
    }));
};

async function populateDatabase() {
  try {
    await popularSupermercados();
    await popularProdutos();
    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  }
}

populateDatabase();