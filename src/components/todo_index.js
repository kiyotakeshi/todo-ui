import { Component } from 'react';

class TodoIndex extends Component {
    componentDidMount() {
        console.log('component did mount');
    }
    render() {
        return (
            <>
                <h1>todo app</h1>
            </>
        );
    }
}

export default TodoIndex;
