import 'antd/dist/antd.css';
import { setLocale } from 'umi';
//@ts-ignore
import qs from 'qs';
const { search } = window.location;
const { locale = 'zh-CN' } = qs.parse(search, { ignoreQueryPrefix: true });
setLocale(locale,false)