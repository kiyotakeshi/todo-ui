import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'

import { readTodo, ROOT_URL } from '../actions';

class TodoIndex extends Component {
    componentDidMount() {
        // console.log('component did mount');
        this.props.readTodo();
        console.log("this.props.todo");
        console.log(this.props.todo);
    }
    renderTodo() {
      return _.map(this.props.todo, todo => (
        // <p key={todo.id}>{todo.id}</p>

        // <ul>
        //     <li>
        //         <a href="http://localhost:8082/detail?id=1000">1000: go to supermarket</a>
        //     </li>
        // </ul>
          <li key={todo.id}>
            <a href={`${ROOT_URL}/detail?id=${todo.id}`}>{`${todo.id}: ${todo.activityName}`}</a>
          </li>
      ))
    }

    render() {
      console.log("render!");
        return (
            <>
                {/* <h1>{console.log(Object.keys(this.props.todo))}</h1> */}
                <ul>{this.renderTodo()}</ul>
            </>
        );
    }
}

// state の情報からこのコンポーネントに必要なものを取り出して props としてマッピングする
const mapStateToProps = (state) => ({todo: state.todo})

const mapDispatchToProps = ({readTodo})

export default connect(mapStateToProps, mapDispatchToProps)(TodoIndex);
