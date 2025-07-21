import { defineComponent } from 'vue'
import { closeDialog, showDialog } from '@/utils/dialog'

export default defineComponent({
  name: 'RolePage',
  setup() {
    const openDialog = () => {
      showDialog(
        <a-button onClick={closeDialog} type="primary">
          关闭
        </a-button>, 
        {
          title: '标题',
          width: '500'
        }
      )
    }

    return () => (
      <div>
        <a-button type="primary" onClick={openDialog}>
          打开弹窗
        </a-button>
      </div>
    )
  },
})
