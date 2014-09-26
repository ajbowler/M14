require.config({
    'paths': {
        'jquery': 'lib/jquery',
        'react': 'lib/react',
        'JSXTransformer': 'lib/JSXTransformer',
        'jsx': 'lib/jsx'
    },
    'jsx': {
        'fileExtension': '.jsx'
    }
});

require(['jquery', 'react'], function($, React) {
    // Entry point for the program
    // React.renderComponent(<Hello />, document.getElementById('hello'));
    React.renderComponent(React.DOM.h1(null, 'Hello, world!'),document.getElementById('hello'));
});
