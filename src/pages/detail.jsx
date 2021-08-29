import { useState, useEffect } from 'react';
import { Select, Divider, Button, message } from 'antd';
import { FileOutlined, EyeOutlined, CloudOutlined, CopyOutlined } from '@ant-design/icons';
import showdown from 'showdown';
import styles from './detail.css';
import { fromNow, copy } from '../utils';
import { getGitUrl, getPreviewUrl, getNpmUrl } from '../utils/git';
import { getComponentItem } from "../utils/service";
// import 'github-markdown-css';

const { Option } = Select;

export default function Page(props) {
  const [init, setInit] = useState(false)
  const [data, setData] = useState(null)
  const [version, setVersion] = useState(null); // 版本号信息(1.0.0)
  const [versionData, setVersionData] = useState(null); // 版本号对象
  const [previewIndex, setPreviewIndex] = useState(0);
  const [preview, setPreview] = useState([]);
  const [readme, setReadme] = useState(null);


  useEffect(() => {
    const query = props.location.query
    if (!init && query.id) {
      setInit(true);
      getComponentItem(query.id).then(data => {
        setData(data);
        setVersion(data.versions[0].version);
        const converter = new showdown.Converter(),
          text = data.readme,
          html = converter.makeHtml(text);
        setReadme(html);
      }).catch(err => {
        console.log(err);
        setData(null);
      });
    }
  })
  useEffect(() => {
    if (data && version) {
      const versionData = data.versions.find(item => item.version === version);
      let versionPreview = JSON.parse(versionData.example_list);
      versionPreview = versionPreview.map((file, index) => ({
        name: `预览${index + 1}`,
        index,
        file: getPreviewUrl({
          name: data.classname,
          version: versionData.version,
          path: versionData.example_path,
          file: versionPreview[index],
        }),
      }));
      setVersionData(versionData);
      setPreview(versionPreview);
      setPreviewIndex(previewIndex);
    }
  }, [data, version,previewIndex]);
  function handleVersionChange(value){
    setVersion(value)
  }
  function handlePreviewChange(value) {
    setPreviewIndex(value);
  }
  return (
    <div className={styles.container}>
      {
        data ? (
          <>
            <div className={styles.detailContainer}>
              <div className={styles.detailName}>{data.name}</div>
              <Select
                value={version}
                style={{ marginLeft: 10, width: 120 }}
                bordered={false}
                onChange={handleVersionChange}
              >
                {
                  data.versions.map(item => (
                    <Option key={item.version} value={item.version}>{item.version}</Option>
                  ))
                }
              </Select>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.detailDescription}>{data.description}</div>
            </div>
            <Divider />
            <div className={styles.detailContainer}>
              <div className={styles.detailText}>代码托管：{data.git_type}</div>
              <div className={styles.detailText}>上传用户：{data.git_login}</div>
              <div className={styles.detailText}>创建时间：{fromNow(versionData?.create_dt)}</div>
              <div className={styles.detailText}>更新时间：{fromNow(versionData?.update_dt)}</div>
            </div>
            <div className={styles.detailContainer}>
              <Button
                className={styles.detailBtn}
                type='primary'
                icon={<FileOutlined />}
                onClick={() => {
                  window.open(getGitUrl(data));
                }}
              >
                查看源码
              </Button>
              <Button
                className={styles.detailBtn}
                type='primary'
                icon={<EyeOutlined />}
                onClick={() => {
                  window.open(preview[previewIndex].file);
                }}
              >
                组件预览
              </Button>
              <Select
                className={styles.detailPreview}
                value={previewIndex}
                bordered={false}
                onChange={handlePreviewChange}
              >
                {preview.map(item => (
                  <Option key={item.name} value={item.index}>{item.name}</Option>
                ))}
              </Select>
              <Button
                className={styles.detailBtn}
                type='primary'
                icon={<CloudOutlined />}
                onClick={() => {
                  window.open(getNpmUrl(data, version));
                }}
              >
                NPM仓库
              </Button>
            </div>
            <div className={styles.detailContainer}>
              <div className={styles.detailUseContainer}>
                <div className={styles.detailUseTitle}>在项目中使用</div>
                <Divider />
                <div className={styles.detailCommandWrapper}>
                  <div className={styles.detailCommand}>npm install {data.classname}</div>
                  <Button
                    type='text'
                    icon={<CopyOutlined />}
                    onClick={() => {
                      copy(`npm install ${data.classname}`);
                      message.success('命令复制成功');
                    }}
                  >
                    复制命令
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
            <div>
              <div className={styles.detailName}>文档</div>
              <div
                className={styles.detailReadme}
                dangerouslySetInnerHTML={{ __html: readme }}
              />
            </div>
          </>
        ) : null
      }
    </div>
  );
}
