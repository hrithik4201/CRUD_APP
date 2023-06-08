const express = require('express');
const router = express.Router();
const SATResults = require('./model.js');

// Create operation - Insert data
router.post('/', (req, res) => {
  const { name, address, city, country, pincode, satScore } = req.body;

  const passed = satScore > 30 ? 'Pass' : 'Fail';

  const newSATResult = new SATResults({
    name,
    address,
    city,
    country,
    pincode,
    satScore,
    passed,
  });

  newSATResult
    .save()
    .then(() =>
      res.json({ success: true, message: 'Data inserted successfully' })
    )
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

// Read operation - View all data in decreasing order of SAT scores with ranks
router.get('/', (req, res) => {
  SATResults.find()
    .sort({ satScore: -1 }) // Sort by SAT scores in descending order
    .then((results) => {
      // Assign ranks to the results
      const rankedResults = results.map((result, index) => ({
        ...result.toObject(),
        rank: index + 1,
      }));

      res.json(rankedResults);
    })
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

// Update operation - Update score by name
router.put('/name/:name', (req, res) => {
  const { name } = req.params;
  const { satScore } = req.body;

  const passed = satScore > 30 ? 'Pass' : 'Fail';

  SATResults.findOneAndUpdate({ name }, { satScore, passed }, { new: true })
    .then((result) => {
      if (result) {
        res.json({ success: true, message: 'Score updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Record not found' });
      }
    })
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

// Delete operation - Delete one record by name
router.delete('/name/:name', (req, res) => {
  const { name } = req.params;

  SATResults.findOneAndDelete({ name })
    .then((result) => {
      if (result) {
        res.json({ success: true, message: 'Record deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Record not found' });
      }
    })
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

// Get rank by name
router.get('/rank/:name', (req, res) => {
  const { name } = req.params;

  SATResults.findOne({ name })
    .sort({ satScore: -1 }) // Sort by SAT scores in descending order
    .then((result) => {
      if (result) {
        SATResults.countDocuments({ satScore: { $gt: result.satScore } })
          .then((count) => {
            const rank = count + 1;
            res.json({ rank });
          })
          .catch((err) =>
            res.status(400).json({ success: false, message: err.message })
          );
      } else {
        res.status(404).json({ success: false, message: 'Record not found' });
      }
    })
    .catch((err) =>
      res.status(400).json({ success: false, message: err.message })
    );
});

module.exports = router;
