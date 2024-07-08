import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Введите email').isEmail(),
    body('password', 'Пароль должен содержать не менее 4 символов').isLength({ min: 4 })
];

export const registerValidation = [
    body('name', 'Введите имя').isString(),
    body('email', 'Введите email').isEmail(),
    body('password', 'Пароль должен содержать не менее 4 символов').isLength({ min: 4 }),
    body('about', 'Расскажите о себе').isLength({ min: 20 }),
    body('role', 'Укажите роль').isString()
]

export const createValidation = [
    body('vacancy', 'Введите вакансию').isLength({ min: 1 }).isString(),
    body('description', 'Введите описание').isLength({ min: 20 }).isString(),
    body('salary', 'Введите зарплату').isLength({ min: 1 }),
    body('location', 'Введите место работы').isLength({ min: 1 }).isString(),
    body('employment', 'Введите занятость').isLength({ min: 1 }).isString(),
    body('experience', 'Введите опыт работы').isLength({ min: 1 }).isString(),
    body('category', 'Введите категорию работы').isLength({ min: 1 }).isString()
]

export const createCompany = [
    body('name', 'Введите название копмании').isLength({ min: 1 }).isString(),
    body('description', 'Введите описание компании').isLength({ min: 1 }).isString()
]