"use client";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { FileType } from "utils/enum";
import styles from "./style.module.scss";
import Image from "next/image";
import { Icons } from "assets";

interface AssetPreviewProps {
  full_path: string;
  full_thumbnail_path: string;
  type: FileType;
}

const AssetPreview = ({
  type,
  full_path,
  full_thumbnail_path,
}: AssetPreviewProps) => {
  const videoRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  const toggleVideoClick = () => {
    const video = videoRef.current;

    if (video) {
      if (isPlaying) {
        video?.pause();
      } else {
        video?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      {type === FileType.IMAGE || type === FileType.PDF ? (
        <div className={classNames(styles.imgContainer)}>
          <Image
            width={879}
            height={424}
            src={full_thumbnail_path}
            alt="portfolio-img"
            className={type === FileType.PDF ? "cursor-pointer" : ""}
            onClick={() => {
              if (type === FileType.PDF) {
                window.open(full_path, "_blank");
              }
            }}
          />
        </div>
      ) : (
        <div
          className={classNames(styles.imgContainer)}
          onMouseEnter={() => {
            setMouseEnter(true);
          }}
          onMouseLeave={() => {
            setMouseEnter(false);
          }}
        >
          <video
            className={classNames(styles.video)}
            src={full_path}
            ref={videoRef}
            onEnded={() => {
              setIsPlaying(false);
            }}
          />
          {isPlaying && mouseEnter ? (
            <Icons.Pause
              className={classNames(styles.playIcon)}
              onClick={toggleVideoClick}
            />
          ) : (
            !isPlaying && (
              <Icons.Play
                className={classNames(styles.playIcon)}
                onClick={toggleVideoClick}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default AssetPreview;
