import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { postTodo } from '../actions';

class TodoNew extends Component {
    // 新規ページ作成の描画時にやりたい処理はない
    // componentDidMount() {
    // }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
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
                {/* <input name="activityName" value="aaa"> */}
                <input {...input} placeholder={label} type={type} />
                {/* touched されてエラーの条件に引っ掛かった場合 error の中身を表示 */}
                {touched && error && <span>{error}</span>}
            </div>
        );
    }

    async onSubmit(values) {
        // console.log(values); // {activityName: "ccccc", category: "None", label: "aaa"}
        await this.props.postTodo(values);
        this.props.history.push('/');
    }

    render() {
        // console.log('render!');

        // `const handleSubmit = this.props.handleSumbit` と同じ(render が実行されたときに渡ってくる関数)
        // pristine は何も入力されていない状態、 submitting は送信中かを示す
        const { handleSubmit, pristine, submitting } = this.props;
        // console.log(`pristine:${pristine}, submitting: ${submitting}`);
        return (
            <>
                <h1>Register</h1>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <Field
                            label="activity name"
                            name="activityName"
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
                            value="Submit"
                            disabled={pristine || submitting}
                        ></input>
                        <Link to="/">Cancel</Link>
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

const mapDispatchToProps = { postTodo };

// todo に関する状態を描写しないので、 mapStateToProps は null
export default connect(
    null,
    mapDispatchToProps
    // null
)(reduxForm({ validate, form: 'todoNewForm' })(TodoNew));
