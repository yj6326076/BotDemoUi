import { request } from 'ice';
import moment from 'moment';

export default {
  async queryDanmu(params) {
    const data = await request({
      url: 'http://114.116.43.187:8090/query/danm',
      method: 'POST',
      data: params,
    });
    data.content.forEach((element) => {
      element.creatDate = moment(element.creatDate).format('YYYY-MM-DD HH:mm:ss');
    });
    return {
      total: data.totalElements,
      list: data.content,
    };
  },
  async queryUser(params) {
    const data = await request({
      url: 'http://114.116.43.187:8090/manager/getRomeInfo',
      method: 'POST',
      data: params,
    });
    data.content.forEach((element) => {
      element.creatDate = moment(element.creatDate).format('YYYY-MM-DD HH:mm:ss');
      element.lastUpdateDate = moment(element.lastUpdateDate).format('YYYY-MM-DD HH:mm:ss');
    });
    return {
      total: data.totalElements,
      list: data.content,
    };
  },
  async queryNickName(params) {
    const data = await request({
      url: 'http://114.116.43.187:8090/manager/nickName',
      method: 'POST',
      data: params,
    });
    data.content.forEach((element) => {
      element.creatDate = moment(element.creatDate).format('YYYY-MM-DD HH:mm:ss');
      element.lastUpdateDate = moment(element.lastUpdateDate).format('YYYY-MM-DD HH:mm:ss');
    });
    return {
      total: data.totalElements,
      list: data.content,
    };
  },
  async reboot() {
    await request({
      url: 'http://114.116.43.187:8090/reboot',
      method: 'GET',
    });
  },
};
