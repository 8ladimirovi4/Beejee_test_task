import './component.css';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTask,
  checkBoxStatus,
  deleteTask,
  editEmail,
  editText,
  editUser,
  setTasks,
} from './toDoReducer/toDoReducer';
import Tasks from './Tasks';

function ToDo() {
  //редьюсер
  const tasks = useSelector((state) => state.todo.tasks);
  const dispatch = useDispatch();

  //пагинация
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);
  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const currentTask = tasks.slice(firstTaskIndex, lastTaskIndex);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //рендер задач
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/task');
      const data = await response.json();
      //здесь должен быть массив объектов
      dispatch(setTasks(data.allTasks));
    }
    fetchData();
  }, [dispatch]);

  // создать задачу
  async function createTask(event) {
    event.preventDefault();
    const form = event.target;
    const body = JSON.stringify({
      user: form.user.value,
      email: form.email.value,
      task: form.task.value,
    });
    const response = await fetch('api/task', {
      body: body,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    dispatch(addTask(data));
    form.user.value = '';
    form.email.value = '';
    form.task.value = '';
  }

  //удалить задачу
  async function delTask(event) {
    const { id } = event.target;
    const response = await fetch(`api/task/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.success === true) {
      dispatch(deleteTask(id));
    }
  }

  //изменить задачу
  async function userEdit(event, id) {
    event.preventDefault();
    const user = event.target.user.value;
    await fetch(`api/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        user,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(editUser(id, user));
    event.target.user.value = '';
  }

  async function emailEdit(event, id) {
    event.preventDefault();
    const email = event.target.email.value;
    await fetch(`api/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        email,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(editEmail(id, email));
    event.target.email.value = '';
  }

  async function textEdit(event, id) {
    event.preventDefault();
    const task = event.target.task.value;
    await fetch(`api/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        task,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(editText(id, task));
    event.target.task.value = '';
  }
  //завершить задачу
  async function handleDoneChange(event, id) {
    const { checked } = event.target;
    const response = await fetch(`api/task/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        done: checked,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (data.success === true) {
      dispatch(checkBoxStatus(id, checked));
    }
  }

  return (
    <>
      <Tasks
        createTask={createTask}
        delTask={delTask}
        userEdit={userEdit}
        emailEdit={emailEdit}
        textEdit={textEdit}
        handleDoneChange={handleDoneChange}
        currentTask={currentTask}
      />
      <Pagination
        tasksPerPage={tasksPerPage}
        totalTasks={tasks.length}
        paginate={paginate}
      />
    </>
  );
}

export default ToDo;
