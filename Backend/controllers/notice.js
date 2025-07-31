const noticeSchema = require('../models/notice');
const userSchema = require('../models/user');
const NoticeRead = require('../models/noticeRead');


async function addNotice(req, res) {
    try {
        const { title, description } = req.body;
        const notice = new noticeSchema({ title, description });
        await notice.save();
        res.status(201).json({ message: 'Notice added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding notice', error: error.message });
    }
}

async function getNotices(req, res) {
    try {
        const notices = await noticeSchema.find();
        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notices', error: error.message });
    }
}

const notificationOfUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const allNotices = await noticeSchema.find().sort({ createdAt: -1 });
    const readRecords = await NoticeRead.find({ user: userId }).select('notice');

    const readNoticeIds = readRecords.map(r => r.notice.toString());

    const notices = allNotices.map(n => ({
      _id: n._id,
      title: n.title,
      description: n.description,
      createdAt: n.createdAt,
      isRead: readNoticeIds.includes(n._id.toString())
    }));
   

    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notices', error: error.message });
  }
};

const markNoticeAsRead = async (req, res) => {
  try {
     const { noticeId } = req.body;
    const userId = req.user.id;

    const alreadyRead = await NoticeRead.findOne({ user: userId, notice: noticeId });

    if (!alreadyRead) {
      await NoticeRead.create({ user: userId, notice: noticeId });
    }

    res.status(200).json({ message: 'Notice marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notice as read', error: error.message });
  }
};

module.exports = { addNotice, getNotices, notificationOfUser, markNoticeAsRead };