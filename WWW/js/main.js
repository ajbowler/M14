require.config({
    'paths': {
        'jquery': 'lib/jquery',
        'react': 'lib/react',
        'jsx': 'lib/jsx',
        'JSXTransformer': 'lib/JSXTransformer'
    },

    'jsx': {
    	'fileExtension': '.jsx'
    }
});

require(['jquery', 'react'], function($, React) {
    // Entry point for the program
   	var helloText = React.createClass({
   		render: function() {
   			return (
   				React.DOM.div({className: "helloText"},
   				"Hello, world! React is cool!")
   			);
   		}
   	});

   	var helloTextJQuery = React.createClass({
   		render: function() {
   			return (
   				React.DOM.div({className: "helloText"},
   				"Hello, world! React is cool! And it works with jquery!")
   			);
   		}
   	});

   	React.renderComponent(
   		helloText(null),
   		document.getElementById('content')
   	);

   	var jqueryDiv = $('#content_jquery').get(0);

   	React.renderComponent(
   		helloTextJQuery(null),
   		jqueryDiv
   	);
});
