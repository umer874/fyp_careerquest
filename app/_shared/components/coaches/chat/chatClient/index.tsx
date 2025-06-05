"use client";

import { Conversation } from "_shared/types/message";
import classNames from "classnames";
import useUpdateToken from "hooks/useUpdatedToken";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import ChatDetail from "../chatDetail";
import ChatList from "../chatList";
import styles from "./style.module.scss";

interface ChatClientProps {
  data: Conversation[];
  meta: Meta;
  updatedToken: RefreshToken;
}

const CoachChatClient = ({ data, meta, updatedToken }: ChatClientProps) => {
  const activeConverationRef = useRef<Conversation>();
  const [activeConveration, setActiveConveration] = useState<Conversation>();

  useUpdateToken(updatedToken, () => {}, []);

  return (
    <div className={classNames(styles.customContainer, "h-full")}>
      <div
        className={classNames(
          styles.contentContainer,
          "w-full h-full flex md:flex-row flex-col"
        )}
      >
        <ChatList
          allConversations={data}
          activeConveration={activeConveration}
          setActiveConveration={setActiveConveration}
          meta={meta}
          activeConverationRef={activeConverationRef}
        />

        <ChatDetail
          activeConveration={activeConveration}
          setActiveConveration={setActiveConveration}
          activeConverationRef={activeConverationRef}
        />
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CoachChatClient), {
  ssr: false,
});
