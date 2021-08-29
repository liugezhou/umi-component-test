import { useState, useEffect } from "react";
import { getSiteInfo } from "../utils/service";
import styles from './index.less'

function BasicLayout(props) {
    const [init, setInit] = useState(false);
    const [slogan, setSlogan] = useState('');
    const [copyright, setCopyright] = useState('');

    useEffect(() => {
        if (!init) {
            setInit(true);
            getSiteInfo().then(data => {
                setSlogan(data.slogan);
                setCopyright(data.copyright);
            }).catch(err => {
                console.log(err);
                setSlogan('');
                setCopyright('');
            });
        }
    }, [init]);

    return (
        <div className={styles.normal}>
            <div className={styles.title}>{slogan}</div>
            {props.children}
            <div className={styles.footer}>{copyright}</div>
        </div>
    );
}
export default BasicLayout;