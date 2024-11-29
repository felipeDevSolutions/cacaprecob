const admin = require('firebase-admin');
const Usuario = require('../models/usuario');
const { db } = require('../firebaseConfig');
const { collection, addDoc, getDoc, doc } = require('firebase/firestore');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const cadastrar = async (req, res) => {
    const { email, password, nome, ...dadosAdicionais } = req.body; 
    try {

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userRecord = await admin.auth().createUser({
            email,
            password: hashedPassword, // Store the hashed password
            displayName: nome
        });


        const novoUsuario = new Usuario(userRecord.uid, nome, email, {password: hashedPassword, ...dadosAdicionais});

        const usuariosRef = db.collection("usuarios");
        await usuariosRef.doc(userRecord.uid).set(novoUsuario.toJSON());

        res.status(201).json({ message: 'Usuário criado com sucesso!', uid: userRecord.uid });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        let mensagemErro = 'Erro ao criar usuário';
        if (error.code === 'auth/email-already-exists') {
          mensagemErro = 'Email já cadastrado';
        }
        res.status(500).json({ error: mensagemErro });
    }
};




const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await admin.auth().getUserByEmail(email);
    
        // Get the user document from Firestore
        const usuarioDoc = await db.collection('usuarios').doc(user.uid).get(); // Use user.uid
        if (!usuarioDoc.exists) {
            return res.status(404).json({ error: "Usuário não encontrado no Firestore" });
        }
        const usuarioData = usuarioDoc.data();
        const hashedPasswordFromFirestore = usuarioData.password; // Get hashed password
    
    
        const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromFirestore); // Compare
    
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Senha incorreta' });
        }
    
        const customToken = await admin.auth().createCustomToken(user.uid);
        res.json({ token: customToken });

    } catch (error) {
      console.error('Erro ao fazer login:', error);
      let mensagemErro = 'Email ou senha inválidos';
      if (error.code === 'auth/user-not-found') {
        mensagemErro = 'Usuário não encontrado';
      }
      res.status(401).json({ error: mensagemErro });
  }
};


// Function to get user data by UID (if needed)
const getUsuarioById = async (uid) => {
  try {
      const usuarioRef = doc(db, "usuarios", uid);
      const usuarioDoc = await getDoc(usuarioRef);

      if (usuarioDoc.exists()) {
          return { id: usuarioDoc.id, ...usuarioDoc.data() };
      } else {
          return null; // User not found
      }

  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
  }
};


module.exports = { cadastrar, login, getUsuarioById };