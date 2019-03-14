'use strict'

const User = use('App/Models/User')

class AuthController {
    async register({ request, response }) {

        // We request the user data first
        const data = request.only(['username', 'email', 'password'])

        // Then we create the user object
        const user = await User.create(data)

        return response.send({ message: 'User has been successfully created', user })
    }

    async login ({ request, auth, response }) {

        const { email, password } = request.only(['email', 'password'])
    
        const token = await auth.attempt(email, password)

        return response.json(token)
    }

    async logout ({ auth, response }) {
        
        await auth.logout()

        return response.route('/login', 'AuthController.login')
    }
}

module.exports = AuthController
