import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import keyboardOnlyOutlines from 'keyboard-only-outlines';

export default class KeyboardOnlyOutlines extends Component {
    static propTypes = {
        children: PropTypes.node,
    };

    componentDidMount() {
        const node = findDOMNode(this);

        console.log(node);
        const rootNode = node.getRootNode ? node.getRootNode() : document;
        const stylesheetTarget = rootNode === document ? document.head : rootNode;

        this.dispose = keyboardOnlyOutlines({ stylesheetTarget });
    }

    componentWillUnmount() {
        this.dispose();
    }

    render() {
        return this.props.children;
    }
}
