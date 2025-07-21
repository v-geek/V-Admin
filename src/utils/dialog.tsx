import { ref, render } from "vue";
import {
  Modal,
  ModalFuncProps,
  ModalProps,
} from "ant-design-vue";

const dialogRefs: any = {};

let dialogIds: (keyof typeof dialogRefs)[] = [];

export interface CustomModalProps extends ModalProps {
  beforeClose?: ModalFuncProps["onCancel"];
}

export function closeDialog() {
  const div = document.getElementById(
    dialogIds[dialogIds.length - 1] as string
  );
  if (div) {
    render(null, div);
    if (div.parentNode) {
      div.parentNode.removeChild(div);
    }
    dialogIds = dialogIds.slice(0, dialogIds.length - 1);
  }
}

export const showDialog = async (
  comp: any,
  props?: CustomModalProps
) => {
  const maxHeight = 720 - 56 - 52;
  const params = {
    okText: undefined,
    maskClosable: false,
    cancelText: undefined,
    visible: true,
    closable: true,
    title: "",
    width: "auto",
    style: {},
    ...props,
    bodyStyle: {
      maxHeight: `${maxHeight}px`,
      overflow: "auto",
      ...props?.bodyStyle,
    },
  };

  params.onOk = async () => {
    let result: boolean | void = false;
    const refId = dialogIds[dialogIds.length - 1];
    if (dialogRefs[refId].value && dialogRefs[refId].value.handleSubmit) {
      result = await dialogRefs[refId].value.handleSubmit();
    } else {
      result = true;
    }
    if (result) {
      closeDialog();
    }
  };

  params.onCancel = async (...args) => {
    let result: boolean | undefined | void = true;
    if (params && params.beforeClose) {
      result = await params.beforeClose(args);
    }
    const refId = dialogIds[dialogIds.length - 1];
    if (dialogRefs[refId].value && dialogRefs[refId].value.onCancel) {
      result = await dialogRefs[refId].value.onCancel(args);
    }
    if (result !== false) {
      closeDialog();
    }
  };

  const div = document.createElement("div");
  const id = Math.random().toString(32).slice(2);
  dialogIds.push(id);
  div.id = id;

  document.body.appendChild(div);

  dialogRefs[id] = ref();

  render(
    <Modal {...params}>
      <comp
        {...comp.props}
        maxHeight={maxHeight}
        ref={dialogRefs[id]}
      />
    </Modal>,
    div
  );
};
