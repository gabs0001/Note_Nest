// /api/login POST

import prisma from "~/lib/prisma"
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async event => {
    try {
        const body = await readBody(event)

        //validation
        if(!validator.isEmail(body.email)) {
            throw createError({
                statusCode: 400,
                message: 'Invalid email!'
            })
        }

        if(!validator.isStrongPassword(body.password, {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0
        })) {
            throw createError({
                statusCode: 400,
                message: 'Invalid password!'
            })
        }

        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        })

        const isValid = await bcrypt.compare(body.password, user.password)

        if(!isValid) {
            throw createError({
                statusCode: 400,
                message: 'Username or password is invalid!'
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

        setCookie(event, 'NoteNestJWT', token)

        return { data: 'success!' }
    } 
    catch(error) {
        if(error.code === 'P2002') {
            throw createError({
                statusCode: 409,
                message: 'Email already exists!'
            })
        }
        throw error
    }
})