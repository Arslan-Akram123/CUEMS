const userModel = require('../models/user');
const bcrypt = require('bcrypt');

async function addProfileData(req, res) {
    
    
    
    const { fullName,street,country,city,state,postalCode,phoneNumber, email} = req.body;
     
    const finduser = await userModel.findById(req.user.id);

    if (!finduser) {
        return res.status(404).json({ error: 'User not found' });
    }
    const profileImage = req.file ? req.file.filename : finduser.profileImageURL;
    
    finduser.fullName = fullName;
    finduser.address = street;
    finduser.country = country;
    finduser.city = city;
    finduser.province = state;
    finduser.postalCode = postalCode;
    finduser.phoneNumber = phoneNumber;
    finduser.email = email;
    finduser.profileImageURL = profileImage;
    try {
        const updatedUser = await finduser.save();
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getProfileData(req, res) {
    
    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function ChangePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
     console.log('Change password request received for user ID:', req.user.id);

    try {
        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                fieldErrors: { currentPassword: 'Current password is incorrect' },
                error: 'Current password is incorrect.'
            });
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                fieldErrors: { newPassword: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.' },
                error: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.'
            });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: 'Password changed successfully!' });
    } catch (err) {
        console.error('Change password error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

  async function updateProfileStatus(req, res) {
     const {userId,  role } = req.body;
    
    console.log('Update profile status request received for user ID:', userId);
    console.log('Role:', role);
   
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.role = role;
        await user.save();
        return res.status(200).json({ message: 'Profile status updated successfully!' });
    } catch (err) {
        console.error('Update profile status error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
 async function getAllUsers(req, res) {
    console.log('Get all users request received');
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports={
    addProfileData,
    getProfileData,
    ChangePassword,
    updateProfileStatus,
    getAllUsers
}