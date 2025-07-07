const express = require('express');
const cors = require('cors');
const path = require('path');
const client = require('./client');

const app = express();
const PORT = process.env.PORT || 3000;
const launchTime = Date.now();

app.use(cors());

// Serve index.html as root
app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API route for uptime + member count
app.get('/api/status', (req, res) => {
  const totalMembers = client.guilds.cache.reduce((acc, g) => acc + (g.memberCount || 0), 0);
  const uptime = Date.now() - launchTime;

  res.json({ memberCount: totalMembers, uptime });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
