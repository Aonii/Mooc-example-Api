'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('session', [
            {
                id: 1,
                course_instance_id: 1,
                session_title: 'Introduction to Data Science',
                session_description: 'What is the Data Science in our life?',
                order: 1,
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 2,
                course_instance_id: 1,
                session_title: 'Data Science 2',
                session_description: 'How to use Data Science in our life?',
                order: 2,
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 3,
                course_instance_id: 1,
                session_title: 'Data Science 3',
                session_description: 'What is the Data Science 3?',
                order: 3,
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 4,
                course_instance_id: 1,
                session_title: 'Data Science 4',
                session_description: 'What is the Data Science 4?',
                order: 4,
                created_by: 1,
                updated_by: 1,
            },
            {
                id: 5,
                course_instance_id: 1,
                session_title: 'Data Science 5',
                session_description: 'What is the Data Science 5?',
                order: 5,
                created_by: 1,
                updated_by: 1,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('session', null, {});
    },
};
