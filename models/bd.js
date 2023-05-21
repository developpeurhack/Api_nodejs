import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "liste",
    port:8889

})

db.connect((error) => {
    if (error) { throw error }
else {
    console.log('your connected')
};
})
export default db