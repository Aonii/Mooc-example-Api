const sessionService = require('../../services/course/sessionService');

/**
 * Add Session
 */
const addSessionAsync = async (req, res) => {
    try {
        const sessionData = req.body;
        const result = await sessionService.addSessionAsync(sessionData);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'session created successfully', 1, 201);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Get single Sessions by Id
 */
const getSessionByIdAsync = async (req, res) => {
    try {
        const sessionId = req.query.id;
        const result = await sessionService.getSessionByIdAsync(sessionId);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Session fetched successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Get all Sessions by courseInstanceId
 */
const getSessionsByCourseInstanceIdAsync = async (req, res) => {
    try {
        const courseInstanceId = req.query.courseInstanceId;
        const result = await sessionService.getSessionsByCourseInstanceIdAsync(courseInstanceId);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Sessions fetched successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 404);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Get paged Session list
 */
const getSessionListAsync = async (req, res) => {
    try {
        let {
            page,
            pageSize,
            courseInstanceId,
            sessionTitle,
            sessionDescription,
            createdBy,
            updatedBy,
        } = req.query;

        page = parseInt(page, 10) || 1;
        pageSize = parseInt(pageSize, 10) || 10;

        const query = {};
        if (courseInstanceId) query.courseInstanceId = courseInstanceId;
        if (sessionTitle) query.sessionTitle = sessionTitle;
        if (sessionDescription) query.sessionDescription = sessionDescription;
        if (createdBy) query.createdBy = createdBy;
        if (updatedBy) query.updatedBy = updatedBy;

        const result = await sessionService.getSessionListAsync(page, pageSize, query);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Sessions fetched successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Update Session
 */
const updateSessionAsync = async (req, res) => {
    try {
        const session = {};
        session.id = req.body.id;
        session.courseInstanceId = req.body.courseInstanceId;
        session.sessionTitle = req.body.sessionTitle;
        session.sessionDescription = req.body.sessionDescription;
        session.order = req.body.order;
        session.updatedBy = req.body.updatedBy;

        const result = await sessionService.updateSessionAsync(session.id, session);

        if (result.isSuccess) {
            res.sendCommonValue(result.data, 'Session update successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Delete Session
 */
const deleteSessionAsync = async (req, res) => {
    try {
        const sessionId = req.params.id;
        const result = await sessionService.deleteSessionAsync(sessionId);

        if (result.isSuccess) {
            res.sendCommonValue({}, 'Session deleted successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

/**
 * Reorder Session
 */
const reorderSessionAsync = async (req, res) => {
    try {
        const { courseInstanceId, order } = req.body;
        const result = await sessionService.reorderSessionAsync(courseInstanceId, order);

        if (result.isSuccess) {
            res.sendCommonValue({}, 'Sessions reordered successfully', 1, 200);
        } else {
            res.sendCommonValue({}, result.message, 0, 400);
        }
    } catch (err) {
        res.sendCommonValue({}, err.message || 'Internal Server Error', 0, 500);
    }
};

module.exports = {
    addSessionAsync,
    getSessionByIdAsync,
    getSessionsByCourseInstanceIdAsync,
    getSessionListAsync,
    updateSessionAsync,
    deleteSessionAsync,
    reorderSessionAsync,
};
