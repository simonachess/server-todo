const Page = require('../components/Page.js');

class PageDeleteTodo extends Page {
    constructor() {
        super();
        this.route = '';
        this.pageName = 'New';
        this.pageTemplateName = 'home';
    }

    bodyHTML() {
        return `<h1>Delete TODO</h1>`;
    }
}

module.exports = PageDeleteTodo;