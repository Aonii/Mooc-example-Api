const { Sequelize } = require('sequelize');

const { mysqlConfig } = require('../../appConfig');
const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect:
        'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    define: {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
    },
});

sequelize
    .authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(error => console.error('Unable to connect to the database:', error));

module.exports = {
    sequelize,
    Sequelize,
};
