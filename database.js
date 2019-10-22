import {
    Pool
} from 'pg'

// テスト用環境変数の取得
import config from './config'

module.exports = class db {
    constructor() {
        // プールの作成
        this.pool = new Pool({
            host: config.database_host,
            database: config.database_name,
            user: config.database_user,
            port: config.database_port,
            password: config.database_password,
            // sslをtrueにしないとうまくいかない
            ssl: true,
        })
    }
    // 通常クエリ
    async query(param) {
        const client = await this.pool.connect()
        const {
            rows
        } = await client.query(param)
        client.release()
        return rows
    }

    //時刻投稿用クエリ
    async timePost(user_handle, conditions, time) {
        const insertText = 'INSERT INTO time_log (user_handle, conditions, time) VALUES ($1, $2, $3)'
        const client = await this.pool.connect()
        await client.query(insertText, [user_handle, conditions, time])
        client.release()
    }
}