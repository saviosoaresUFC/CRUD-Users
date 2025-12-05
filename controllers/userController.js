const User = require('../models/User');
const { UniqueConstraintError, ValidationError, DatabaseError } = require('sequelize');

// Tratamento de erro de validação ou duplicidade
const handleSequelizeError = (res, error) => {
    if (error instanceof ValidationError) {
        const messages = error.errors.map(err => err.message);
        return res.status(400).json({ success: false, error: messages.join(', ') });
    }
    if (error instanceof UniqueConstraintError) {
        return res.status(400).json({ success: false, error: 'Usuário ou Email já cadastrado.' });
    }
    
    console.error('Sequelize Error:', error);
    res.status(500).json({ success: false, error: 'Erro de servidor ao processar a requisição.' });
};


// @desc    Criar novo usuário
// @route   POST /api/users
// @access  Public
exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({ 
            success: true, 
            data: userResponse 
        });

    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// @desc    Obter todos os usuários
// @route   GET /api/users
// @access  Public
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.status(200).json({ 
            success: true, 
            count: users.length, 
            data: users 
        });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// @desc    Obter um único usuário por ID
// @route   GET /api/users/:id
// @access  Public
exports.getUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// @desc    Atualizar usuário por ID
// @route   PUT /api/users/:id
// @access  Public
exports.updateUser = async (req, res) => {
    try {
        let user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        const [updatedRows] = await user.update(req.body, { 
            individualHooks: true
        });
        
        user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        handleSequelizeError(res, error);
    }
};

// @desc    Excluir usuário por ID
// @route   DELETE /api/users/:id
// @access  Public
exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });

        if (deleted === 0) {
            return res.status(404).json({ success: false, error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ success: true, data: {} }); 
    } catch (error) {
        handleSequelizeError(res, error);
    }
};