import { useEffect, useRef } from 'react';
import styles from './dots.module.css';
import { dots } from '../lib/dots';

export default function DotsBackground(props: React.PropsWithChildren) {
    const canvasRef = useRef<React.ElementRef<'canvas'>>(null);

    useEffect(() => {
        if (!canvasRef.current) {
            console.error('Unable to use canvas');
            return;
        }

        const dotsInterval = dots(canvasRef.current);

        return () => clearInterval(dotsInterval);
    }, []);

    return (
        <div className={styles.background}>
            <canvas className={styles.canvas} ref={canvasRef} />
            <span className={styles.children}>{props.children}</span>
        </div>
    );
}
