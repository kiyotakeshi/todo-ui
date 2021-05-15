import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getTodo, deleteTodo, putTodo } from '../actions';

class TodoDetail extends Component {
    constructor(props) {
        // console.log('TodoDetail'); // Routing されてこのコンポーネントが呼ばれているか確認
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        // bind を忘れると、 onDeleteClick() メソッドで this.props を参照した際に以下のエラー
        // Cannot read property 'props' of undefined
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    // 直接 http://localhost:3000/todo/10005 などを叩くと、一覧画面のアクセスを行っておらず、 Todo 情報はブラウザのメモリ上にない
    // 適宜、該当の Todo を api server から取得しないと、画面に表示されない
    componentDidMount() {
        const { id } = this.props.match.params;
        if (id) this.props.getTodo(id);
    }

    renderField(field) {
        // console.log(field); // {input: {…}, meta: {…}, label: "ActivityName", type: "text"}
        // console.log(field.input);
        // console.log(field.meta);

        // 分割代入で、各 form の入力オブジェクトの値で代入
        let {
            input,
            label,
            type,
            // reduxForm 特有の属性
            meta: { touched, error },
        } = field;

        // console.log(`input.name ${input.name} input.value ${input.value}`); // 入力値を変更するたびに再描画される
        return (
            <div>
                {/* TODO: もうちょい見た目なんとかする？ */}
                <li>
                    {input.name}{' '}
                    <input {...input} placeholder={label} type={type} />
                </li>
                {/* touched されてエラーの条件に引っ掛かった場合 error の中身を表示 */}
                {touched && error && <span>{error}</span>}
            </div>
        );
    }

    async onSubmit(values) {
        await this.props.putTodo(values);
        this.props.history.push('/');
    }

    async onDeleteClick() {
        // console.log(this.props.match); // {path: "/todo/:id", url: "/todo/10012", isExact: true, params: { {id: "10012"} }}
        const { id } = this.props.match.params;
        await this.props.deleteTodo(id);
        this.props.history.push('/');
    }

    render() {
        // console.log('render!');

        // `const handleSubmit = this.props.handleSumbit` と同じ
        // render が実行されたときに渡ってくる関数
        const { handleSubmit, pristine, submitting, invalid } = this.props;
        return (
            <>
                <h1>Detail</h1>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <Field
                            label="activity name"
                            name="activityName"
                            type="text"
                            component={this.renderField}
                        ></Field>
                    </div>
                    {/* TODO: 選択式にする(Progress の一覧を返すエンドポイント作成 or 固定値で指定) */}
                    <div>
                        <Field
                            label="progress"
                            name="progress"
                            type="text"
                            component={this.renderField}
                        ></Field>
                    </div>
                    {/* TODO: 以下のように選択式にする(Category の一覧を返すエンドポイント作成 or 固定値で指定) */}
                    {/*
                    <label for="category">category</label>
                        <select name="category">
                            <option value="None">None</option>
                            <option value="Job">Job</option>
                            <option value="Housework">Housework</option>
                            <option value="Hobby">Hobby</option>
                            <option value="Other">Other</option>
                        </select>
                    */}
                    <div>
                        <Field
                            label="category"
                            name="category"
                            type="text"
                            component={this.renderField}
                        ></Field>
                    </div>
                    <div>
                        <Field
                            label="label"
                            name="label"
                            type="text"
                            component={this.renderField}
                        ></Field>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Update"
                            disabled={pristine || submitting || invalid}
                        ></input>
                        <Link to="/">Cancel</Link>
                        <Link to="/" onClick={this.onDeleteClick}>
                            Delete
                        </Link>
                    </div>
                </form>
            </>
        );
    }
}

const validate = (values) => {
    // console.log(values); // {activityName: "aaaa", category: "sss", label: "dddd"} // 入力するたびに values が更新される
    const errors = {};
    if (!values.activityName)
        errors.activityName = 'Enter activity name, please';
    if (!values.category) errors.category = 'Choose category, please';

    return errors;
};

// reducer 側の todo 情報をバインド
// 現時点の state とこのコンポーネントが持つ props を引数にとる
const mapStateToProps = (state, ownProps) => {
    // console.log(state); // {todo: {…}, form: {…}}
    // console.log(state.todo); // {1000: {…}, 1001: {…}, 1002: {…}, 1003: {…}, 1004: {…}, 1005: {…}, 10002: {…}, 10003: {…}, 10004: {…}, 10005: {…}, 10006: {…}, 10007: {…}}
    // console.log(ownProps); // {history: {…}, location: {…}, match: {…}, staticContext: undefined}
    const todo = state.todo[ownProps.match.params.id];
    return { initialValues: todo, todo };
};

const mapDispatchToProps = { deleteTodo, getTodo, putTodo };

export default connect(
    mapStateToProps,
    // null // deleteTodo を実装するまでは仮に null にしておく
    mapDispatchToProps
)(
    // enableReinitialize を true にすると、 initialValues の prop が変更になるたびに、 form が再度初期化される
    reduxForm({ validate, form: 'todoDetailForm', enableReinitialize: true })(
        TodoDetail
    )
);
