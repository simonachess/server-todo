const Page = require('../components/Page.js');

class PageNewTodo extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'New';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `
        <div class="container">
            <h1>New TODO</h1>
                <form>
                    <label for="text">Text field</label>
                    <textarea id="text" placeholder="Add new task here..."></textarea>
                    <span class="focus-text-area"></span>
                    <label for="status">Status</label>
                        <select id="status">
                            <option value="1">New</option>
                            <option value="2">Pending</option>
                            <option value="3">Done</option>
                        </select>
                    <button type="submit">Confirm task</button>
                </form>
                <a href="/">Back to tasks list</a>
        </div>
        <script src="js/newTodo.js"></script> `;
    }
}

module.exports = PageNewTodo;