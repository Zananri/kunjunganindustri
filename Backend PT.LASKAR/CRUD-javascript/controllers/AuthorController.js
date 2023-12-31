const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const pool = mysql.createPool(dbConfig)


const getAuthors = (req, res) =>{
    const query = "SELECT * FROM authors"

    pool.getConnection((err, connection) =>{
        if(err) throw err
        
        connection.query(query, (err, results) =>{
            if(err) throw err

            responseSuccess(res, results, 'Books successful fetched')
        })

        connection.release()
    })
}
const getAuthor = ((req, res) => {
    const id = req.params.id

    const query = `SELECT * FROM authors WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.length == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, result, 'Book successfully fetched')
        })

        connection.release()
    })
})

const addAuthor = (req, res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial,
    }

    const query = 'INSERT INTO authors SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, result) => {
            if(err) throw err

            responseSuccess(res, result, 'Book successfully added')
        })
        connection.release()
    })
}

const updateAuthor = (req, res) =>{
    const id = req.params.id

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial,
    }

    const query = `UPDATE authors SET ? WHERE id=${id}`

    pool.getConnection((err, connection) =>{
        if(err) throw err

        connection.query(query, [data], (err, results) =>{
            if(err) throw err

            if(results.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Book successfully updated')
        })

        connection.release()
    })
}

const deleteAuthor = (req, res) =>{
    const id = req.params.id

    const query = `DELETE FROM authors WHERE id=${id}`

    pool.getConnection((err, connection) =>{
        if(err) throw err

        connection.query(query, (err, results) =>{
            if(err) throw err
            
            if(results.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Book successfully deleted')
        })

        connection.release()
    })
}

module.exports = {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}