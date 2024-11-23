  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User tidak ditemukan.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Password salah.' });

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Terjadi kesalahan.' });
  }
});

// Middleware untuk verifikasi token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Token diperlukan.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Token tidak valid.' });
  }
};

module.exports = { router, authenticate };
