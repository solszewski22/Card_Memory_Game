const sqlite3 = require('sqlite3');

class DBAbstraction {
    constructor(fileName){
        // path to the sqlite database
        this.fileName = fileName;
    }

    init() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.fileName, async (err) => {
                if(err){
                    // error opening the database
                    reject(err);
                }
                else {
                    // database open successfully
                    try{
                        // asynchronously wait for the createTables method to finish to resolve/reject the Promise
                        await this.createTables();
                        resolve();
                    }
                    catch(err){
                        reject(err);
                    }
                }
            });
        });
    }

    createTables() {
        const sql = `
            CREATE TABLE IF NOT EXISTS 'Cards' (
                'id' INTEGER,
                'title' TEXT,
                'imgURL' TEXT,
                PRIMARY KEY('id')
            );
        `;

        return new Promise((resolve, reject) => {
            this.db.run(sql, [], (err) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    insertCard(title, imgURL) {
        const sql = `INSERT INTO Cards(title, imgURL) Values (?, ?);`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, [title, imgURL], (err) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    getAllCards() {
        const sql = `
            SELECT *
            FROM Cards;
        `;
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
}

// export the class to be used in other files (like index.js)
module.exports = DBAbstraction;