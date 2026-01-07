'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'media',
            [
                {
                    session_id: 1,
                    file_type: 'video',
                    file_name: 'lesson1.mp4',
                    file_path: '/uploads/videos/lesson1.mp4',
                    thumbnail_path: '/uploads/thumbnails/lesson1.jpg',
                    uploader_id: 1,
                    approval_status: 'Approved',
                },
                {
                    session_id: 2,
                    file_type: 'pdf',
                    file_name: 'lecture-notes.pdf',
                    file_path: '/uploads/pdfs/lecture-notes.pdf',
                    thumbnail_path: null,
                    uploader_id: 1,
                    approval_status: 'Pending',
                },
                {
                    session_id: 1,
                    file_type: 'video',
                    file_name: 'lesson2.mp4',
                    file_path: '/uploads/videos/lesson2.mp4',
                    thumbnail_path: '/uploads/thumbnails/lesson2.jpg',
                    uploader_id: 1,
                    approval_status: 'Approved',
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('media', null, {});
    },
};
