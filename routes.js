const express = require('express');
const fs = require('fs');

const router = express.Router();

// Route 1: GET request to the root endpoint ('/')
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Route 2: GET request to '/data' to read data from data.json
router.get('/data', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  res.json(data);
});

// Route 3: POST request to '/data' to write data to data.json
router.post('/data', express.json(), (req, res) => {
  const newData = req.body;
  const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  existingData.push(newData);

  fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
  res.json(existingData);
});

// Route 4: PUT request to '/data' to append data to data.json
router.put('/data', express.json(), (req, res) => {
  const newData = req.body;
  const existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));

  existingData.push(newData);

  fs.writeFileSync('data.json', JSON.stringify(existingData, null, 2));
  res.json(existingData);
});

// Route 5: DELETE request to '/data' to delete the JSON file
router.delete('/data', (req, res) => {
  fs.unlinkSync('data.json');
  res.send('Data file deleted');
});

// Route 6: API request to '/os-info' to read and append data to os-data.json
router.get('/os-info', (req, res) => {
    const osDataBefore = JSON.parse(fs.readFileSync('os-data.json', 'utf8'));
    console.log('OS Data Before:', osDataBefore);

    const osInfo = {
      os: require('os').type(),
      arch: require('os').arch(),
    };

    const existingOsData = JSON.parse(fs.readFileSync('os-data.json', 'utf8'));
    existingOsData.push(osInfo);
  
    fs.writeFileSync('os-data.json', JSON.stringify(existingOsData, null, 2));

    const osDataAfter = JSON.parse(fs.readFileSync('os-data.json', 'utf8'));
    console.log('OS Data After:', osDataAfter);
  
    res.json(osDataAfter);
  });

module.exports = router;