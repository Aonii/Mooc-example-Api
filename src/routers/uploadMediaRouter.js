const express = require('express');

require('express-async-errors');
const upload = require('../middlewares/uploadMedia');

const router = express.Router();

// upload
router.post(
    '/uploadMedia',
    upload.fields([{ name: 'file' }, { name: 'thumbnail' }]),
    (req, res) => {
        try {
            // 绝对路径是操作系统本地路径，浏览器无法访问，前端请求它会 404
            const filePath = req.files?.file?.[0]?.path?.replace(/\\/g, '/');
            const thumbnailPath = req.files?.thumbnail?.[0]?.path?.replace(/\\/g, '/');

            // 相对路径是配合静态资源服务（如 Express 的 express.static()）给前端访问的
            const obFilePath = '/uploads/media/' + req.files?.file?.[0]?.filename;
            const obThumbnailFileName = req.files?.thumbnail?.[0]?.filename;
            let obThumbnailPath = '';
            if (obThumbnailFileName) {
                obThumbnailPath = '/uploads/thumbnails/' + req.files?.thumbnail?.[0]?.filename;
            }

            return res.status(200).json({
                status: 1,
                message: 'File(s) uploaded successfully',
                data: {
                    filePath: obFilePath, // `/${filePath}`,
                    thumbnailPath: obThumbnailPath, // thumbnailPath ? `/${thumbnailPath}` : null,
                },
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ status: 0, message: 'Upload failed' });
        }
    }
);

module.exports = router;
