import { Header } from '@/components/Header';
import { DotsBackground } from '@/components/DotsBackground';
import { type Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
    title: {
        default: 'Nick Wentworth',
        template: '%s | Nick Wentworth',
    },
    icons: '/favicon.ico',
};

export default function RootLayout(props: React.PropsWithChildren) {
    return (
        <html lang='en'>
            <body>
                <Header />
                {props.children}
                <DotsBackground />
            </body>
        </html>
    );
}
