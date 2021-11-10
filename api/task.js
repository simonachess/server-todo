const handlers = {}

handlers.task = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._task[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._task = {}

handlers._task.get = async (data, callback) => {
    // gaunam user info
    console.log("task.get")
}

handlers._task.post = async (data, callback) => {
    // irasom user info
    // console.log(data)
    const db = data.db;
    const payload = data.payload;
    console.log(payload)

    try {
        const query = "INSERT INTO `tasks`(`text`, `status`) VALUES ('" + payload.text + "','" + payload.status + "')";
        //neveikia
        console.log(payload)
        await db.execute(query);
        return callback(200, "Succeded to create task!")
    } catch (error) {
        console.log('Nepavyko sukurti uzduociu lenteles');
        console.log(error);
        return callback(404, "Failed to create a task!");
    }
}

handlers._task.put = async (data, callback) => {
    // atnaujinam user info
    console.log("task.put")
}

handlers._task.delete = async (data, callback) => {
    // istrinam user info
    const db = data.db;
    const payload = data.payload;
    console.log(payload)

    try {
        const query = "DELETE FROM `tasks` WHERE `tasks`.`id` =" + payload;
        await db.execute(query);
        return callback(200, "Succeded to delete task!")
    } catch (error) {
        console.log('Nepavyko sukurti uzduociu lenteles');
        console.log(error);
        return callback(404, "Failed to delete task!");
    }
}

module.exports = handlers;
