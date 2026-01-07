const mediaService = require('../../services/course/mediaService');

/**
 * Add Media
 */
const addMediaAsync = async (req, res) => {
    try {
        const mediaData = req.body;
        const result = await mediaService.addMediaAsync(mediaData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Media added successfully', 1, 201);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Get Media by Session ID
 */
const getMediaBySessionIdAsync = async (req, res) => {
    try {
        const sessionId = req.query.sessionId;

        const result = await mediaService.getMediaBySessionIdAsync(sessionId);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Media fetched successfully', 1, 200);
        } else {
            res.sendCommonValue([], result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue([], err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Update Media by ID
 */
const updateMediaAsync = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const updatedData = req.body;

        const result = await mediaService.updateMediaAsync(mediaId, updatedData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Media updated successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Delete Media by ID
 */
const deleteMediaAsync = async (req, res) => {
    try {
        const mediaId = req.params.id;
        const result = await mediaService.deleteMediaAsync(mediaId);

        if (result.isSuccess) {
            res.sendCommonValue({}, 'Media deleted successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

module.exports = {
    addMediaAsync,
    deleteMediaAsync,
    updateMediaAsync,
    getMediaBySessionIdAsync,
};
