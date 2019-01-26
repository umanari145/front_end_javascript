const mysql = require('sync-mysql');
const Sugar = require('Sugar');

module.exports =  class DButil{

    /**
     * DBへの接続
     * @param string hostname   DBホスト
     * @param string dbname     DB名
     * @param string dbuser     DBユーザー
     * @param string dbpassword DBパスワード
     */
    constructor(hostname, dbname, dbuser, dbpassword){
        var tmp_con = new mysql({
            host:hostname,
            database:dbname,
            user:dbuser,
            password:dbpassword
        })
        this.con = tmp_con;
    }

    /**
     * select文の実行
     * @param  string sql sqlの実行
     * @return array
     */
    select(sql){
        let res = this.con.query(sql);
        if (res && res.length > 0) {
            return res
        } else {
            return false;
        }
    }

    /**
     * insert文の実行
     * @param  string table_name テーブル名
     * @param  object object     ハッシュ
     * @return res レスポンスオブジェクト
     */
    insert(table_name, obj){

        let columns = Sugar.Object.keys(obj)
        let values  = Sugar.Object.values(obj)
        values = values.map((v) => {
            return "'" + v + "'"
        });

        let column_str = columns.join(',')
        let values_str = values.join(',')

        let insert_sql = Sugar.String('INSERT INTO {table} ({column_str}) VALUES ({values_str}) ').format({
            table:table_name,
            column_str:column_str,
            values_str:values_str
        }).raw;

        let res = this.con.query(insert_sql);
        return res
    }

    /**
     * insert文の実行
     * @param  string table_name テーブル名
     * @param  object object     ハッシュ
     * @return res レスポンスオブジェクト
     */
    bulk_insert(table_name, arr){

        let columns_arr = new Array();
        let total_values_arr = new Array();
        Sugar.Array(arr).forEach((v,i) =>{
            if (i == 0) {
                columns_arr = Sugar.Object.keys(v)
            }
            let each_values_arr = Sugar.Object.values(v)
                            .map((v)=>{return "'" + v + "'"})
            let each_values_str = Sugar.String('({0})').format(each_values_arr.join(",")).raw
            total_values_arr.push(each_values_str)
        })

        let bulk_insert_sql = Sugar.String('INSERT INTO {table} ({column_str}) VALUES {values_str}').format({
            table:table_name,
            column_str:columns_arr.join(","),
            values_str:total_values_arr.join(",")
        }).raw
        let res = this.con.query(bulk_insert_sql);
        return res
    }

    /**
     * update文の実行
     * @param  string table_name  テーブル名
     * @param  object object      ハッシュ
     * @param  object where_str   更新用のwhere
     * @return res レスポンスオブジェクト
     */
    update(table_name, obj, where_str){

        let columns_arr = new Array();
        let total_values_arr = new Array();

        let update_arr = new Array()
        Sugar.Object(obj).forEach((v,k) =>{
            let each_update_str = Sugar.String("{column_name} = '{value}'").format({
                column_name:k,
                value:v
            }).raw
            update_arr.push(each_update_str)
        })

        let update_sql = Sugar.String('UPDATE {table} SET {update_str} WHERE {where_str}').format({
            table:table_name,
            update_str:update_arr.join(","),
            where_str:where_str
        }).raw
        let res = this.con.query(update_sql);
        return res
    }

    /**
     * delete文の実行
     * @param  string table_name  テーブル名
     * @param  object where_str   更新用のwhere
     * @return res レスポンスオブジェクト
     */
    delete(table_name, where_str){
        let delete_sql = Sugar.String('DELETE FROM {table} WHERE {where_str}').format({
            table:table_name,
            where_str:where_str
        }).raw
        let res = this.con.query(delete_sql);
        return res
    }
}
