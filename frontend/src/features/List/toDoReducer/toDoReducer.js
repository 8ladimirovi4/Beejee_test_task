const initialState = {
  tasks: [],
};

const types = {
  SET_TASKS: 'SET_TASKS',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_USER: 'EDIT_TASK',
  EDIT_EMAIL: 'EDIT_EMAIL',
  EDIT_TEXT: 'EDIT_TEXT',
  CHECKBOX_STATUS: 'CHECKBOX_STATUS',
};

const actions = {
  setTasks: (tasks) => ({
    type: types.SET_TASKS,
    payload: tasks,
  }),
  addTask: (task) => ({
    type: types.ADD_TASK,
    payload: task,
  }),
  deleteTask: (id) => ({
    type: types.DELETE_TASK,
    payload: id,
  }),
  editUser: (id, value) => ({
    type: types.EDIT_USER,
    payload: {
      id,
      value,
    },
  }),
  editEmail: (id, value) => ({
    type: types.EDIT_EMAIL,
    payload: {
      id,
      value,
    },
  }),
  editText: (id, value) => ({
    type: types.EDIT_TEXT,
    payload: {
      id,
      value,
    },
  }),
  checkBoxStatus: (id, value) => ({
    type: types.CHECKBOX_STATUS,
    payload: {
      id,
      value,
    },
  }),
};

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TASKS: {
      return { ...state, tasks: action.payload };
    }
    case types.ADD_TASK: {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case types.DELETE_TASK: {
      return {
        ...state,
        tasks: [
          ...state.tasks.filter((task) => task.id !== Number(action.payload)),
        ],
      };
    }
    case types.EDIT_USER: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, user: action.payload.value }
              : task
          ),
        ],
      };
    }
    case types.EDIT_EMAIL: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, email: action.payload.value }
              : task
          ),
        ],
      };
    }
    case types.EDIT_TEXT: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, task: action.payload.value }
              : task
          ),
        ],
      };
    }
    case types.CHECKBOX_STATUS: {
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task) =>
            task.id === action.payload.id
              ? { ...task, done: action.payload.value }
              : task
          ),
        ],
      };
    }

    default:
      return state;
  }
};

export default toDoReducer;
export { initialState };
export const {
  setTasks,
  addTask,
  deleteTask,
  editUser,
  editEmail,
  editText,
  checkBoxStatus,
} = actions;
