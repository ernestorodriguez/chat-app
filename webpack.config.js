module.exports = {
    entry: {
        demo: './app/client/demo.js',
        chat: './app/client/chat.js',
        vendor: 'react-dom'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name(file) {
                                const bundleName = file.match(/\/(\w+)\/\w+\./)[1];

                                return `${bundleName}.css`;
                            },
                        }
                    },
                    'extract-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};
