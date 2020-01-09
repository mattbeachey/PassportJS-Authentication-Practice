const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
    const burgers = sequelize.define("Burgers", {
        // attributes
        burgerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eaten: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
        {
            // options
            timestamps: false
        }
    );

    return burgers

};