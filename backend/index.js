import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'
import cors from 'cors'

import * as UserController from './controllers/UserController.js'
import * as JobController from './controllers/JobController.js'
import * as CompanyController from './controllers/CompanyController.js'

import * as validations from './validations.js'
import checkAuth from './utils/checkAuth.js'

const DBconnect = () => {
    mongoose.connect(
        'mongodb+srv://admim:wwwwww@cluster0.zc3qxlx.mongodb.net/jobs?retryWrites=true&w=majority&appName=Cluster0'
    ).then(() => {
        console.log('DB ok')
    }).catch((err) => {
        console.log('DB error', err)
    })
}

const app = express()
const PORT = 3000

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
 
app.use(express.json())
app.use(cors());
app.use('/uploads', express.static('uploads'))

app.get('/getme', checkAuth, UserController.getme);
app.post('/login', validations.loginValidation, UserController.login);
app.post('/register', validations.registerValidation, UserController.register);

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    });
});

app.get('/getall', JobController.getAll);
app.get('/getone/:id', JobController.getone);
app.get('/getProfile/:id', JobController.getProfile);
app.get('/getmyjobs', checkAuth, JobController.getmyjobs);
app.get('/getFavorite', checkAuth, JobController.getFavorite);
app.get('/getCategories', JobController.getCategories);
app.get('/addFavorite/:id', checkAuth, JobController.addFavorite);
app.post('/create', checkAuth, validations.createValidation, JobController.create);
app.patch('/update/:id', checkAuth, validations.createValidation, JobController.update);
app.delete('/delete/:id', checkAuth, JobController.remove);
app.delete('/deleteFavorite/:id', checkAuth, JobController.removeFavorite)

app.get('/getCompanies', CompanyController.getAll);
app.get('/getOneForJob/:id', CompanyController.getOneForJob);
app.get('/getOneCompany/:id', CompanyController.getOneCompany);
app.post('/createCompany', checkAuth, validations.createCompany, CompanyController.createCompany);
app.post('/addRating/:id', checkAuth, CompanyController.addRating);

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err)
    }
    DBconnect();
    console.log(`Server started: ${PORT}`);
})