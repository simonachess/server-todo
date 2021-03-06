const Page = require('../components/Page.js');

// const array = [
//     {
//         id: 1,
//         text: "get milk",
//         status: "new",
//         date: "2021-11-05"
//     },
//     {
//         id: 2,
//         text: "read 10 pages",
//         status: "pending",
//         date: "2021-11-06"
//     },
//     {
//         id: 3,
//         text: "drink coffee",
//         status: "done",
//         date: "2021-11-05"
//     },
// ]

class PageHome extends Page {
    constructor(connection) {
        super();
        this.route = '';
        this.pageName = 'List';
        this.pageTemplateName = 'home';
        this.connection = connection;
    }

    getData = async () => {
        try {
            const query = 'SELECT * FROM `tasks`';
            const result = await this.connection.execute(query);
            return result[0];
        } catch (error) {
            console.log('Nepavyko sukurti uzduociu lenteles');
            console.log(error);
            return error;
        }
    }

    createTaskList(array) {
        let result = '';
        for (const task of array) {
            const formatedDate = new Date(task.date);
            const dateString = `
            ${formatedDate.getFullYear()}-${formatedDate.getMonth() + 1}-${formatedDate.getDate()}
            `
            result += `
                <tr>
                    <td>${task.id}</td>
                    <td>${task.text.slice(0, 10)}...</td>
                    <td>${task.status}</td>
                    <td>${dateString}</td>
                    <td>
                        <button data-action="update" data-taskId="${task.id}" class="btn-update">Update</button>
                        <button data-action="delete" data-taskId="${task.id}" class="btn-delete" >Delete</button>
                    </td>
                </tr>
`
        }
        return result;
    }




    async bodyHTML() {
        const array = await this.getData();
        console.log(array);
        return `
            <div class="tasks-container">
                <h1>TODO list</h1>
                <a href="/new" class="new-task">Add new task</a>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    ${this.createTaskList(array)}
                    </table>
            </div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <form>
                        <label for="id">ID</lable>
                        <input id="id" type="number" readonly>
                        <label for="text">Text field</label>
                        <textarea id="text" placeholder="Add new task here..."></textarea>
                        <span class="focus-text-area"></span>
                        <label for="status">Status</label>
                            <select id="status">
                                <option value="1">New</option>
                                <option value="2">Pending</option>
                                <option value="3">Done</option>
                            </select>
                        <button type="submit">Update task</button>
                    </form>
                </div>
            </div>
            <script src="js/home.js"></script>
        `;
    }
}


module.exports = PageHome;