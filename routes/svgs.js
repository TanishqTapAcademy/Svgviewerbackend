import express from 'express';
import multer from 'multer';
import { SvgModel } from '../models/Svg.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml' || file.originalname.toLowerCase().endsWith('.svg')) {
      cb(null, true);
    } else {
      cb(new Error('Only SVG files are allowed'), false);
    }
  }
});

// GET /api/svgs - Get all SVGs
router.get('/', async (req, res) => {
  try {
    const svgs = await SvgModel.findAll();
    res.json({
      success: true,
      data: svgs
    });
  } catch (error) {
    console.error('Error fetching SVGs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SVGs',
      error: error.message
    });
  }
});

// GET /api/svgs/search - Search SVGs
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const svgs = await SvgModel.search(q);
    res.json({
      success: true,
      data: svgs
    });
  } catch (error) {
    console.error('Error searching SVGs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search SVGs',
      error: error.message
    });
  }
});

// GET /api/svgs/:id - Get single SVG
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const svg = await SvgModel.findById(id);
    
    if (!svg) {
      return res.status(404).json({
        success: false,
        message: 'SVG not found'
      });
    }

    res.json({
      success: true,
      data: svg
    });
  } catch (error) {
    console.error('Error fetching SVG:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch SVG',
      error: error.message
    });
  }
});

// POST /api/svgs - Create new SVG
router.post('/', upload.single('svgFile'), async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const file = req.file;

    // Validation
    if (!name || !description || !category || !file) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, category, and SVG file are required'
      });
    }

    // Convert buffer to string and validate SVG content
    const svgContent = file.buffer.toString('utf8');
    if (!svgContent.includes('<svg')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid SVG file content'
      });
    }

    const svgData = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim(),
      content: svgContent,
      fileSize: file.size,
      originalName: file.originalname
    };

    const newSvg = await SvgModel.create(svgData);
    
    res.status(201).json({
      success: true,
      message: 'SVG uploaded successfully',
      data: newSvg
    });
  } catch (error) {
    console.error('Error creating SVG:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload SVG',
      error: error.message
    });
  }
});

// PUT /api/svgs/:id - Update SVG
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    if (!name || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, and category are required'
      });
    }

    const updateData = {
      name: name.trim(),
      description: description.trim(),
      category: category.trim()
    };

    const updatedSvg = await SvgModel.updateById(id, updateData);
    
    if (!updatedSvg) {
      return res.status(404).json({
        success: false,
        message: 'SVG not found'
      });
    }

    res.json({
      success: true,
      message: 'SVG updated successfully',
      data: updatedSvg
    });
  } catch (error) {
    console.error('Error updating SVG:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update SVG',
      error: error.message
    });
  }
});

// DELETE /api/svgs/:id - Delete SVG
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SvgModel.deleteById(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'SVG not found'
      });
    }

    res.json({
      success: true,
      message: 'SVG deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting SVG:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete SVG',
      error: error.message
    });
  }
});

export default router;
