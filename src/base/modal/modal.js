// alert.js
import Vue from 'vue'

// 具体的组件
import Modal from './modal.vue'
Modal.newInstance = properties => {
  const props = properties || {}
  // 实例化一个组件，然后挂载到body上
  const Instance = new Vue({
    data: props,
    render (h) {
      return h(Modal, {
        props: props
      })
    }
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  // 通过闭包维护modal组件的引用
  const modal = Instance.$children[0]
  return {
    // modal组件对外暴露的两个方法(函数劫持)
    add (noticeProps) {
      modal.add(noticeProps)
    },
    remove (name) {
      modal.remove(name)
    }
  }
}

let messageInstance
function getMessageInstance () {
  messageInstance = messageInstance || Modal.newInstance()
  return messageInstance
}
function notice ({ title = '', content = '' }) {
  // 等待接口调用的时候再实例化组件，避免进入页面就直接挂载到body上
  let instance = getMessageInstance()
  instance.add({
    title: title,
    content: content
  })
}

// 对外暴露的方法
export default {
  info (options) {
    return notice(options)
  }
}
