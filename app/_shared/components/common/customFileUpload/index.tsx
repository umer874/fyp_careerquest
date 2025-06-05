import { useState, useId, useCallback, useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styles from "./style.module.scss";
import { Icons } from "assets";
import classNames from "classnames";
import Image from "next/image";
import { FileType } from "utils/enum";

interface CustomFileUploadProps {
  onFileChange?: (file: File | null, preview: string | null) => void;
  error?: string | null;
  onRemove?: () => void;
  accept?: Accept;
  initialPreview?: string;
  previewType?: string;
  showPreview?: boolean;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  onFileChange,
  error,
  onRemove,
  accept,
  initialPreview,
  previewType,
  showPreview = true,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const uniqueId = useId();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);

        setFile(selectedFile);
        setPreview(previewUrl);

        if (onFileChange) {
          onFileChange(selectedFile, previewUrl);
        }
      }
    },
    [onFileChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: accept ? accept : { "application/pdf": [] },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    if (onRemove) onRemove();
  };

  useEffect(() => {
    if (initialPreview) {
      setPreview(initialPreview);
    }
  }, [initialPreview]);

  return (
    <div className={styles.uploadContainer}>
      {!preview && (
        <div
          className={`${styles.uploadArea} ${isDragActive
              ? styles.dragActive
              : isDragReject
                ? styles.dragReject
                : ""
            }`}
          {...getRootProps()}
        >
          <input id={`fileInput-${uniqueId}`} {...getInputProps()} />
          <div className={styles.uploadPlaceholder}>
            <p>
              <span>Upload File</span> or just drag & drop
            </p>
            <p className={classNames(styles.info)}>(max. 50mb)</p>
          </div>
        </div>
      )}

      {showPreview ? (
        <>
          {preview && (
            <div className={classNames(styles.previewContainer, "mt-4")}>
              {/* <iframe src={preview} width="100%" height="200px" /> */}
              <div className={classNames("flex items-center gap-2")}>
                {file ? (
                  <>
                    {" "}
                    {file?.type.includes("image") && (
                      <Image
                        src={preview}
                        alt="preview"
                        height={50}
                        width={50}
                      />
                    )}
                    {file?.type.includes("video") && (
                      <video src={preview} height={50} width={50} />
                    )}
                    {file?.type.includes("pdf") && (
                      <div className={classNames(styles.pdfIcon)}>
                        <Icons.PDFIcon />
                      </div>


                    )}
                    <label>file.{file?.name.split(".").pop()}</label>
                  </>
                ) : (
                  <>
                    {previewType === FileType.IMAGE ? (
                      <Image
                        src={preview}
                        alt="preview"
                        height={50}
                        width={50}
                      />
                    ) : previewType === FileType.VIDEO ? (
                      <video src={preview + "#t=0.5"} height={50} width={50} />
                    ) : previewType === FileType.PDF ? (
                      <div className={classNames(styles.pdfIcon)}>
                      <Icons.PDFIcon />
                    </div>
                    ) : null}
                    <label>
                      file
                      {previewType === FileType.IMAGE
                        ? ".png"
                        : previewType === FileType.VIDEO
                          ? ".mp4"
                          : ".pdf"}
                    </label>
                  </>
                )}
              </div>
              <button
                className={classNames(styles.removeButton)}
                onClick={handleRemove}
              >
                <Icons.Cross />
              </button>
            </div>
          )}
        </>
      ) : null}

      <div className="flex items-start w-full justify-start">
        {fileRejections.length > 0 && (
          <p className={"error text-left"}>UnSupported file format</p>
        )}
        {error && <p className={"error text-start"}>{error}</p>}
      </div>
    </div>
  );
};

export default CustomFileUpload;
