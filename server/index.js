import express from 'express'
import cors from "cors"
const app = express();



//Middleware
app.use(express.json())
app.use(cors())

const port = 3000;

let todos = [];

app.get("/", (req, res) => {
    res.json({ todos })
})

app.post("/todo", (req, res) => {
    const { title } = req.body

    if (!title) return res.status(404).send({
        message: "Title is required"
    })

    const obj = {
        title,
        id: Date.now()
    }
    todos.push(obj)

    res.json({
        message: "Todo added successfully ",
        todo: obj
    })
})

app.put("/todo/:id", (req, res) => {
    const { id } = req.params
    const { title } = req.body

    if (!title) return res.status(404).send({
        message: "Title is required"
    })

    const index = todos.findIndex(item => item.id === +id)

    if (index === -1) return res.status(404).send({
        message: "Todo not found"
    })

    todos[index].title = title

    res.send({
        message: "todo updated successfully",
    })
})

app.delete("/todo/:id", (req, res) => {
    const { id } = req.params;
    todos = todos.filter(item => item.id != +id);
    res.send({
        message: "Todo deleted successfully"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})