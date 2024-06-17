import { Header } from '@/components/Header';
import { DotsBackground } from '@/components/DotsBackground';
import { type Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
    title: 'Nick Wentworth',
    icons: '/favicon.ico',
};

export default function RootLayout(props: React.PropsWithChildren) {
    return (
        <html lang='en'>
            <body className='w-dvw h-dvh flex flex-col'>
                <Header />

                <div className='grow overflow-auto'>{props.children}</div>

                <DotsBackground />
            </body>
        </html>
    );
}
