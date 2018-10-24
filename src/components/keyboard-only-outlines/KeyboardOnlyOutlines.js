import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import keyboardOnlyOutlines from 'keyboard-only-outlines';

const getStylesheetTarget = (node) => {
    const rootNode = node.getRootNode ? node.getRootNode() : document;

    return rootNode === document ? document.head : rootNode;
};

export default class KeyboardOnlyOutlines extends Component {
    static propTypes = {
        children: PropTypes.node,
        stylesheetTarget: PropTypes.object,
        styles: PropTypes.string,
    };

    componentDidMount() {
        const node = findDOMNode(this);

        if (!node) {
            throw new Error('Unable to find DOM node, did the children actually rendered a DOM element?');
        }

        const options = {
            stylesheetTarget: this.props.stylesheetTarget || getStylesheetTarget(node),
        };

        if (this.props.styles != null) {
            options.styles = this.props.styles;
        }

        this.dispose = keyboardOnlyOutlines(options);
    }

    componentWillUnmount() {
        this.dispose && this.dispose();
    }

    render() {
        return this.props.children;
    }
}
