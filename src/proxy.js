const express = require('express');
const axios = require('axios');
const app = express();

app.get('/pokemon-image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`, {
      responseType: 'arraybuffer',
    });
    
    const data = Buffer.from(response.data, 'binary').toString('base64');
    const base64Image = `data:image/png;base64,${data}`;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(data, 'base64'));
  } catch (error) {
    console.error('Error fetching Pokemon image:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
