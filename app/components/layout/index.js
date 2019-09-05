module.exports = ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};
// <link rel="stylesheet" href="/assets/index.css" />
//      <script src="/assets/bundle.js"></script>
