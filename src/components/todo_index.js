import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { readTodo } from '../actions';

class TodoIndex extends Component {
    // constructor(props) {
    //     super(props);
    //     // props の中身の確認
    //     console.log(props);
    // }

    componentDidMount() {
        // console.log('component did mount');
        // console.log(this.props);
        this.props.readTodo();
    }

    // todo の一覧を取得し、リスト形式で表示
    renderTodo() {
        return _.map(this.props.todo, (todo) => (
            // <ul>
            //     <li>
            //         <a href="http://localhost:8082/detail?id=1000">1000: go to supermarket</a>
            //     </li>
            // </ul>
            <li key={todo.id}>
                {/* todo の詳細表示へのリンク */}
                <Link
                    to={`/todo/${todo.id}`}
                >{`${todo.id} ${todo.activityName}`}</Link>
            </li>
        ));
    }

    render() {
        // console.log('render!');
        return (
            <>
                {/* <h1>{console.log(Object.keys(this.props.todo))}</h1> */}
                <ul>{this.renderTodo()}</ul>
                <Link to="/register">+</Link>
            </>
        );
    }
}

// state の情報からこのコンポーネントに必要なものを取り出して props としてマッピングする
const mapStateToProps = (state) => ({ todo: state.todo });

// const mapDispatchToProps = { readTodo };
const mapDispatchToProps = (dispatch) => ({
    // 左側の readTodo は componentDidMount で指定したもの
    // 右側の readTodo() は action creater として actions/index.js で定義しているもの
    readTodo: () => dispatch(readTodo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoIndex);
