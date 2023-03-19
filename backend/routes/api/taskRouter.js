const taskRouter = require('express').Router();
const { Task } = require('../../db/models');

taskRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allTasks = await Task.findAll({
        order: [['id', 'ASC']],
      });
      res.json({ allTasks });
    } catch ({ message }) {
      res.json({ message: 'items did not found' });
    }
  })
  .post(async (req, res) => {
    const { user, email, task } = req.body;
    try {
      const newTask = await Task.create({
        user,
        email,
        task,
      });
      res.json(newTask);
    } catch ({ message }) {
      res.json({ message: 'item not created' });
    }
  });
taskRouter
  .route('/:id')
  .delete(async (req, res) => {
    try {
      await Task.destroy({
        where: {
          id: Number(req.params.id),
        },
      });
      res.json({ success: true });
    } catch ({ message }) {
      ({ message: "item didn't deleted" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const { done, user, email, task } = req.body;
    try {
      await Task.update(
        {
          done,
          user,
          email,
          task,
        },
        {
          where: { id },
          //необходим если мы ложим update в константу
          returning: true,
        }
      );
      res.json({ success: true });
    } catch ({ message }) {
      res.json({ message: 'status updat faled' });
    }
  });

//process version отображает текущую версию ноды
taskRouter.get('/version', (req, res) => {
  res.send(process.version);
});
module.exports = taskRouter;
