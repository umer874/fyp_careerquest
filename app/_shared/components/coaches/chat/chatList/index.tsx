import { ChatMessage, Conversation } from "_shared/types/message";
import { Images } from "assets";
import classNames from "classnames";
import CustomSearch from "components/common/customSearch";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GetConversationsSevice } from "services/chat";
import styles from "./style.module.scss";
import { useOnScroll } from "hooks/useOnScroll";
import useDebounce from "hooks/useDebounce";
import Spinner from "components/common/spinner";
import useWindowDimensions from "hooks/useWindowDimensions";
import { socket } from "services/socket";

interface ChatListProps {
  meta: Meta;
  allConversations: Conversation[];
  activeConveration: Conversation | undefined;
  setActiveConveration: (conversation: Conversation) => void;
  activeConverationRef: any;
}

const ChatList = ({
  meta,
  allConversations,
  activeConveration,
  setActiveConveration,
  activeConverationRef,
}: ChatListProps) => {
  const { width } = useWindowDimensions();
  const [endReach, onScroll] = useOnScroll("chat-lists-wrapper");

  const pageRef = useRef<number>(meta?.currentPage);
  const conversationsref = useRef<Conversation[]>(
    allConversations ? allConversations : []
  );

  const [conversations, setConversations] = useState<Conversation[]>(
    allConversations ? allConversations : []
  );
  const [search, setSearch] = useState<string>("");
  const [searchVal, setSearchVal] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(
    meta?.totalPages > meta?.currentPage ? true : false
  );
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const handleGetConverations = () => {
    GetConversationsSevice({
      page: pageRef.current,
      limit: 10,
      search: searchVal,
    })
      .then(
        ({
          data: {
            data: { data, meta },
          },
          status,
        }) => {
          if (status) {
            let tempArr = [...conversationsref.current, ...data];
            conversationsref.current = tempArr;
            setConversations(tempArr);
            if (meta?.totalPages > meta?.currentPage) {
              setLoadMore(true);
            } else {
              setLoadMore(false);
            }
          }
        }
      )
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
        setSearchLoading(false);
      });
  };

  useEffect(() => {
    if (endReach && loadMore && !loading && !initialLoading) {
      setLoading(true);
      pageRef.current = pageRef.current + 1;
      handleGetConverations();
    }
  }, [endReach]);

  useEffect(() => {
    if (!initialLoading) {
      setSearchLoading(true);
      pageRef.current = 1;
      conversationsref.current = [];
      setConversations([]);
      handleGetConverations();
    }
  }, [searchVal]);

  useEffect(() => {
    socket.on("receive-message", (data: ChatMessage) => {
      let tempConveration = conversationsref.current.filter((convo) => {
        return convo.id !== data.conversation.id;
      });
      tempConveration.unshift(data.conversation);
      conversationsref.current = tempConveration;
      setConversations(tempConveration);
    });
  }, [socket]);

  useDebounce(
    () => {
      setSearchVal(search);
    },
    [search],
    800
  );

  return (
    <div
      className={classNames(
        styles.chatList,
        width < 768 && activeConveration ? "hidden" : "md:w-2/6 w-full"
      )}
    >
      <div className={classNames(styles.heading)}>
        <h5>
          Chats{" "}
          {conversations.length > 0 ? (
            <span>({conversations.length})</span>
          ) : (
            ""
          )}
        </h5>
        <div className={classNames(styles.searchContainer)}>
          <CustomSearch
            value={search}
            onChange={(e) => {
              setInitialLoading(false);
              setSearch(e.currentTarget.value);
            }}
          />
        </div>
      </div>
      <div
        className={classNames(styles.chatListWrapper)}
        id="chat-lists-wrapper"
        onScroll={onScroll}
      >
        {searchLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {conversations?.map((items) => (
              <ChatItem
                items={items}
                activeConveration={activeConveration}
                setActiveConveration={setActiveConveration}
                activeConverationRef={activeConverationRef}
                key={items.id}
              />
            ))}
            {loading ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : null}
          </>
        )}

        {/* This is for adding extra height at end */}
        <div className={classNames(styles.heading, "invisible")}>
          <h5>
            Chats{" "}
            {conversations.length > 0 ? (
              <span>({conversations.length})</span>
            ) : (
              ""
            )}
          </h5>
          <div className={classNames(styles.searchContainer)}>
            <CustomSearch
              value={search}
              onChange={(e) => {
                setInitialLoading(false);
                setSearch(e.currentTarget.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ChatItemProps {
  items: Conversation;
  activeConveration: Conversation | undefined;
  activeConverationRef: any;
  setActiveConveration: (conversation: Conversation) => void;
}
const ChatItem = ({
  items,
  activeConveration,
  activeConverationRef,
  setActiveConveration,
}: ChatItemProps) => {
  const [unReadCount, setUnReadCount] = useState<number>(
    items?.mentor_coach_unread_count
  );

  useEffect(() => {
    if (activeConverationRef?.current?.id !== items?.id) {
      setUnReadCount(items?.mentor_coach_unread_count);
    }
  }, [items?.last_message]);

  return (
    <div
      key={items.id}
      className={classNames(
        styles.chatItem,
        "flex items-center justify-between",
        { [styles.activeChat]: activeConveration?.id === items?.id }
      )}
      onClick={() => {
        activeConverationRef.current = items;
        setActiveConveration(items);
        setUnReadCount(0);
      }}
    >
      <div className="flex items-center gap-2">
        <Image
          src={items?.fellow?.profile_asset?.full_path ?? Images.DefaultAvatar}
          alt="product-img"
          height={42}
          width={42}
        />
        <div className="flex flex-col">
          <p>
            {items?.fellow?.first_name} {items?.fellow?.last_name}
          </p>
          <span>{items?.last_message}</span>
        </div>
      </div>

      <div
        className={classNames(
          styles.rightContent,
          "flex flex-col items-center justify-center gap-2"
        )}
      >
        <span className="text-nowrap">
          {moment(items?.updated_at).format("MMM DD, YYYY")}
        </span>
        {unReadCount > 0 ? (
          <div className={classNames(styles.pendingMessages)}>
            <span>{unReadCount}</span>
          </div>
        ) : (
          <span>&nbsp; </span>
        )}
      </div>
    </div>
  );
};

export default ChatList;
