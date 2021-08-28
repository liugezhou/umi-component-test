import styles from './index.less';
import { Button } from "antd";
import { useIntl } from 'umi';
export default function IndexPage() {
  const init = useIntl()
  const msg = init.formatMessage({
      id:'WELCOME_TO_UMI_WORLD',
      defaultMessage:'你好，牛逼的前端架构师！'
  },{
    name:'liugezhou'
  })
  console.log(msg)
  return (
    <div>
      <h1 className={styles.title}>Page index1</h1>
      <Button type="primary">Button</Button>
    </div>
  );
}
