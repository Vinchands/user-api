const express = require('express')
const db = require('../db')
const router = express.Router()

router.route('/')

.get((req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
        res.status(200).json({ users: results })
    })
})

.post((req, res) => {
    const { name, email, job } = req.body
    console.log(name, email, job)
    
    db.query('INSERT INTO users(name, email, job) VALUES(?, ?, ?)', [name, email, job], (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
        res.status(201).json({
            message: 'User created successfully',
            id: results.insertId
        })
    })
})

router.route('/:id(\\d+)')

.get((req, res) => {
    const { id } = req.params
    
    db.query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
        res.status(200).json({ user: results })
    })
})

.put((req, res) => {
    const { id } = req.params
    const { name, email, job } = req.body
    
    db.query('UPDATE users SET name = ?, email = ?, job = ? WHERE id = ?', [name, email, job, id], (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
        res.status(200).json({ message: 'User updated successfully' })
    })
})

.delete((req, res) => {
    const { id } = req.params
    
    db.query('DELETE FROM users WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error(error)
            return res.status(500).json(error)
        }
        
        res.status(200).json({ message: 'User deleted successfully' })
    })
})

module.exports = router