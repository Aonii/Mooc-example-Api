const { body, param, query } = require("express-validator");

// Validator for adding a new media file
const addMediaValidator = [
    body("sessionId")
        .notEmpty().withMessage("Session ID is required")
        .isInt({ min: 1 }).withMessage("Session ID must be an integer"),
    body("fileType")
        .notEmpty().withMessage("file type is required"),
    body("fileName")
        .notEmpty().withMessage("file name is required")
        .isLength({ max: 255 }).withMessage("file name length no more than 255 characters"),
    body("filePath")
        .notEmpty().withMessage("file path is required"),
    body("thumbnailPath")
        .optional(),
    body("approvalStatus")
        .notEmpty().withMessage("approval status is required"),
];

// Validator for getting media files by sessionId
const getMediaBySessionIdValidator = [
    query("sessionId").notEmpty().withMessage("session id is required").isInt({ min: 1 }).withMessage("session id must be a valid integer"),
];

// Validator for updating a media file
const updateMediaValidator = [
    body("id")
        .notEmpty().withMessage("id is required")
        .isInt({ min: 1 }).withMessage("id must be a valid integer"),
    body("sessionId")
        .notEmpty().withMessage("Session ID is required")
        .isInt().withMessage("Session ID must be an integer"),
        body("fileType")
        .notEmpty().withMessage("file type is required"),
    body("fileName")
        .notEmpty().withMessage("file name is required")
        .isLength({ max: 255 }).withMessage("file name length no more than 255 characters"),
    body("filePath")
        .notEmpty().withMessage("file path is required"),
    body("thumbnailPath")
        .optional(),
    body("approvalStatus")
        .notEmpty().withMessage("approval status is required"),
];

// Validator for deleting a media file
const deleteMediaValidator = [
    param("id")
    .notEmpty().withMessage("id is required")
    .isInt({ min: 1 }).withMessage("id must be a valid integer"),
];

module.exports = {
    addMediaValidator,
    getMediaBySessionIdValidator,
    updateMediaValidator,
    deleteMediaValidator,
};
