import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon';
import logoSvg from '../../media/logos/discussify.svg';
import logoAbbr from '../../media/logos/discussify-abbr.svg';
import styles from './BrandLogo.css';

const logosMap = {
    normal: logoSvg,
    abbr: logoAbbr,
};

const BrandLogo = ({ variant, colored, className, ...rest }) => {
    const finalClassName = classNames(
        styles.brandLogo,
        styles[variant],
        colored && styles.colored,
        className
    );

    return <Icon { ...rest } svg={ logosMap[variant] } className={ finalClassName } />;
};

BrandLogo.propTypes = {
    variant: PropTypes.oneOf(['normal', 'abbr']).isRequired,
    colored: PropTypes.bool,
    className: PropTypes.string,
};

export default BrandLogo;
