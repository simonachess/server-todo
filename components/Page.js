class Page {
    constructor() {
        this.title = 'TODO';
        this.baseURL = 'http://localhost:3000/';
        this.route = '';
        this.pageName = 'Home';
        this.pageTemplateName = 'home';
    }

    baseHref() {
        return this.baseURL + this.route + (this.route === '' ? '' : '/');
    }

    async bodyHTML() {
        return `Page content`;
    }

    async render() {
        return `<!DOCTYPE html>
                <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${this.pageName} | ${this.title}</title>

                    <base href="${this.baseHref()}">
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                    <link rel="manifest" href="/site.webmanifest">
                    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
                    <meta name="msapplication-TileColor" content="#da532c">
                    <meta name="theme-color" content="#ffffff">

                    <link rel="stylesheet" href="/css/page/${this.pageTemplateName}.css">
                </head>

                <body>
                    ${await this.bodyHTML()}
                </body>

                </html>`;
    }
}

module.exports = Page;