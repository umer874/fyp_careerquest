"use client";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { Document, Page } from "react-pdf";
import styles from "./style.module.scss";

interface PdfViewerProps {
  filePreview: string;
  width: number | undefined;
}

const PdfViewer = ({ width, filePreview }: PdfViewerProps) => {
  return (
    <Document
      file={filePreview}
      onClick={() => {
        window.open(filePreview, "_blank");
      }}
      className={classNames(styles.pdfContainer)}
    >
      <Page pageNumber={1} width={width} />
    </Document>
  );
};

export default dynamic(() => Promise.resolve(PdfViewer), { ssr: false });
