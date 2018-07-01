import React from 'react';
import Icon from './Icon';
import closeSvg from '../../media/icons/close.svg';
import editSvg from '../../media/icons/edit.svg';
import linkSvg from '../../media/icons/link.svg';
import removeSvg from '../../media/icons/remove.svg';
import replySvg from '../../media/icons/reply.svg';
import shareSvg from '../../media/icons/share.svg';
import submitSvg from '../../media/icons/submit.svg';
import warningSvg from '../../media/icons/warning.svg';

const CloseIcon = (props) => <Icon { ...props } svg={ closeSvg } />;
const EditIcon = (props) => <Icon { ...props } svg={ editSvg } />;
const LinkIcon = (props) => <Icon { ...props } svg={ linkSvg } />;
const RemoveIcon = (props) => <Icon { ...props } svg={ removeSvg } />;
const ReplyIcon = (props) => <Icon { ...props } svg={ replySvg } />;
const ShareIcon = (props) => <Icon { ...props } svg={ shareSvg } />;
const SubmitIcon = (props) => <Icon { ...props } svg={ submitSvg } />;
const WarningIcon = (props) => <Icon { ...props } svg={ warningSvg } />;

export default Icon;
export {
    CloseIcon,
    EditIcon,
    LinkIcon,
    RemoveIcon,
    ReplyIcon,
    ShareIcon,
    SubmitIcon,
    WarningIcon,
};
