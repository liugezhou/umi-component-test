import styles from './index.less';
import { Button } from "antd";

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index1</h1>
      <Button type="primary">Button</Button>
    </div>
  );
}
