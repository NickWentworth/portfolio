import DotsBackground from './components/DotsBackground';
import styles from './app.module.css';

const LOREM =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus scelerisque erat, eu dignissim nisl volutpat at. Maecenas cursus ultricies ipsum et dapibus. Sed at interdum purus. Aenean pellentesque eros ex, convallis ultricies nulla elementum vel. In fermentum sagittis tortor vel blandit. Phasellus at neque tortor. Sed maximus libero quam, consectetur sodales ipsum venenatis vel. Curabitur interdum faucibus tempus. Pellentesque hendrerit volutpat est cursus cursus. Pellentesque in purus vel metus tincidunt gravida vitae ac purus. Vestibulum sed pharetra ipsum, vel ultricies erat. Donec facilisis, neque ac efficitur vulputate, nisl diam dignissim nisl, vitae dignissim elit lacus varius odio. Curabitur nec purus eget augue aliquet vestibulum. Mauris eget dictum nulla, ac malesuada ligula. Phasellus laoreet orci id elit sagittis, eu volutpat lorem malesuada. Nam aliquet semper lorem, nec pharetra magna luctus sit amet. Duis pretium ligula sit amet suscipit pulvinar. Vestibulum at accumsan erat, nec consectetur arcu. Nam metus magna, sagittis id tellus ut, lobortis hendrerit urna. Duis pretium lacinia porta. Donec accumsan congue nisl ut molestie. Proin diam elit, rhoncus eget dapibus in, varius scelerisque sem. Aenean aliquet eget eros sit amet aliquet. Vivamus ullamcorper varius pharetra. Maecenas a vestibulum erat. Aliquam erat volutpat. Curabitur dictum, turpis at vehicula fringilla, metus magna volutpat dui, nec volutpat augue lectus ut ipsum. Aliquam auctor, est commodo dapibus porta, neque augue blandit orci, posuere maximus neque dui sit amet justo. Morbi eleifend, lorem eget elementum faucibus, sapien tellus convallis nisi, in scelerisque leo massa non est. Ut bibendum rutrum dui ac porta. Mauris eget est felis. Suspendisse gravida odio et tellus egestas fermentum. Vestibulum venenatis vel arcu nec aliquet. Praesent nisl sapien, vestibulum vel lectus ut, molestie facilisis ipsum. Integer molestie tristique ipsum, in tincidunt nulla vestibulum et. Pellentesque molestie eget diam ultricies finibus. Vestibulum accumsan, nisl eget laoreet porttitor, velit purus pharetra sapien, ac eleifend diam metus ac metus. Praesent posuere orci vel convallis elementum. Praesent euismod magna quis pharetra aliquam. Mauris eget pellentesque velit. Curabitur mollis erat et efficitur dictum. Morbi lacinia eget dolor vitae auctor. Quisque in turpis id elit facilisis lobortis et in augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sagittis lacus non vulputate condimentum. Maecenas gravida nisi commodo lorem venenatis, in volutpat nulla dapibus. Phasellus a ultricies dolor. Nunc vitae condimentum quam. Ut sollicitudin leo sed erat venenatis elementum. In varius, ex euismod semper ultricies, purus turpis commodo lectus, vitae egestas massa sapien ut nibh. Nullam volutpat ex non tortor dignissim aliquet. Quisque rutrum tortor ut eros imperdiet fringilla. Quisque molestie dui in mi laoreet, sit amet laoreet turpis luctus. Sed mollis erat eget tellus molestie, a bibendum justo porttitor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin vestibulum nulla in nisi suscipit fermentum. Duis in sapien id eros aliquam tempor ut nec arcu. Ut euismod enim nulla, et facilisis augue dignissim congue. Vivamus quis arcu ac lorem fringilla mattis. Praesent id augue ac ligula imperdiet pulvinar sed sed lectus. In eleifend felis eget congue pellentesque. Maecenas nisl nisi, elementum non elementum ut, imperdiet vitae justo. Etiam iaculis dapibus lorem, et efficitur ante tempus ac.';

export default function App() {
    return (
        <DotsBackground>
            <div className={styles.content}>
                <div className={styles.intro}>
                    <div className={styles.introText}>
                        <h1>Hey there, I'm Nick</h1>
                        <h3>I am a software developer</h3>
                    </div>

                    <img className={styles.introPicture} src='/me.jpg' />
                </div>

                <hr />

                <h1>About Me</h1>
                <p>{LOREM}</p>

                <hr />

                <h1>Projects</h1>
                <p>{LOREM}</p>

                <hr />

                <h1>Experience</h1>
                <p>{LOREM}</p>
            </div>
        </DotsBackground>
    );
}
