import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { useBreakpointValue } from '@chakra-ui/react';

/** Responsive header element for both mobile and desktop */
export default function Header() {
    // swap header version based off of responsive size
    return useBreakpointValue({
        base: <MobileHeader />,
        md: <DesktopHeader />,
    });
}

export { ANCHORS } from './common';
