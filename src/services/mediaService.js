const fs = require('fs');
const path = require('path');

const Media = require('../../models/sessionMedia');
const logger = require('../../common/logSetting');

/**
 * adding media file to a specific session
 */
const addMediaAsync = async mediaData => {
    try {
        const requiredFields = ['sessionId', 'fileType', 'fileName', 'filePath', 'uploaderId'];
        for (const field of requiredFields) {
            if (!mediaData[field]) {
                return { isSuccess: false, message: `${field} is required`, data: null };
            }
        }

        const newMedia = await Media.create({
            sessionId: mediaData.sessionId,
            fileType: mediaData.fileType,
            fileName: mediaData.fileName,
            filePath: mediaData.filePath,
            thumbnailPath: mediaData.thumbnailPath || null,
            uploaderId: mediaData.uploaderId,
            approvalStatus: mediaData.approvalStatus || 'Pending',
        });

        return { isSuccess: true, message: 'Media added successfully', data: newMedia };
    } catch (err) {
        logger.error('addMediaAsync error:', err);
        return { isSuccess: false, message: 'Add media failed', data: null };
    }
};

/**
 * according to sessionId extract all Media files
 * @param {number} sessionId - Session ID，to find relevant Media file
 * @returns {object}
 */
const getMediaBySessionIdAsync = async sessionId => {
    try {
        if (!sessionId) {
            return { isSuccess: false, message: 'Session ID is required', data: [] };
        }

        const mediaList = await Media.findAll({
            where: { sessionId },
            order: [['created_at', 'DESC']],
        });
        return { isSuccess: true, message: 'Media fetched successfully', data: mediaList };
    } catch (err) {
        logger.error('getMediaBySessionIdAsync error:', err);
        return { isSuccess: false, message: 'Fetch media failed', data: null };
    }
};

/**
 * Update media
 * @param {number} mediaId - media ID that need to update
 * @param {object} mediaData - string object that need to update
 * @returns {object}
 */
const updateMediaAsync = async (mediaId, mediaData) => {
    try {
        if (!mediaId) {
            return { isSuccess: false, message: 'Media ID is required', data: null };
        }

        const media = await Media.findByPk(mediaId);
        if (!media) {
            return { isSuccess: false, message: 'Media not found', data: null };
        }

        await media.update(
            {
                ...mediaData,
                updatedAt: new Date(),
            },
            { omitNull: true }
        );
        return { isSuccess: true, message: 'Media updated successfully', data: media };
    } catch (err) {
        logger.error('updateMediaAsync error:', err);
        return { isSuccess: false, message: 'Update media failed', data: null };
    }
};

/**
 * Delete Media
 * @param {number} sessionId - Media ID that need to delete
 * @returns {object}
 */
const deleteMediaAsync = async mediaId => {
    try {
        if (!mediaId) {
            return { isSuccess: false, message: 'Media ID is required', data: null };
        }

        const media = await Media.findByPk(mediaId);
        if (!media) {
            return { isSuccess: false, message: 'Media not found', data: null };
        }

        const rootDir = path.join(__dirname, '../../');
        const mediaFilePath = path.join(rootDir, '../../public', media.filePath);
        const thumbnailPath = media.thumbnailPath
            ? path.join(rootDir, '../../public', media.thumbnailPath)
            : null;
        console.log('media file path:', mediaFilePath);
        console.log('thumbnail path:', thumbnailPath);
        if (fs.existsSync(mediaFilePath)) {
            fs.unlinkSync(mediaFilePath);
        }
        if (thumbnailPath && fs.existsSync(thumbnailPath)) {
            fs.unlinkSync(thumbnailPath);
        }

        await media.destroy();
        return { isSuccess: true, message: 'Media deleted successfully', data: null };
    } catch (err) {
        logger.error('deleteMediaAsync error:', err);
        return { isSuccess: false, message: 'Delete media failed', data: null };
    }
};

module.exports = {
    addMediaAsync,
    getMediaBySessionIdAsync,
    updateMediaAsync,
    deleteMediaAsync,
};
