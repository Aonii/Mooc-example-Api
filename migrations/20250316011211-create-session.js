'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('session', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            course_instance_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'course_instance',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            session_title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            session_description: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            order: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            created_by: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
            updated_by: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'user',
                    key: 'id',
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('session');
    },
};
