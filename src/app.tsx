import 'antd/dist/antd.css';
import { getLocale,setLocale } from 'umi';
import qs from 'qs';
const { search } = window.location;
const { locale = 'zh-CN' } = qs.parse(search, { ignoreQueryPrefix: true });
setLocale(locale,false)