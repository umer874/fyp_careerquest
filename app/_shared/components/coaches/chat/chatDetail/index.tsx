import { ChatMessage, Conversation } from "_shared/types/message";
import { Icons, Images } from "assets";
import classNames from "classnames";
import ChatUpload from "components/common/chatUpload";
import CustomButton from "components/common/customButton";
import CustomIconButton from "components/common/customIconButton";
import Spinner from "components/common/spinner";
import useWindowDimensions from "hooks/useWindowDimensions";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next13-progressbar";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import { GetMessagesService, SendMessageService } from "services/chat";
import { FileType } from "utils/enum";
import { handleErrors } from "utils/helper";
import styles from "./style.module.scss";
import { socket } from "services/socket";

interface ChatDetailProps {
  activeConveration: Conversation | undefined;
  setActiveConveration: (conversation: Conversation | undefined) => void;
  activeConverationRef: any;
}

const ChatDetail = ({
  activeConveration,
  setActiveConveration,
  activeConverationRef,
}: ChatDetailProps) => {
  const { auth } = useSelector((state: any) => state.root);
  const { width } = useWindowDimensions();

  const router = useRouter();

  const containerRef = useRef<any>(null);
  const newMessagesRef = useRef<ChatMessage[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);
  const [newMessages, setNewMessages] = useState<ChatMessage[]>([]);

  const handleSendMessage = () => {
    let formData = new FormData();
    formData.append("Conversation_id", String(activeConveration?.id));
    if (newMessage) {
      formData.append("message", newMessage);
    }
    if (file) {
      formData.append("chat_image", file);
    }
    setSendLoading(true);
    SendMessageService(formData)
      .then(({ data, status }) => {
        if (status) {
          setNewMessage("");
          setFile(undefined);
          if (newMessages?.length > 0) {
            let oldMessages = [...newMessages];
            oldMessages.push(data.data);
            setNewMessages(oldMessages);
          } else {
            let oldMessages = [...messages];
            oldMessages.push(data.data);
            setMessages(oldMessages);
          }

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleNavigateChatDetails = (id: number) => {
    router.push(
      routeConstant.coach.fellowDetail.path.replace(":id", String(id))
    );
  };

  const GetConversationMessages = () => {
    setLoading(true);
    GetMessagesService(String(activeConveration?.id))
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
    if (activeConveration?.id) {
      setNewMessages([]);
      newMessagesRef.current = [];
      setMessages([]);
      GetConversationMessages();
    }
  }, [activeConveration?.id]);

  useEffect(() => {
    socket.on("receive-message", (data: ChatMessage) => {
      if (
        Number(data?.conversation?.id) ===
        Number(activeConverationRef?.current?.id)
      ) {
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
  }, [socket]);

  return (
    <div
      className={classNames(
        styles.chatDetails,
        width < 768 && !activeConveration ? "hidden" : "md:w-4/6 w-full h-full"
      )}
    >
      {activeConveration ? (
        <div className="flex flex-col justify-between h-full">
          {/* Header */}
          <div
            className={classNames(
              styles.header,
              "flex items-center justify-between"
            )}
          >
            <div className="flex items-center gap-2">
              {width < 768 ? (
                <Icons.ChevLeft
                  onClick={() => {
                    setActiveConveration(undefined);
                  }}
                />
              ) : null}

              <Image
                src={
                  activeConveration?.fellow?.profile_asset?.full_path ??
                  Images.DefaultAvatar
                }
                alt="fellow-img"
                height={50}
                width={50}
              />

              <h4>
                {activeConveration?.fellow?.first_name}{" "}
                {activeConveration?.fellow?.last_name}
              </h4>
            </div>

            <CustomButton
              containerStyle="outlined-button-light-green"
              title="View Profile"
              onClick={() =>
                handleNavigateChatDetails(activeConveration?.fellow?.id)
              }
            />
          </div>
          {/* Body */}

          <div
            className={classNames(
              styles.messagesWrapper,
              "flex flex-col gap-3 h-full"
            )}
            ref={containerRef}
          >
            {messages?.map((message, index) => (
              <div
                key={index}
                className={classNames(
                  styles.messageContainer,
                  "gap-1 flex flex-col",
                  message?.sender?.id === auth?.user?.id
                    ? styles.myMessage
                    : styles.otherMessage
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
                {message?.message ? (
                  <p className={styles.messageText}>{message.message}</p>
                ) : null}

                <div
                  className={classNames(
                    styles.messageTimestamp,
                    "flex items-center justify-end gap-0.5",
                    message?.sender?.id === auth?.user?.id
                      ? styles.myTimestamp
                      : styles.otherTimestamp
                  )}
                >
                  {moment(message.created_at).fromNow()}
                  {message?.sender?.id === auth?.user?.id && (
                    <span>
                      <Icons.CheckDouble
                        className={classNames(
                          !message?.is_read && styles.notReadIcon
                        )}
                      />
                    </span>
                  )}
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
                        styles.messageContainer,
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
                              window.open(
                                message?.chat_asset?.full_path,
                                "_blank"
                              )
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

          {/* Footer */}
          <div className={classNames(styles.sendMessageWrapper)}>
            <div
              className={classNames(
                styles.sendMessageContainer,
                "flex items-center w-full"
              )}
            >
              <div className=" flex gap-3 items-center  w-full">
                <ChatUpload files={file} setFiles={setFile} />

                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write message"
                  className={classNames(styles.messageInput, "w-full")}
                  onKeyDown={handleKeyDown}
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
      ) : (
        <div className="flex items-center justify-center h-full">
          Select a chat to view conversation
        </div>
      )}
    </div>
  );
};

export default ChatDetail;
