const {usercontroller }  = require('../controllers/index')
const resolvers = {
    Query : {
       _dummy : () => "Working"
    },
    Mutation:{
        signUp:usercontroller.signUp,
        signin:usercontroller.signin
    }
}

module.exports = {resolvers }