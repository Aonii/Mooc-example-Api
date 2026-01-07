const path = require('path');
const fs = require('fs');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image');
        const uploadDir = isImage ? 'uploads/thumbnails' : 'uploads/media';
        const fullPath = path.join(__dirname, '../../public', uploadDir);

        // if path dose not exist
        fs.mkdirSync(fullPath, { recursive: true });
        cb(null, fullPath);
    },
    // 防止文件名重复，或用户上传的文件名含有特殊字符、中文等导致系统异常
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const sanitizedOriginal = file.originalname.split('--').pop().replace(/\s+/g, '_'); // 去掉空格等特殊字符
        cb(null, `${timestamp}--${randomStr}--${sanitizedOriginal}`);
    },
});

// 允许上传 video、image 和 PDF
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'video/mp4',
        'video/mkv',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'application/pdf', // ✅ 新增支持 PDF
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type'), false);
    }
};

// 限制上传大小：视频最大 100MB，图片最大 5MB
const limits = {
    fileSize: 100 * 1024 * 1024, // 100MB
};

const upload = multer({
    storage,
    fileFilter,
    limits,
});

module.exports = upload;
