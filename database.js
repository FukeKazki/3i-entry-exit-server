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

    // 入場時間投稿
    async entryPost(user_handle, time) {
        const insert_text = 'INSERT INTO entry (user_handle, entry_time) VALUES ($1, $2)'
        const client = await this.pool.connect()
        await client.query(insert_text, [user_handle, time])
        client.release()
    }

    // 退場時間投稿
    async exitPost(user_handle, time) {
        const insert_text = 'INSERT INTO exit (user_handle, exit_time) VALUES ($1, $2)'
        const client = await this.pool.connect()
        await client.query(insert_text, [user_handle, time])
        client.release()
    }
}