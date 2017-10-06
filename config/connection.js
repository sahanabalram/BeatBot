if (process.env.JAWSDB_URL) {
    console.log("Using production");
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'beatBot_db'
});
};