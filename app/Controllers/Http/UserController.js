'use strict'

const User = use("App/Models/User")

class UserController {
    async create ({ request }) {
        try {
            const data = request.only(["username", "email", "password"])

            const user = await User.create(data)
    
            return user
        } catch (err) {
            console.log(err)
        }
        
    }
}

module.exports = UserController
