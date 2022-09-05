class UserService{
    async createUser(user_name, password){
        return `写入成功${user_name}and ${password}`
    }
}

module.exports = new UserService()