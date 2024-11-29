// Middleware para verificar o token de autenticação
const checkAuth = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).send('Unauthorized');
  }
};

// Rota protegida por autenticação (exemplo)
app.get('/perfil', checkAuth, (req, res) => {
  res.send(`Olá, ${req.user.email}`);
});