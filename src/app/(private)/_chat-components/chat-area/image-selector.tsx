import { Modal, Upload } from "antd";
import React, { Dispatch, SetStateAction } from "react";

function ImageSelector({
  showImageSelector,
  setShowImageSelector,
  selectedImageFile,
  setSelectedImageFile,
  onSend,
  loading,
}: {
  showImageSelector: boolean;
  setShowImageSelector: Dispatch<SetStateAction<boolean>>;
  selectedImageFile: File | null;
  setSelectedImageFile: Dispatch<SetStateAction<File | null>>;
  onSend: () => void;
  loading: boolean;
}) {
  return (
    <Modal
      open={showImageSelector}
      onCancel={() => setShowImageSelector(false)}
      title={
        <span className="text-lg font-semibold text-center text-primary">
          Select an Image
        </span>
      }
      centered
      okText="Send"
      okButtonProps={{ disabled: !selectedImageFile, loading }}
      onOk={onSend}
    >
      <Upload
        listType="picture-card"
        beforeUpload={(file) => {
          setSelectedImageFile(file);
          return false;
        }}
      >
        <span className="p-5 text-xs text-gray-500">
          Click here to select an Image
        </span>
      </Upload>
    </Modal>
  );
}

export default ImageSelector;
