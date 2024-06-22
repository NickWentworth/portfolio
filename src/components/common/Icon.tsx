import { IconBaseProps, type IconType } from 'react-icons';
import { AiFillGithub, AiOutlineMenu } from 'react-icons/ai';
import { FiExternalLink } from 'react-icons/fi';
import {
    IoChevronBack,
    IoChevronForward,
    IoLogoLinkedin,
    IoMail,
} from 'react-icons/io5';

const ICON_TABLE = {
    link: FiExternalLink,
    menu: AiOutlineMenu,
    left: IoChevronBack,
    right: IoChevronForward,
    github: AiFillGithub,
    linkedin: IoLogoLinkedin,
    mail: IoMail,
} satisfies Record<string, IconType>;

type IconName = keyof typeof ICON_TABLE;

type IconProps = IconBaseProps & {
    icon: IconName;
};

export function Icon(props: IconProps) {
    const { icon, ...iconBaseProps } = props;

    const _Icon = ICON_TABLE[props.icon];

    return <_Icon size='28' {...iconBaseProps} />;
}
