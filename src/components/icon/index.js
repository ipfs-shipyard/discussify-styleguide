import React from 'react';
import Icon from './Icon';
import checkmarkSvg from '../../media/icons/checkmark.svg';
import closeSvg from '../../media/icons/close.svg';
import crossmarkSvg from '../../media/icons/crossmark.svg';
import editSvg from '../../media/icons/edit.svg';
import linkSvg from '../../media/icons/link.svg';
import removeSvg from '../../media/icons/remove.svg';
import replySvg from '../../media/icons/reply.svg';
import retrySvg from '../../media/icons/retry.svg';
import shareSvg from '../../media/icons/share.svg';
import submitSvg from '../../media/icons/submit.svg';
import warningSvg from '../../media/icons/warning.svg';

const CheckmarkIcon = (props) => <Icon { ...props } svg={ checkmarkSvg } />;
const CloseIcon = (props) => <Icon { ...props } svg={ closeSvg } />;
const CrossmarkIcon = (props) => <Icon { ...props } svg={ crossmarkSvg } />;
const EditIcon = (props) => <Icon { ...props } svg={ editSvg } />;
const LinkIcon = (props) => <Icon { ...props } svg={ linkSvg } />;
const RemoveIcon = (props) => <Icon { ...props } svg={ removeSvg } />;
const ReplyIcon = (props) => <Icon { ...props } svg={ replySvg } />;
const RetryIcon = (props) => <Icon { ...props } svg={ retrySvg } />;
const ShareIcon = (props) => <Icon { ...props } svg={ shareSvg } />;
const SubmitIcon = (props) => <Icon { ...props } svg={ submitSvg } />;
const WarningIcon = (props) => <Icon { ...props } svg={ warningSvg } />;

export default Icon;
export {
    CheckmarkIcon,
    CloseIcon,
    CrossmarkIcon,
    EditIcon,
    LinkIcon,
    RemoveIcon,
    ReplyIcon,
    RetryIcon,
    ShareIcon,
    SubmitIcon,
    WarningIcon,
};
