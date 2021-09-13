const axiosInstance = axios.create({
  timeout: 20000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=utf-8',

  },
  withCredentials: true,
  responseType: 'json'
})


const defaultSignatureUrl = 'https://app.xxx.com/app/oss/policy'

async function upload({ files, signatureURL }) {
  return Array.isArray(files) ? await Promise.all(files.map(file => _uploadFilesToOss(file, signatureURL)))
    : await _uploadFilesToOss(files, signatureURL);
}

async function _uploadFilesToOss(file, signatureURL) {
  if (!(file instanceof File)) {
    return Promise.reject('非文件')
  }
  let { accessid, host, policy, signature } = await authorized.get(signatureURL)
  let formData = new FormData();
  let filename = `${Math.random() + file.name.substr(file.name.lastIndexOf('.'))}`
  formData.append('key', filename) // 文件名
  formData.append('policy', policy)
  formData.append('OSSAccessKeyId', accessid)
  formData.append('success_action_status', '200')
  formData.append('Signature', signature)
  formData.append('file', file);
  await window.fetch(host, { method: 'POST', body: formData });
  return `${host}/${filename}`
}

const sessionFileId = 'oss-authorized-signature';
const expired = 30 * 1000
const authorized = {
  _getKey: function () {
    return storage.localGet(sessionFileId)
  },
  _setKey: function (value) {
    if (!typeof value !== 'string') value = JSON.stringify(value)
    storage.localSet(sessionFileId, value)
  },
  get: async function (signatureURL) {
    let key = this._getKey();
    if (key && key.signature && Date.now() - key.timestamp < expired) {
      return key
    }
    key = (await axiosInstance.post(signatureURL, {})).data;
    key.timestamp = Date.now();
    this._setKey(key)
    return key
  }
}