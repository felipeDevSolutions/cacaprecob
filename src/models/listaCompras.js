class ListaCompras {
    constructor(id, usuarioId, itens, dataCriacao) {
      this.id = id;
      this.usuarioId = usuarioId;
      this.itens = itens; // Array de objetos { produtoId, quantidade }
      this.dataCriacao = dataCriacao || new Date();
    }
  
    toJSON() {
      return {
        usuarioId: this.usuarioId,
        itens: this.itens,
        dataCriacao: this.dataCriacao,
      };
    }
  }
  
  module.exports = ListaCompras;