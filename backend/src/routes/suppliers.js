const express = require('express');
const prisma = require('../lib/prisma');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Apply JWT middleware to all routes
router.use(authenticateToken);

// GET /suppliers - List all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        products: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.json(suppliers);
  } catch (error) {
    console.error('Get suppliers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /suppliers - Add a new supplier
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!phone) {
      return res.status(400).json({ error: 'Phone is required' });
    }

    // Check if email already exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: { email }
    });

    if (existingSupplier) {
      return res.status(400).json({ error: 'Supplier with this email already exists' });
    }

    // Create supplier
    const supplier = await prisma.supplier.create({
      data: {
        name,
        email,
        phone,
        address: address || null
      },
      include: {
        products: true
      }
    });

    res.status(201).json(supplier);
  } catch (error) {
    console.error('Create supplier error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Supplier with this email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /suppliers/:id - Update a supplier
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    // Check if supplier exists
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id }
    });

    if (!existingSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    // Check if email is being changed and if it conflicts with another supplier
    if (email && email !== existingSupplier.email) {
      const emailExists = await prisma.supplier.findUnique({
        where: { email }
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Supplier with this email already exists' });
      }
    }

    // Update supplier
    const supplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(address !== undefined && { address: address || null })
      },
      include: {
        products: true
      }
    });

    res.json(supplier);
  } catch (error) {
    console.error('Update supplier error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Supplier with this email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

