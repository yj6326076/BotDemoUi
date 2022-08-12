import { request, config } from 'ice';
import moment from 'moment';
import React from 'react';

export default {
  async queryDanmu(params) {
    const data = await request({
      url: `//${config.domain}/query/danm`,
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
  async exportDanmu(params) {
    await request({
      url: `//${config.domain}/exportDanm`,
      method: 'GET',
      params,
    });
  },
  async queryUser(params) {
    const data = await request({
      url: `//${config.domain}/manager/getRomeInfo`,
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
      url: `//${config.domain}/manager/nickName`,
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
      url: `//${config.domain}/reboot`,
      method: 'GET',
    });
  },
};
