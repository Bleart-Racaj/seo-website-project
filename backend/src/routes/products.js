const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const prisma = require('../lib/prisma');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Apply JWT middleware to all routes
router.use(authenticateToken);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename: timestamp-random-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `product-${uniqueSuffix}${ext}`);
  }
});

// File filter for image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only jpeg, jpg, and png image files are allowed'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// GET /products/search?q= - Search products by name or supplier name
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query parameter "q" is required' });
    }

    const searchTerm = q.trim();

    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive'
            }
          },
          {
            supplier: {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /products - List all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /products - Add a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, supplierId } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }
    if (price === undefined || price === null) {
      return res.status(400).json({ error: 'Price is required' });
    }
    if (price < 0) {
      return res.status(400).json({ error: 'Price must be non-negative' });
    }
    if (!supplierId) {
      return res.status(400).json({ error: 'supplierId is required' });
    }

    // Validate that supplier exists
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId }
    });

    if (!supplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: stock !== undefined ? parseInt(stock) : 0,
        imagePath: '', // Default empty, will be set when image is uploaded
        supplierId,
        userId: req.user.id // Link to authenticated user
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid supplierId' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /products/upload - Upload product image
// Must be before /:id route to avoid route conflicts
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { productId } = req.body;

    if (!productId) {
      // Clean up uploaded file if productId is missing
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'productId is required' });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      // Clean up uploaded file if product doesn't exist
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete old image if it exists
    if (product.imagePath) {
      const oldImagePath = path.join(__dirname, '../uploads', path.basename(product.imagePath));
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // File path relative to uploads directory
    const filePath = `/uploads/${req.file.filename}`;

    // Update product with image path
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        imagePath: filePath
      },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    res.json({
      message: 'Image uploaded successfully',
      filePath: filePath,
      product: updatedProduct
    });
  } catch (error) {
    // Clean up uploaded file on error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error('Upload product image error:', error);
    if (error instanceof multer.MulterError) {
      if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size exceeds 5MB limit' });
      }
      return res.status(400).json({ error: error.message });
    }
    if (error.message === 'Only jpeg, jpg, and png image files are allowed') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /products/:id - Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, supplierId } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Validate supplierId if being changed
    if (supplierId && supplierId !== existingProduct.supplierId) {
      const supplier = await prisma.supplier.findUnique({
        where: { id: supplierId }
      });

      if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
      }
    }

    // Validate price if provided
    if (price !== undefined && price !== null) {
      if (price < 0) {
        return res.status(400).json({ error: 'Price must be non-negative' });
      }
    }

    // Update product
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (supplierId !== undefined) updateData.supplierId = supplierId;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid supplierId' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

