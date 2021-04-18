import _ from 'lodash';
import { DELETE_TODO, READ_TODO, READ_TODOS } from '../actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default (todo = {}, action) => {
    switch (action.type) {
        case READ_TODOS:
            // 配列構造のため、特定の id を処理したくても全てを取り出して処理することになり効率が悪い
            // console.log(action.response.data);
            // [{"id":1000,"activityName":"go to supermarket","progress":"Open","category":"Housework","label":"my-label"},{"id":1001,"activityName":"listen to music","progress":"Open","category":"Hobby","label":null},{"id":1002,"activityName":"make a presentation","progress":"Open","category":"Job","label":null},{"id":1003,"activityName":"organize documentation","progress":"Doing","category":"Job","label":"presentation"},{"id":1004,"activityName":"approve the budget","progress":"Done","category":"Job","label":"important"},{"id":1005,"activityName":"test","progress":"Done","category":"Other","label":null},{"id":10002,"activityName":"test","progress":"Open","category":"None","label":null}]

            // 各要素のオブジェクトとの id の value を key にもつ object のかたまりに整形
            // console.log(_.mapKeys(action.response.data, 'id'));
            // {
            // "1000": { "id": 1000, "activityName": "go to supermarket", "progress": "Open", "category": "Housework", "label": "my-label" },
            // "1001": { "id": 1001, "activityName": "listen to music", "progress": "Open", "category": "Hobby", "label": null },
            // }
            return _.mapKeys(action.response.data, 'id');
        case DELETE_TODO:
            // console.log(action.id); // action creator(actions/index.js) から値を渡せているか
            delete todo[action.id]; // 該当のオブジェクトから id を削除
            return { ...todo }; // 新しいメモリ空間上に配置するために、スプレッド演算子を使用
        case READ_TODO:
            // console.log(action); // {type: "READ_TODO", response: {…}}
            // console.log(action.response.data); // {id: 10006, activityName: "aaaaaa", progress: "Open", category: "None", label: "aaa"}

            // 最新のデータに更新するので、 data の id を key にした data オブジェクトで上書きする
            // state 内に todo として保存されているものの 10006 番を action にて取得した最新のデータにする
            const data = action.response.data;
            return { ...todo, [data.id]: data };
        default:
            return todo;
    }
};
