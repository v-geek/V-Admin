import { nextTick } from 'vue'
import { notification } from 'ant-design-vue'

/**
 * @description 全局代码错误捕捉
 * */
const errorHandler = async (error: any) => {
  // 过滤 HTTP 请求错误
  if (error.status || error.status == 0) return false

  let errorMap = {
    InternalError: 'Javascript引擎内部错误',
    ReferenceError: '未找到对象',
    TypeError: '使用了错误的类型或对象',
    RangeError: '使用内置对象时，参数超范围',
    SyntaxError: '语法错误',
    EvalError: '错误的使用了Eval',
    URIError: 'URI错误'
  }

  const errorName = errorMap[error.name] || '未知错误'

  await nextTick()

  notification.error({
    message: '错误',
    description: errorName,
    duration: 3
  })

  console.error('错误信息:', error)
}

export default errorHandler
