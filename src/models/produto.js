class Produto {
    constructor(id, nome, preco, categoria, supermercado, imagem, descricao) {
      this.id = id;
      this.nome = nome;
      this.preco = preco;
      this.categoria = categoria;
      this.supermercado = supermercado;
      this.imagem = imagem;
      this.descricao = descricao;
    }
  }
  
  module.exports = Produto;