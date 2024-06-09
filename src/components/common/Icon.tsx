import { IconBaseProps, type IconType } from 'react-icons';
import { AiFillGithub, AiOutlineMenu } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import {
    IoChevronBack,
    IoChevronForward,
    IoLogoLinkedin,
    IoMail,
} from 'react-icons/io5';

type IconName =
    | 'link'
    | 'github'
    | 'linkedin'
    | 'mail'
    | 'menu'
    | 'left'
    | 'right';

function getIcon(icon: IconName): IconType {
    switch (icon) {
        case 'link':
            return FiExternalLink;
        case 'github':
            return AiFillGithub;
        case 'linkedin':
            return IoLogoLinkedin;
        case 'mail':
            return IoMail;
        case 'menu':
            return AiOutlineMenu;
        case 'left':
            return IoChevronBack;
        case 'right':
            return IoChevronForward;
    }
}

type IconProps = IconBaseProps & {
    icon: IconName;
};

export function Icon(props: IconProps) {
    const { icon, ...iconBaseProps } = props;

    const _Icon = getIcon(props.icon);

    return <_Icon size='28' {...iconBaseProps} />;
}
