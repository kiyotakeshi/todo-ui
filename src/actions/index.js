import axios from 'axios';
export const READ_TODOS = 'READ_TODOS';
export const READ_TODO = 'READ_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export const ROOT_URL = 'http://localhost:8081';

export const getTodos = () => async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/api/todo`);
    // console.log("response");
    // console.log(response);
    dispatch({ type: READ_TODOS, response });
};

export const postTodo = (values) => async (dispatch) => {
    console.log(values);
    const response = await axios.post(`${ROOT_URL}/api/todo`, values);
    dispatch({ type: CREATE_TODO, response });
};

export const deleteTodo = (id) => async (dispatch) => {
    await axios.delete(`${ROOT_URL}/api/todo/${id}`);
    dispatch({ type: DELETE_TODO, id });
};

export const getTodo = (id) => async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/api/todo/${id}`);
    console.log(response); // {data: {…}, status: 200, statusText: "", headers: {…}, config: {…}, …}
    dispatch({ type: READ_TODO, response });
};
