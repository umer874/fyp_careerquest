import { Icons } from "assets";
import classNames from "classnames";
import { useId } from "react";
import styles from "./style.module.scss";

interface ChatUploadProps {
  files: File | undefined;
  setFiles: (files: File) => void;
  accept?: string;
}

const ChatUpload = ({ setFiles, accept }: ChatUploadProps) => {
  const uniqueId = useId();

  const handleChange = (e: any) => {
    setFiles(e.target.files[0]);
  };

  return (
    <label
      className={classNames(styles.uploadContainer)}
      htmlFor={`fileInput-${uniqueId}`}
    >
      <input
        id={`fileInput-${uniqueId}`}
        type="file"
        className="hidden"
        multiple={false}
        accept={accept ? accept : "image/*,application/pdf"}
        onChange={handleChange}
      />
      <Icons.AttachIcon />
    </label>
  );
};

export default ChatUpload;
