const express = require('express');
const { User } = require('../../db/models');

const getUserRouter = express.Router();

getUserRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

getUserRouter.post('/add', async (req, res) => {
  try {
    const userData = { ...req.body };
    await User.create(userData);

    res.status(201);
  } catch (error) {
    console.error(error);
  }
});

getUserRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = getUserRouter;
