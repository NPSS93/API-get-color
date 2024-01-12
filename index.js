const express = require('express');
const ColorThief = require('colorthief');
const app = express();
const port = 8080;
app.use(express.json());

app.get('/color', async (req, res) => {
  try {
    
    let id = req.query.id;
    
    let imageUrl = "https://lh5.googleusercontent.com/d/" + String(id);
    console.log(imageUrl);
    
     ColorThief.getColor(imageUrl)
     .then(color => 
       {
         console.log(color);
         const hexColor = rgbToHex(color[0], color[1], color[2]);
         console.log(hexColor);
         res.status(200).json(hexColor);
      })
    .catch(err => { console.log(err) })

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function rgbToHex(r, g, b) {
  var hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join("0") + hex;
}