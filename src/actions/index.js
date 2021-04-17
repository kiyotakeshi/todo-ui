import axios from 'axios';
export const READ_TODO = 'READ_TODO';

export const ROOT_URL = 'http://localhost:8081';

export const readTodo = () => async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/api/todo`)
    // console.log("response");
    // console.log(response);
    dispatch ({ type: READ_TODO, response })
}