import { urlToBase64, dataURLtoBlob } from './base64Conver.js'

// antd-vue 文件预览 需使用
export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

function downloadByData(data: BlobPart, fileName: string, type?: string) {
  const blob = new Blob([data], { type: type || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL)
}

function downloadByBase64(buf, filename, mime) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime)
}

// 下载在线图片   不会修改图片的后缀名
export function downloadByOnlineUrl(url: string, filename: string, mime?: string) {
  if (!filename) {
    filename = url.slice(url.lastIndexOf('/') + 1)
  }

  urlToBase64(url).then(base64 => {
    downloadByBase64(base64, filename, mime)
  })
}

// declare type TargetContext = '_self' | '_blank'

// 下载文件(在线地址)  比如: xlsx
export function downloadByUrl({ url, target = '_self', fileName = '' }) {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!')
    return false
  }

  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  // openWindow(url, { target })

  window.open(url, target)

  return true
}
