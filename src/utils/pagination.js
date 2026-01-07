const { Op } = require('sequelize');

/**
 * Generic pagination query method
 * @param {object} model - Sequelize model (e.g., Category, User, etc.)
 * @param {object} params - Pagination query parameters
 * @param {number} params.page - Current page number, defaults to 1
 * @param {number} params.pageSize - Number of records per page, defaults to 10
 * @param {object} params.where - Query conditions, defaults to an empty object
 * @param {array} params.order - Sorting conditions, defaults to sorting by createdAt in descending order
 * @param {array} params.include - Associations to include in the query, defaults to an empty array
 * @returns {object} - Paginated query results
 */
const getPaginatedResults = async (
    model,
    {
        page = 1,
        pageSize = 10,
        where = {},
        order = [['created_at', 'DESC']],
        include = [],
        attributes,
    }
) => {
    try {
        const offset = (page - 1) * pageSize;

        // Execute the paginated query
        const { count, rows } = await model.findAndCountAll({
            where, // Filter conditions
            offset, // Offset for pagination
            limit: pageSize, // Number of records per page
            order, // Sorting conditions
            include, // Include associated models
            attributes,
        });

        // Calculate the total number of pages
        const totalPages = Math.ceil(count / pageSize);

        return {
            isSuccess: true,
            message: 'Query successful',
            data: {
                items: rows,
                total: count,
                totalPages, // Total number of pages
                currentPage: page, // Current page number
                perPage: pageSize, // Number of records per page
            },
        };
    } catch (error) {
        console.error('Pagination query failed:', error);
        return { isSuccess: false, message: 'Server error', data: null };
    }
};

module.exports = {
    getPaginatedResults,
};
