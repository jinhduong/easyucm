import express from 'express'
import cors from 'cors'
import bodyParser, { json } from 'body-parser'
import accImpl from './db/account'
import ucmImpl from './db/ucm'
import { AccountModel } from './models/account'
import { UcmModel } from './models/ucm'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.json('Hello world')
})

app.post('/register', async (req, res) => {
    const body: AccountModel = req.body

    if (!body.email) {
        return res.json('invalid format')
    }

    const token = await accImpl.add(req.body)

    if (token)
        res.json({
            token,
            email: body.email,
        })
    else
        res.json({
            message: 'email already exists',
        })
})

app.post('/ucm/add/:token', async (req, res) => {
    const ucm: UcmModel = {
        token: req.params.token,
        data: req.body,
    }

    const result = await ucmImpl.addUcm(ucm, ucm.token)

    return res.json(result)
})

app.listen(port, () => console.log(`Server running at ${port}`))
