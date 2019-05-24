'use strict'

const User = use("App/Models/User")

class UserController {
    async create ({ request }) {
        try {
            const data = request.only(["username", "email", "password", "role"])

            const user = await User.create(data)
    
            return user
        } catch (err) {
            console.log(err)
        }
        
    }

    async index ({ auth }) {
        const users = User.query()
            .with('sales')
            .fetch()

        const { role } = auth.user
        if (role !== 'admin') {
            throw Error('You are not authorized')
        } else {
            return users
        }
    }

    async show ({ auth }) {
        const { id } = auth.user
        const user = await User.findOrFail(id)

        await user.load('sales')

        return user
    }
}

module.exports = UserController
