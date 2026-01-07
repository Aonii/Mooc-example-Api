class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ForbiddenError extends AppError {
    constructor(message) {
        super(message || 'Access denied', 403);
        this.name = 'ForbiddenError';
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}

class BusinessError extends AppError {
    constructor(message = 'Business logic error', statusCode = 400) {
        super(message, statusCode);
        this.name = 'BusinessError';
    }
}

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', statusCode = 401) {
        super(message, statusCode);
        this.name = 'UnauthorizedError';
    }
}

module.exports = { AppError, ForbiddenError, BadRequestError, BusinessError, UnauthorizedError };
