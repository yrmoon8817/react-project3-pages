import React from "react";
import * as MyLayout from "../libs/MyLayout.jsx";
import Dialog from "./Dialog.jsx";
import Button from "./Button.jsx";

const ErrorDialog = () => {
  const {closeDialog} = MyLayout.useDialog();
  return (<Dialog
    header={<>오류</>}
    footer={
      <Button onClick={closeDialog}>
        네, 알겠습니다
      </Button>
    }
  >
    잠시 후 다시 시도해 주세요.
  </Dialog>)
}

export default ErrorDialog;
