const handlers = {}

handlers.user = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._user[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._user = {}

handlers._user.get = async (data, callback) => {
    // gaunam user info
    console.log("user.get")
}

handlers._user.post = async (data, callback) => {
    // irasom user info
    console.log("user.post")
}

handlers._user.put = async (data, callback) => {
    // atnaujinam user info
    console.log("user.put")
}

handlers._user.delete = async (data, callback) => {
    // istrinam user info
    console.log("user.delete")
}

module.exports = handlers;
