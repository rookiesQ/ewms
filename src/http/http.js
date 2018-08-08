import axios from 'axios';
axios.defaults.timeout = 15000;
import router from '@/router/index.js';
import { Message } from 'element-ui';
axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers['Authorization'] =
'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkZFNDJCOTg0NDFDMTQ4NDdCQTJENDU2MzkxRThBMDc3QjVFN0MzNTkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJfa0s1aEVIQlNFZTZMVVZqa2VpZ2Q3WG53MWsifQ.eyJuYmYiOjE1MzM2MzMyODksImV4cCI6MTUzMzYzNjg4OSwiaXNzIjoiaHR0cDovLzE5Mi4xNjguMTAwLjEwNzo4MDgzIiwiYXVkIjpbImh0dHA6Ly8xOTIuMTY4LjEwMC4xMDc6ODA4My9yZXNvdXJjZXMiLCJCSVNlcnZpY2VBUEkiLCJIS0VSUCIsIk1lbWJlck1hbmFnZW1lbnRBUEkiLCJPcmRlck1hbmFnZW1lbnRBUEkiLCJSZXBvc2l0b3J5TWFuYWdlbWVudEFQSSJdLCJjbGllbnRfaWQiOiJIS0VSUDIuMCIsInN1YiI6IjEyNCIsImF1dGhfdGltZSI6MTUzMzYwODc2OSwiaWRwIjoibG9jYWwiLCJodHRwOi8vd2ViLmhlbmdrYW5naXQuY29tL2lkZW50aXR5L2NsYWltcy9ncm91cGlkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMTI0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImFkbWluIiwic2NvcGUiOlsiQklTZXJ2aWNlQVBJIiwiSEtFUlAiLCJNZW1iZXJNYW5hZ2VtZW50QVBJIiwiT3JkZXJNYW5hZ2VtZW50QVBJIiwiUmVwb3NpdG9yeU1hbmFnZW1lbnRBUEkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsiSWRlbnRpdHlTZXJ2ZXJBdXRob3JpemUiXX0.l3Q-n2oQPOr1hpPOoE-uOnja1hShpjrtgRHlsMWlFv0kQL_uIqmyOsxB7CSbxkAT8wpDZmJ9mLWZs_ZKcs28RyTpEa1B2LOD9GsTZMsmjoSRppbME1re68V0r5tVdrnA-7D-zxiMgsAAFKEDdTWGjulNbjmvbeMzID35cE_SSIJT4ZGIUji33XJRaswOokzxRHFKWkjR6K_ei5i_95x9av_wtwx_9Lp3ScwEQ1eNkRO1foNuVw7RyYaO1EumLk3uHh-LnCdbb1QO9WIOwOGcMldsnbYPcQVaQx0pYqCYdQnUGNFBemWLyq0yGTAyuhCPhYgTXj5OuTCUkrjFLJBezg';
class Http {
	posts(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(response => {
                    resolve(response.data);
                }, err => {
                    if (err.timeout == 15000)
                        Message({
                            message: "请求超时，数据加载失败！",
                            type: 'error',
                            duration: 5 * 1000
                        })
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
    gets(url,params) {
      return new Promise((resolve, reject) => {
        axios.get(url,{'params':params})
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，数据加载失败！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    deletes(url,params) {
      return new Promise((resolve, reject) => {
        axios.delete(url,{'params':params})
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    puts(url, params) {
      return new Promise((resolve, reject) => {
        axios.put(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    instancePosts(url, params) {//登录
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8083'
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    getBaseURL(baseURL) { //上传图片
        // console.log(axios.defaults.baseURL)
        return 'http://192.168.100.107:8084'
    }
    getWeChartBaseURL() { // 获取和设置微信baseurl
    	//return 'http://weixin.hengkangit.com'
    	return 'http://172.31.61.52:808'
    }
    loadImg(url, params) {//表单提交，上传图片
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8084',
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    uploadPhoto(url, params,callback1) {//表单提交，上传图片
      var instance = axios.create({
        baseURL:'http://192.168.100.107:8084',
        onUploadProgress:function(progressEvent){ //原生获取上传进度的事件
          if(progressEvent.lengthComputable){
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              callback1(progressEvent);
          }
        }
      });
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    exportExcel(url, params) {//导入文件
      var instance = axios.create();
      instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      instance.interceptors.request.use((config) => {
        if(store.state.accessToken!=''){
          config.headers.Authorization= window.sessionStorage.getItem('Token');
        }else{
          router.push({path:'/login'});
        }
        return config;
      },(error) =>{
        return Promise.reject(error);
      });
      // console.log(axios.defaults.headers)
      return new Promise((resolve, reject) => {
        instance.post(url, params)
          .then(response => {
            resolve(response.data);
          }, err => {
            if(err.timeout==15000)
              Message({
                message:"请求超时，请稍后重试！",
                type: 'error',
                duration: 5 * 1000
              })
            reject(err);
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
    downLoad(url, params) {
        var instance = axios.create({
            responseType: 'arraybuffer'
        });
        instance.defaults.headers.Authorization = window.sessionStorage.getItem('Token');
        return new Promise((resolve, reject) => {
            instance.get(url, { 'params': params })
                .then(response => {
                    resolve(response);
                }, err => {
                    reject(err);
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
}
const http =  new Http();
export default http