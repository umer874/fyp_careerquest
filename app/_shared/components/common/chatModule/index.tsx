"use client";

import { ChatMessage } from "_shared/types/message";
import { Icons, Images } from "assets";
import classNames from "classnames";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GetMessagesService, SendMessageService } from "services/chat";
import { socket } from "services/socket";
import { FileType } from "utils/enum";
import { handleErrors } from "utils/helper";
import ChatUpload from "../chatUpload";
import CustomButton from "../customButton";
import CustomIconButton from "../customIconButton";
import Spinner from "../spinner";
import styles from "./style.module.scss";

interface ChatModuleProps {
  tabValue: string;
  onNewMessage?: (tab: string) => void;
  onViewProfile?: () => void;
  user: any;
  convoId: any;
}

const ChatModule = ({
  tabValue,
  onNewMessage,
  onViewProfile,
  user,
  convoId,
}: ChatModuleProps) => {
  const { auth } = useSelector((state: any) => state.root);

  const containerRef = useRef<any>(null);
  const newMessagesRef = useRef<ChatMessage[]>([]);

  const [file, setFile] = useState<File>();
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    let formData = new FormData();
    if (!convoId?.current) {
      return;
    }
    formData.append(
      "Conversation_id",
      convoId?.current ? String(convoId?.current) : ""
    );
    if (inputValue) {
      formData.append("message", inputValue);
    }
    if (file) {
      formData.append("chat_image", file);
    }
    setSendLoading(true);
    SendMessageService(formData)
      .then(({ data, status }) => {
        if (status) {
          setInputValue("");
          setFile(undefined);
          let oldMessages = [...messages];
          oldMessages.push(data.data);
          setMessages(oldMessages);
          setTimeout(() => {
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 200);
        }
      })
      .catch((err) => handleErrors(err))
      .finally(() => {
        setSendLoading(false);
      });
  };

  const GetConversationMessages = () => {
    setLoading(true);
    GetMessagesService(convoId?.current ? String(convoId?.current) : "")
      .then(({ data: { data }, status }) => {
        if (status) {
          const { chats, conversation } = data;
          setMessages(chats);
          setTimeout(() => {
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 200);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (convoId?.current) {
      setNewMessages([]);
      newMessagesRef.current = [];
      GetConversationMessages();
    }
  }, [convoId?.current]);

  useEffect(() => {
    socket.on("receive-message", (data: ChatMessage) => {
      if (Number(data?.conversation?.id) === Number(convoId?.current)) {
        let tempMessages = newMessagesRef.current.filter(
          (msg) => msg.id !== data.id
        );
        tempMessages.push(data);
        newMessagesRef.current = tempMessages;
        setNewMessages(tempMessages);
        setTimeout(() => {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
        }, 200);
      }
    });
    return () => {
      socket.off("receive-message");
    };
  }, [socket, tabValue]);

  return (
    <div className={classNames(styles.chatModule)}>
      <div
        className={classNames(
          styles.chatProfile,
          "flex justify-between items-center"
        )}
      >
        <div className="flex items-center gap-1.5">
          <Image
            src={user?.profile_asset?.full_path ?? Images.DefaultAvatar}
            alt="profile-img"
            height={50}
            width={50}
          />
          <h6>
            {user?.first_name} {user?.last_name}
          </h6>
        </div>
        <CustomButton
          containerStyle="gray-btn"
          title="View Profile"
          onClick={onViewProfile}
        />
      </div>
      <div
        className={classNames(styles.chatBody, "flex flex-col gap-3")}
        ref={containerRef}
      >
        {messages?.map((message, ind) => (
          <div
            key={message?.id}
            className={classNames(
              styles.chatMessage,
              message?.sender?.id === auth?.user?.id
                ? styles.myMessage
                : styles.otherMessage,
              "gap-1 flex flex-col"
            )}
          >
            {message?.chat_asset?.full_path ? (
              message?.chat_asset?.type === FileType.IMAGE ? (
                <Image
                  src={message?.chat_asset?.full_path}
                  height={140}
                  width={140}
                  alt="chat-asset"
                />
              ) : (
                <div
                  className={classNames(
                    styles.fileContainer,
                    "gap-1 cursor-pointer"
                  )}
                  onClick={() =>
                    window.open(message?.chat_asset?.full_path, "_blank")
                  }
                >
                  <Icons.FileDocument /> <p>file.pdf</p>
                </div>
              )
            ) : null}
            {message?.message ? <p>{message.message}</p> : null}

            <div className="flex items-end gap-1 self-end">
              <span>{moment(message.created_at).fromNow()}</span>
              {message?.sender?.id === auth?.user?.id ? (
                <Icons.CheckDouble
                  className={classNames(
                    !message?.is_read && styles.notReadIcon
                  )}
                />
              ) : null}
            </div>
          </div>
        ))}
        {newMessages?.length > 0 ? (
          <>
            <div className={classNames(styles.newMessageHeading)}>
              <span>New Messages</span>
            </div>
            {newMessages?.map((message, ind) => {
              return (
                <div
                  key={message?.id}
                  className={classNames(
                    styles.chatMessage,
                    message?.sender?.id === auth?.user?.id
                      ? styles.myMessage
                      : styles.otherMessage,
                    "gap-1 flex flex-col"
                  )}
                >
                  {message?.chat_asset?.full_path ? (
                    message?.chat_asset?.type === FileType.IMAGE ? (
                      <Image
                        src={message?.chat_asset?.full_path}
                        height={140}
                        width={140}
                        alt="chat-asset"
                      />
                    ) : (
                      <div
                        className={classNames(
                          styles.fileContainer,
                          "gap-1 cursor-pointer"
                        )}
                        onClick={() =>
                          window.open(message?.chat_asset?.full_path, "_blank")
                        }
                      >
                        <Icons.FileDocument /> <p>file.pdf</p>
                      </div>
                    )
                  ) : null}
                  {message?.message ? <p>{message.message}</p> : null}

                  <div className="flex items-end gap-1 self-end">
                    <span>{moment(message.created_at).fromNow()}</span>
                  </div>
                </div>
              );
            })}
          </>
        ) : null}
      </div>

      <div className={classNames(styles.sendMessageWrapper)}>
        <div
          className={classNames(
            styles.sendMessageContainer,
            "flex items-center w-full xs:px-2.5 px-2"
          )}
        >
          <div className=" flex gap-3 items-center  w-full">
            <ChatUpload files={file} setFiles={setFile} />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write a message..."
              className={classNames(styles.messageInput, "w-full")}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
          </div>
          <div className=" flex justify-end items-center">
            <CustomIconButton
              onClick={handleSendMessage}
              disabled={sendLoading}
            >
              {sendLoading ? <Spinner /> : <Icons.SendIcon />}
            </CustomIconButton>
          </div>
        </div>
      </div>

      {file ? (
        <div className={classNames(styles.filePreviewContainer, "px-3")}>
          <div
            className={classNames(
              "flex items-center gap-2",
              styles.filePreview
            )}
          >
            {file?.type.includes("image") && (
              <Image
                src={URL.createObjectURL(file)}
                alt="preview"
                height={50}
                width={50}
              />
            )}
            {file?.type.includes("pdf") && (
              <Icons.FileDocument className={classNames(styles.pdfIcon)} />
            )}
            <label>file.{file?.name.split(".").pop()}</label>
          </div>
          <button
            className={classNames(styles.removeButton)}
            onClick={() => {
              setFile(undefined);
            }}
          >
            <Icons.Cross />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChatModule;
