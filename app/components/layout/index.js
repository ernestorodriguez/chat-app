module.exports = ({ body, title }) => `
        <!DOCTYPE html>
            <html>
                <head>
                    <title>${title}</title>
                </head>
                <body>
                    <div id="root-app">${body}</div>
                </body>
                
        </html>
    `;
