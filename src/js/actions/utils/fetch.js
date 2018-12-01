// export const APIHost ='http://192.168.2.123:2000';//开元
// 192.168.2.126:2000
// export const APIHost ='http://47.92.88.214:4030';//测试服务器
export const APIHost ='https://wlgj.vip531.cn/server';//正式服务器
// export const APIHost ='http://192.168.2.126:2000';
export var defaultParams = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};
/**
 * HTTP GET
 * @param  {string} url
 * @return {Promise}
 */
export function read(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}
/**
 * HTTP POST
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */     
export function create(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP PUT
 * @param  {string} url
 * @param  {object} body
 * @return {Promise}
 */
export function update(url, body = {}) {
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: JSON.stringify(body)
  });
}

/**
 * HTTP DELETE
 * @param  {string} url
 * @return {Promise}
 */
export function destroy(url) {
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

/************************************* token **********************************/
/**
 * HTTP GET
 * @param  {string} url
 * @param  {string} token
 * @return {Promise}
 */
export function read_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'get'
  });
}

export function creat_Token(url,token,body={}) {
  defaultParams.headers = {
      'Authorization':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: body
  });
}

export function delete_Token(url,token) {
  defaultParams.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'delete'
  });
}

export function update_Token(url,token,body={}) {
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization':token
  };
  return fetch(url, {
    ...defaultParams,
    method: 'put',
    body: body
  });
}
export function no_token(url,body={}) {
  //console.log(body)
  defaultParams.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  
  };
  return fetch(url, {
    ...defaultParams,
    method: 'post',
    body: body
  });
}

export function uploadImg_Token(url,body) {
  //console.log(body)
  return fetch(url, {
    method: 'post',
    body: body,
  });
}











