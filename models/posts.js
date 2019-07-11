const db = require("./conn.js");

class Posts {
    constructor(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from posts;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(
                `select * from posts where id = ${p_id}`
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async removeEntry(p_id) {
        try {
            const response = await db.result(
                `delete from posts where id = ${p_id}`
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addEntry(title, author_id, content) {
        const query = `insert into posts (title, author_id, content) values ('${title}', ${author_id}, '${content}')`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async updateEntry(id, column, content) {
        const query = `update posts set ${column} = ${content} where id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Posts;
