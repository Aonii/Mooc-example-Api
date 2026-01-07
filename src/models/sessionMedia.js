const { DataTypes } = require('sequelize');

const { sequelize } = require('../db/sequelizedb');

const Media = sequelize.define(
    'Media',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sessionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'session_id',
            references: {
                model: 'session',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        fileType: {
            type: DataTypes.ENUM('video', 'pdf'),
            allowNull: false,
            field: 'file_type',
        },
        fileName: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'file_name',
        },
        filePath: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'file_path',
        },
        thumbnailPath: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'thumbnail_path',
        },
        uploaderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'uploader_id',
            references: {
                model: 'user',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'updated_at',
        },
        approvalStatus: {
            type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
            allowNull: false,
            defaultValue: 'Pending',
            field: 'approval_status',
        },
    },
    {
        tableName: 'media',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Media.associate = function (models) {
    Media.belongsTo(models.Session, {
        foreignKey: 'sessionId',
        as: 'session',
    });
};

module.exports = Media;
