const { Model, Datatypes} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Project.init(
    {
        id: {
            type: Datatypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date_posted: {
            type: Datatypes.DATE,
            allowNull: false,
            defaultValue: Datatypes.NOW,
        },
        title: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        post_content: {
            type: Datatypes.STRING
        },
        user_id: {
            type: Datatypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        post_comments: {
            type: Datatypes.STING,
            references: {
                model: 'comment',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;