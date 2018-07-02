import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon';
import logotypeSvg from '../../media/logos/discussify-logotype.svg';
import logomarkSvg from '../../media/logos/discussify-logomark.svg';
import styles from './BrandLogo.css';

const Logotype = () => <Icon svg={ logotypeSvg } className={ styles.logotype } />;
const Logomark = () => <Icon svg={ logomarkSvg } className={ styles.logomark } />;

const BrandLogo = ({ variant, colored, className, ...rest }) => {
    const finalClassName = classNames(
        styles.brandLogo,
        styles[variant],
        colored && styles.colored,
        className
    );

    const renderLogomark = variant === 'horizontal' || variant === 'vertical' || variant === 'logomark';
    const renderLogotype = variant === 'horizontal' || variant === 'vertical' || variant === 'logotype';

    return (
        <div { ...rest } className={ finalClassName }>
            { renderLogomark ? <Logomark /> : null }
            { renderLogotype ? <Logotype /> : null }
        </div>
    );
};

BrandLogo.propTypes = {
    variant: PropTypes.oneOf(['horizontal', 'vertical', 'logomark', 'logotype']).isRequired,
    colored: PropTypes.bool,
    className: PropTypes.string,
};

export default BrandLogo;
