import { formatName } from '../utils';

export function getGitUrl(item) {
  let name = item.classname;
  if (name.startsWith('@') && name.indexOf('/') > 0) {
    const nameArray = name.split('/');
    name = nameArray.join('_').replace('@', '');
  }
  return `https://${item.git_type}.com/${item.git_login}/${name}`;
}

/**
 * 获取组件预览链接
 * @param name      组件名称
 * @param version   组件版本
 * @param path      组件预览文件路径
 * @param file      组件预览文件名称
 */
export function getPreviewUrl({ name, version, path, file }) {
  return `https://cloudscope-cli.oss-cn-beijing.aliyuncs.com/${formatName(name)}@${version}/${path}/${file}`;
}

/**
 * 获取组件的NPM仓库
 *
 * @param item      组件信息
 * @param version   组件版本
 */
export function getNpmUrl(item, version) {
  if (version) {
    return `https://www.npmjs.com/package/${item.classname}/v/${version}`;
  } else {
    return `https://www.npmjs.com/package/${item.classname}`;
  }
}

export default {};