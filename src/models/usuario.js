class Usuario {
  constructor(uid, nome, email, dadosAdicionais = {}) { 
    this.uid = uid;
    this.nome = nome;
    this.email = email;
    this.dadosAdicionais = dadosAdicionais;
  }

  toJSON() {
    return {
      uid: this.uid,
      nome: this.nome,
      email: this.email,
      ...this.dadosAdicionais
    };
  }
}

module.exports = Usuario;
