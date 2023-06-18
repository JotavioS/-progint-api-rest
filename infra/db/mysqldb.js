
async function getConnection(){
    if(global.connection && global.connection.state == 'disconnected'){
        return global.connection;
    }

    const mysql = await require('mysql2/promise');

    const con = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'prova'
      });
    global.connection = con;
    return con;

}
module.exports = {getConnection}