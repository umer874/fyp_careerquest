import { useState, useId, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./style.module.scss";
import { Icons, Images } from "assets";
import classNames from "classnames";
import Image from "next/image";

interface customProfileUploadProps {
  file?: File | null;
  onFileChange?: (file: File | null, preview: string | null) => void;
  customUploadContainer?: string;
  error?: string | null;
  previewURL?: string;
}

const customProfileUpload = ({
  file,
  onFileChange,
  customUploadContainer,
  error,
  previewURL,
}: customProfileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(previewURL ?? null);

  const uniqueId = useId();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);

      if (onFileChange) {
        onFileChange(selectedFile, previewUrl);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      multiple: false,
    });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  }, [file]);

  return (
    <div className={classNames(styles.uploadContainer)}>
      <div
        className={classNames(
          styles.uploadArea,
          customUploadContainer,
          "white-bg-input-upload",
          {
            [styles.dragActive]: isDragActive,
            [styles.dragReject]: isDragReject,
          }
        )}
        {...getRootProps()}
      >
        <input id={`fileInput-${uniqueId}`} {...getInputProps()} />
        {preview ? (
          <div className={styles.previewContainer}>
            <Image
              src={preview}
              alt="Uploaded preview"
              className={styles.previewImage}
              layout="fill"
            />
            <div className={styles.uploadIcon}>
              <Icons.CameraIcon />
            </div>
          </div>
        ) : (
          <div className={styles.previewContainer}>
            <Image
              src={Images.DefaultAvatar.src}
              alt="Default preview"
              className={styles.previewImage}
              layout="fill"
            />
            <div className={styles.uploadIcon}>
              <Icons.CameraIcon />
            </div>
          </div>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default customProfileUpload;
