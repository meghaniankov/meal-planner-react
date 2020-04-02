const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json())

//routes

//create new dish
app.post('/dishes', async(req,res) => {
  try {
    const { name } = req.body
    const newDish = await pool.query(
      "INSERT INTO main_dish (name) VALUES($1) RETURNING *", 
      [name]
    )

    res.json(newDish.rows[0])
  } catch(err) {
    console.error(err.message)
  }
})

//get all dishes
app.get('/dishes', async(req, res) => {
  try {
    const allDishes = await pool.query("SELECT * FROM main_dish")
    res.json(allDishes.rows)
  } catch (err) {
    console.log(err.message)
  }
})

//get a dish

app.get('/dishes/:id', async(req, res) => {
  try {
    const { id } = req.params
    const dish = await pool.query("SELECT * FROM main_dish WHERE id = $1", [id])

    res.json(dish.rows[0])
  } catch (err) {
    console.log(err.message)
  }
})

//update a dish
//delete a dish

app.listen(5000, () => {
  console.log('server has started on port 5000')
})