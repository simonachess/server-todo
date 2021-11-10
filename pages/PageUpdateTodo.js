const Page = require('../components/Page.js');

class PageUpdateTodo extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'New';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Update TODO</h1>`;
    }
}

module.exports = PageUpdateTodo;