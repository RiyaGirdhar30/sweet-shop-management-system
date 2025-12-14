const express = require('express');

const app = express();

// default route
app.get('/', (req, res) => {
  res.send('Sweet Shop API is running');
});

// handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
