const express = require('express');
const prisma = require('../lib/prisma');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/suppliers - Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        products: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/suppliers/:id - Get a single supplier
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await prisma.supplier.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });

    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    res.json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/suppliers - Create a new supplier
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
      },
    });

    res.status(201).json(supplier);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/suppliers/:id - Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required' });
    }

    const supplier = await prisma.supplier.update({
      where: { id },
      data: {
        name,
        email,
        phone,
      },
    });

    res.json(supplier);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    console.error('Error updating supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/suppliers/:id - Delete a supplier
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.supplier.delete({
      where: { id },
    });

    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    console.error('Error deleting supplier:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

