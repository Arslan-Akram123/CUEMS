const universitySchema= require('../models/universities');



async function getAllUniversities(req, res) {
    try {
        const universities = await universitySchema.find();
        res.status(200).json(universities);
    } catch (err) {
        console.error('Error fetching universities:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getUniversityById(req, res) {
    const { id } = req.params;
    try {
        const university = await universitySchema.findById(id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.status(200).json(university);
    } catch (err) {
        console.error('Error fetching university by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function addUniversity(req, res) {
    const { name, description,shortName } = req.body;
    const logo = req.file ? req.file.filename : null;
  
    const alluniversites= await universitySchema.find();
      const existingUniversity = alluniversites.find(university => university.name.toLowerCase() === name.toLowerCase());
      if (existingUniversity) {
        return res.status(400).json({ error: 'University name already exists' });
      }
    try {
        const university = new universitySchema({ name, description,shortName,logo });
        await university.save();
        res.status(201).json({ message: 'University added successfully' });
    } catch (err) {
        console.error('Error adding university:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function updateUniversity(req, res) {
    const { id } = req.params;
    const { name, description,shortName } = req.body;
    
    const specificUniversity = await universitySchema.findById(id);
    if (!specificUniversity) {
        return res.status(404).json({ error: 'University not found' });
    }
    try {
        const logo = req.file ? req.file.filename : specificUniversity.logo;
        const updatedUniversity = await universitySchema.findByIdAndUpdate(id, { name, description,shortName,logo }, { new: true });
        res.status(200).json(updatedUniversity);
    } catch (err) {
        console.error('Error updating university:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


async function deleteUniversity(req, res) {
    const { id } = req.params;
    try {
        const university = await universitySchema.findByIdAndDelete(id);
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }
        res.status(200).json({ message: 'University deleted successfully' });
    } catch (err) {
        console.error('Error deleting university:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { getAllUniversities, getUniversityById, addUniversity, updateUniversity, deleteUniversity };