import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Tasks({
  createTask,
  delTask,
  userEdit,
  emailEdit,
  textEdit,
  handleDoneChange,
  currentTask,
}) {
  const user = localStorage.getItem('user');
  const tasks = useSelector((state) => state.todo.tasks);
  //фильтр
  const [filterStatus, setFilterStatus] = useState('user');
  const [search, setSearch] = useState('');

  if (user) {
    return (
      <div className="container">
        {/* данные берем их инпутов формы */}
        <div className="create-task">
          <form onSubmit={createTask} className="create-task-form">
            {/* Обнуление поля ввода */}
            <span>Создать задачу </span>
            <input
              className="task-input"
              name="user"
              type="text"
              placeholder="имя пользователя"
            />
            <input
              className="task-input"
              name="email"
              type="email"
              placeholder="e-mail"
            />
            <input
              className="task-input"
              name="task"
              type="text"
              placeholder="текст"
            />
            <button className="btn-task">создать задачу</button>
          </form>
        </div>

        {/* поле фильтра*/}
        <div className="filter">
          <span>Фильтр </span>
          <div className="filter-radio">
            <input
              type="radio"
              className="radio"
              checked={filterStatus === 'user'}
              onChange={() => {
                setFilterStatus('user');
              }}
            />
            <span className="filtr-option">По имени</span>
          </div>
          <div className="filter-radio">
            <input
              type="radio"
              className="radio"
              checked={filterStatus === 'email'}
              onChange={() => {
                setFilterStatus('email');
              }}
            />

            <span className="filtr-option">По email</span>
          </div>
          <div className="filter-radio">
            <input
              type="radio"
              className="radio"
              checked={filterStatus === 'text'}
              onChange={() => {
                setFilterStatus('text');
              }}
            />

            <span className="filtr-option">По тексту</span>
          </div>
          <input
            className="task-input"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="поиск"
          />
        </div>
        <div className="table-container">
        <table>
          <thead>
            <tr>
              <th data-type="string">имя пользователя</th>
              <th data-type="string">email</th>
              <th data-type="string">текст</th>
              <th>удалить задачу</th>
              <th>закрыть задачу</th>
            </tr>
          </thead>
          {tasks &&
            currentTask
              .filter((obj) => {
                if (filterStatus === 'user') {
                  return obj.user.toLowerCase().includes(search.toLowerCase());
                }
                if (filterStatus === 'email') {
                  return obj.email.toLowerCase().includes(search.toLowerCase());
                }
                return obj.task.toLowerCase().includes(search.toLowerCase());
              })
              .map((el, i) => (
                <tbody className={el.done ? 'li1' : 'li'} key={el.id}>
                  <tr>
                    <td>
                      {el.user}
                      <form
                        onSubmit={(event) => {
                          userEdit(event, el.id);
                        }}
                      >
                        <input className="edit-input" type="text" name="user" />{' '}
                        <button className="btn-edit">применить</button>{' '}
                      </form>
                    </td>
                    <td>
                      {el.email}
                      <form
                        onSubmit={(event) => {
                          emailEdit(event, el.id);
                        }}
                      >
                        <input
                          className="edit-input"
                          type="email"
                          name="email"
                        />{' '}
                        <button className="btn-edit">применить</button>{' '}
                      </form>
                    </td>
                    <td>
                      {el.task}
                      <form
                        onSubmit={(event) => {
                          textEdit(event, el.id);
                        }}
                      >
                        <input className="edit-input" type="text" name="task" />{' '}
                        <button className="btn-edit">применить</button>{' '}
                      </form>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={delTask}
                        id={el.id}
                      >
                        Удалить задачу
                      </button>{' '}
                    </td>
                    <td>
                      {/*input checkbox */}
                      <input
                        className="check"
                        type="checkbox"
                        checked={el.done}
                        onChange={(event) => handleDoneChange(event, el.id)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
        </table>
        </div>
      </div>
    );
  }

  //для неавторизованного пользователя
  return (
    <div className="container">
      {/* данные берем их инпутов формы */}
      <div className="create-task">
        <form onSubmit={createTask} className="create-task-form">
          {/* Обнуление поля ввода */}
          <span>Создать задачу </span>
          <input
            className="task-input"
            name="user"
            type="text"
            placeholder="имя пользователя"
          />
          <input
            className="task-input"
            name="email"
            type="email"
            placeholder="e-mail"
          />
          <input
            className="task-input"
            name="task"
            type="text"
            placeholder="текст"
          />
          <button className="btn-task">создать задачу</button>
        </form>
      </div>

      {/* поле фильтра*/}
      <div className="filter">
        <span>Фильтр </span>
        <div className="filter-radio">
          <input
            type="radio"
            className="radio"
            checked={filterStatus === 'user'}
            onChange={() => {
              setFilterStatus('user');
            }}
          />
          <span className="filtr-option">По имени</span>
        </div>
        <div className="filter-radio">
          <input
            type="radio"
            className="radio"
            checked={filterStatus === 'email'}
            onChange={() => {
              setFilterStatus('email');
            }}
          />

          <span className="filtr-option">По email</span>
        </div>
        <div className="filter-radio">
          <input
            type="radio"
            className="radio"
            checked={filterStatus === 'text'}
            onChange={() => {
              setFilterStatus('text');
            }}
          />

          <span className="filtr-option">По тексту</span>
        </div>
        <input
          className="task-input"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="поиск"
        />
      </div>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th data-type="string">имя пользователя</th>
            <th data-type="string">email</th>
            <th data-type="string">текст</th>
            <th>удалить задачу</th>
          </tr>
        </thead>
      </table>
      <div className="list">
        <ul>
          {tasks &&
            currentTask
              .filter((obj) => {
                if (filterStatus === 'user') {
                  return obj.user.toLowerCase().includes(search.toLowerCase());
                }
                if (filterStatus === 'email') {
                  return obj.email.toLowerCase().includes(search.toLowerCase());
                }
                return obj.task.toLowerCase().includes(search.toLowerCase());
              })
              .map((el, i) => (
                <li className={el.done ? 'li1' : 'li'} key={el.id}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{el.user}</td>
                        <td>{el.email}</td>
                        <td>{el.task}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-edit"
                            onClick={delTask}
                            id={el.id}
                          >
                            Удалить задачу
                          </button>{' '}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              ))}
        </ul>
              </div>
      </div>
    </div>
  );
}
export default Tasks;
