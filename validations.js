import { body } from 'express-validator';

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 2 }),
];

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({ min: 2 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Please input post title').isLength({ min: 3}).isString(),
    body('text', 'Please input some text').isLength({ min: 10 }).isString(),
    body('tags', 'Wrong tags format(give array)').optional().isString(),
    body('imageUrl', 'Wrong link').optional().isString(),
];