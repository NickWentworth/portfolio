import './global.css';

export default function RootLayout(props: React.PropsWithChildren) {
    return (
        <html lang='en'>
            <body>{props.children}</body>
        </html>
    );
}
