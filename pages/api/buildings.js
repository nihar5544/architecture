// Create an api/buildings.js file
import express from 'express';
import Building from '../models/Building';

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(201).json({success:'successss'});
});

router.post('/', async (req, res) => {
  try {
    const { name, address, image } = req.body;
    const newBuilding = new Building({ name, address, image });
    await newBuilding.save();
    res.status(201).json(newBuilding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement other CRUD endpoints (GET, PUT, DELETE)

export default router;
