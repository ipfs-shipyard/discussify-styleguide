import React, { forwardRef } from 'react';
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

const CheckmarkIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ checkmarkSvg } />);
const CloseIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ closeSvg } />);
const CrossmarkIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ crossmarkSvg } />);
const EditIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ editSvg } />);
const LinkIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ linkSvg } />);
const RemoveIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ removeSvg } />);
const ReplyIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ replySvg } />);
const RetryIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ retrySvg } />);
const ShareIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ shareSvg } />);
const SubmitIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ submitSvg } />);
const WarningIcon = forwardRef((props, ref) => <Icon ref={ ref } { ...props } svg={ warningSvg } />);

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
