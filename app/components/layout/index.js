module.exports = ({ body, title }) => `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
            </head>
            <body>
                <div id="root-app">${body}</div>
            </body> 
        </html>
    `;
