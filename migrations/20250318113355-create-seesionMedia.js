'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('media', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            session_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'session',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            file_type: {
                type: Sequelize.ENUM('video', 'pdf'),
                allowNull: false,
            },
            file_name: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            file_path: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            thumbnail_path: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            uploader_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id',
                },
                onDelete: 'CASCADE',
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
            approval_status: {
                type: Sequelize.ENUM('Pending', 'Approved', 'Rejected'),
                allowNull: false,
                defaultValue: 'Pending',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('media');
    },
};
