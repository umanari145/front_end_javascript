const mysql = require('sync-mysql');
const Sugar = require('Sugar');
const log = require('log-to-file');

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
        log(sql, 'sql.log')
        let res = this.con.query(sql);
        if (res && res.length > 0) {
            return res
        } else {
            return false;
        }
    }

    /**
     * 主キーでの取得
     * @param  string table       テーブル名
     * @param  string primary_key 主キー名
     * @param  srting val         主キー値
     * @return array
     */
    find(table, primary_key, val){
        let sql = `SELECT * FROM ${table} WHERE ${primary_key} = '${val}' `
        log(sql, 'sql.log')
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
        let insert_sql = `INSERT INTO ${table_name} ( ${column_str} ) VALUES ( ${values_str})`
        log(insert_sql, 'sql.log')
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

        let column_str = columns_arr.join(",")
        let values_str = total_values_arr.join(",")

        let bulk_insert_sql = `INSERT INTO ${table_name} (${column_str}) VALUES ${values_str}`
        log(bulk_insert_sql, 'sql.log')
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
        Sugar.Object(obj).forEach((value,column_name) =>{
            let each_update_str = `${column_name} = '${value}'`
            update_arr.push(each_update_str)
        })

        let update_str = update_arr.join(",")
        let update_sql = `UPDATE ${table_name} SET ${update_str} WHERE ${where_str}`
        log(update_sql, 'sql.log')
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
        let delete_sql = `DELETE FROM ${table_name} WHERE ${where_str}`
        log(delete_sql, 'sql.log')
        let res = this.con.query(delete_sql);
        return res
    }
}
