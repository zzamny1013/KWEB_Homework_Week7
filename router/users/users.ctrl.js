const mysql_db = require('../../database/db.config')();
const pool = mysql_db.init();

async function processQuery(query,data) {
    try {
            const conn = await pool.getConnection();
            try {
                const sql = conn.format(query,data);
                const [result] = await conn.query(sql);
                conn.release();
                return result;
            } catch (e) {
                conn.release();
            throw e;
        }
    } catch (e) {
        throw e;
    }
}

exports.findUsers = async (req,res) => {
    try{
        const result = await processQuery('SELECT * FROM `users`', []);
        res.json(result);
    }catch(e){
        throw e;
    }
};

exports.findUsersById = async (req, res) =>{
    try{
        const{uid} = req.params;
        const result = await processQuery('SELECT * FROM `users` WHERE uid = ?', [uid]);
        res.json(result);
    }catch(e){
        throw e;
    }
};

