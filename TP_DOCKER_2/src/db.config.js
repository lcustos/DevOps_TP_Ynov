// Uncomment this block to use sqlite
// module.exports = {
//     dialect: "sqlite",
//     storage: "./my-db.sqlite",
// }

// Uncomment this block to use mysql
module.exports = {
    hostname: "mysql",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "mysql",
    port: process.env.MYSQL_PORT,
}