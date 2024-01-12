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
      .then(color => {
        console.log(color);
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        console.log(hexColor);

        // Set background color and include image
        res.status(200).send(`
          <html>
            <head>
              <style>
                body {
                  background-color: ${hexColor};
                }
              </style>
            </head>
            <body>
              <img src="${imageUrl}" alt="Image" width="300" height="200">
              <p>Background color is set to ${hexColor}.</p>
            </body>
          </html>
        `);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
      });

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
