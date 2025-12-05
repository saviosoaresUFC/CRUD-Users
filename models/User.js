const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [6],
                msg: 'O nome de usuário deve ter no mínimo 6 caracteres.'
            }
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6],
                msg: 'O nome completo deve ter no mínimo 6 caracteres.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Por favor, insira um email válido.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6],
                msg: 'A senha deve ter no mínimo 6 caracteres.'
            }
        }
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'users'
});

// HASH da senha antes de criar
User.addHook('beforeCreate', async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

// HASH da senha antes de atualizar
User.addHook('beforeUpdate', async (user) => {
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;