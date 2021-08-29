import styles from './index.less';
import { Divider, Row, Col, Card, Input } from 'antd';
import { EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { useIntl,history } from 'umi';
import { getGitUrl,getPreviewUrl } from "../utils/git";
import { getComponentList } from '../utils/service';
import { useState, useEffect } from "react";

const { Meta } = Card;
const { Search } = Input;

export default function IndexPage() {
  const [init, setInit] = useState(false);
  const [list, setList] = useState([]);
  const [name, setName] = useState(null);
  const intl = useIntl();

  useEffect(() => {
    if (!init) {
      setInit(true);
      getComponentList({ name }).then(data => {
        console.log(data);
        setList(data);
      }).catch(err => {
        console.error(err);
        setList([]);
      });
    }
  }, [init, name]);

  function getAvatar(item) {
    if (item.git_type === 'gitee') {
      return {
        img: 'https://gitee.com/static/images/logo-black.svg',
        style: { height: '20px', cursor: 'pointer' },
      };
    } else {
      return {
        img: 'https://www.youbaobao.xyz/arch/img/github.jpeg',
        style: { height: '40px', cursor: 'pointer' },
      };
    }
  }
  function getLastPreviewUrl(item) {
    const lastVersion = item.versions[0];
    const examplePath = lastVersion.example_path;
    const exampleFile = JSON.parse(lastVersion.example_list)[0];
    return getPreviewUrl({
      name: item.classname,
      version: lastVersion.version,
      path: examplePath,
      file: exampleFile,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.search}>
      <Search
          style={{ width: '50%' }}
          placeholder={intl.formatMessage({ id: 'INDEX_PLACEHOLDER' })}
          allowClear
          enterButton={intl.formatMessage({ id: 'INDEX_SEARCH' })}
          size='large'
          onSearch={value => {
            setName(value);
            setInit(false);
          }}
        />
      </div>
      <Divider orientation='right'>共{list.length}个组件</Divider>
      <Row gutter={16} justify='space-around'>
        {
          list.map(item => (
            <Col span={6} key={item.id}>
              <Card
                actions={[
                  <EyeOutlined key='setting' onClick={() => {
                    window.open(getLastPreviewUrl(item));
                  }}
                  />,
                  <EditOutlined key='edit' onClick={() => {
                    history.push({
                      pathname: '/detail',
                      query: {
                        id: item.id,
                      },
                    });
                  }}
                  />,
                  <EllipsisOutlined key='ellipsis' />,
                ]}
              >
                <Meta
                  avatar={<img
                    alt={item.name}
                    src={getAvatar(item).img}
                    style={getAvatar(item).style}
                    onClick={() => window.open(getGitUrl(item))}
                  />}
                  title={item.name}
                  description={item.description}
                />
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
}
