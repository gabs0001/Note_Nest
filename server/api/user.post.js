// /api/user POST

import prisma from "~/lib/prisma"
import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
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

        //create hash password
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(body.password, salt)

        //sends to database
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: passwordHash,
                salt: salt
            }
        })

        //create json web token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
        setCookie(event, 'NoteNestJWT', token)

        return {
            data: 'success!'
        }
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

// GET
// POST
// PATCH
// PUT
// DELETE