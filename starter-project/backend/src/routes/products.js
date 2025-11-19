const express = require('express');
const prisma = require('../lib/prisma');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/search?q=query - Search products
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.json([]);
    }

    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ],
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get a single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        supplier: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products - Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, supplierId, imagePath } = req.body;

    if (!name || !description || price === undefined || !supplierId) {
      return res.status(400).json({ 
        error: 'Name, description, price, and supplierId are required' 
      });
    }

    // Verify supplier exists
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        supplierId,
        imagePath: imagePath || null,
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/products/:id - Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, supplierId, imagePath } = req.body;

    if (!name || !description || price === undefined || !supplierId) {
      return res.status(400).json({ 
        error: 'Name, description, price, and supplierId are required' 
      });
    }

    // Verify supplier exists if supplierId is being updated
    if (supplierId) {
      const supplier = await prisma.supplier.findUnique({
        where: { id: supplierId },
      });

      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: parseFloat(price),
        supplierId,
        imagePath: imagePath !== undefined ? imagePath : undefined,
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.json(product);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

