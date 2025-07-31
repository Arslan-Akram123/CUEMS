const { message } = require('statuses');
const Category = require('../models/category');


async function addCategory(req, res) {
    const { name, description } = req.body;
   
    if (!name || !description) {
        return res.status(400).json({success: false,
             type: "error",
             message: 'Name and description are required' });
    }
    const existingCategory = await Category.find();
    if (existingCategory.some(category => category.name.toLowerCase() === name.toLowerCase())) {
        return res.status(400).json({  success: false,
                        type: "error",
                        message: "Category name already exists"});
    }
    
    try {
        const category = new Category({ name, description });
        await category.save();
        res.status(201).json({success: true,
             type: "success",
             message: "Category added successfully"});
    } catch (err) {
       
        res.status(500).json({
             success: false,
             type: "error",
             message: 'Internal server error' });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await Category.find().populate('createdBy', 'fullName');
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateCategory(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function deleteCategory(req, res) {
   
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getCategoryById(req, res) {
    const { id } = req.params;
    try {
        const category = await Category.findById(id).populate('createdBy', 'fullName');
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        console.error('Error fetching category by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    addCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoryById
};