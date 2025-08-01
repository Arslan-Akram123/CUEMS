const sitesettingschema=require('../models/sitesetting');

const getSiteSetting = async (req, res) => {
        try {
            const siteSetting = await sitesettingschema.findOne({});
            res.status(200).json(siteSetting);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

const updateSiteSetting = async (req, res) => { 
    const { siteEmail,sitePhone,siteAddress,tiwitterLink,facebookLink,instagramLink,description,siteCloseMessage,footerText } = req.body;
    try {
        let siteSetting = await sitesettingschema.findOne({});
        // If no site setting exists, create a new one
        if (!siteSetting) {
            const logoFile = req.files?.siteMainImage?.[0];
            const sitelogoFile = req.files?.siteLogo?.[0];
            siteSetting = await sitesettingschema.create({
                siteEmail,
                sitePhone,
                siteAddress,
                tiwitterLink,
                facebookLink,
                instagramLink,
                siteMainImage: logoFile ? logoFile.filename : '',
                siteLogo: sitelogoFile ? sitelogoFile.filename : '',
                description,
                siteCloseMessage,
                footerText
            });
            return res.status(200).json(siteSetting);
        }

        // If exists, update the fields
        const logoFile = req.files?.siteMainImage?.[0];
        const sitelogoFile = req.files?.siteLogo?.[0];

        siteSetting.siteEmail = siteEmail || siteSetting.siteEmail;
        siteSetting.sitePhone = sitePhone || siteSetting.sitePhone;
        siteSetting.siteAddress = siteAddress || siteSetting.siteAddress;
        siteSetting.tiwitterLink = tiwitterLink || siteSetting.tiwitterLink;
        siteSetting.facebookLink = facebookLink || siteSetting.facebookLink;
        siteSetting.instagramLink = instagramLink || siteSetting.instagramLink;
        siteSetting.siteMainImage = logoFile ? logoFile.filename : siteSetting.siteMainImage;
        siteSetting.siteLogo = sitelogoFile ? sitelogoFile.filename : siteSetting.siteLogo;
        siteSetting.description = description || siteSetting.description;
        siteSetting.siteCloseMessage = siteCloseMessage || siteSetting.siteCloseMessage;
        siteSetting.footerText = footerText || siteSetting.footerText;
        await siteSetting.save();
        res.status(200).json(siteSetting);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports={
    getSiteSetting,
    updateSiteSetting
}