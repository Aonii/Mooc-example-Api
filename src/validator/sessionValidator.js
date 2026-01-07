const { body, param, query } = require('express-validator');

// Validator for adding a new session
const addSessionValidator = [
    body('courseInstanceId')
        .notEmpty()
        .withMessage('Course Instance ID is required')
        .isInt({ min: 1 })
        .withMessage('Course Instance ID must be an integer'),
    body('sessionTitle')
        .notEmpty()
        .withMessage('session title is required')
        .isString()
        .withMessage('session title must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('session title length must be between 3 and 50 characters'),
    body('sessionDescription')
        .optional()
        .isString()
        .withMessage('session description must be a string')
        .isLength({ max: 255 })
        .withMessage('session description length no more than 255 characters'),
];

// Validator for updating a session
const updateSessionValidator = [
    body('id')
        .notEmpty()
        .withMessage('id is required')
        .isInt({ min: 1 })
        .withMessage('id must be a valid integer'),
    body('courseInstanceId')
        .notEmpty()
        .withMessage('Course Instance ID is required')
        .isInt()
        .withMessage('Course Instance ID must be an integer'),
    body('sessionTitle')
        .notEmpty()
        .withMessage('session title is required')
        .isString()
        .withMessage('session title must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('session title length must be between 3 and 50 characters'),
    body('sessionDescription')
        .optional()
        .isString()
        .withMessage('session description must be a string')
        .isLength({ max: 255 })
        .withMessage('session description length no more than 255 characters'),
];

const getSessionByIdValidator = [
    query('id')
        .notEmpty()
        .withMessage('id is required')
        .isInt({ min: 1 })
        .withMessage('id must be a valid integer'),
];

const getSessionsByCourseInstanceIdValidator = [
    query('courseInstanceId')
        .notEmpty()
        .withMessage('course instanceid is required')
        .isInt({ min: 1 })
        .withMessage('course instance id must be a valid integer'),
];

const getSessionListValidator = [
    query('page')
        .optional()
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage('Page must be an integer greater than 0'),
    query('pageSize')
        .optional()
        .isInt({ allow_leading_zeroes: false, min: 1 })
        .withMessage('Page size must be an integer greater than 0'),
    query('sessionTitle').optional().isString().withMessage('Title filter must be a string'),
    query('sessionDescription').optional().isString().withMessage('Description must be a string'),
    query('order').optional().isArray({ min: 1 }).withMessage('categories must be an array'),
];

const deleteSessionValidator = [
    param('id')
        .notEmpty()
        .withMessage('id is required')
        .isInt({ min: 1 })
        .withMessage('id must be a valid integer'),
];

const reorderSessionValidator = [
    body('courseInstanceId')
        .notEmpty()
        .withMessage('course instanceid is required')
        .isInt({ min: 1 })
        .withMessage('course instance id must be a valid integer'),
];

module.exports = {
    addSessionValidator,
    updateSessionValidator,
    getSessionByIdValidator,
    getSessionsByCourseInstanceIdValidator,
    getSessionListValidator,
    deleteSessionValidator,
    reorderSessionValidator,
};
