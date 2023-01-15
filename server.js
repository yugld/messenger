// server.js
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('*', express.static(path.join(__dirname, 'dist/index.html')));

app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
