// import { useSignInModal } from '@lib/components/comments/SignInModal';
import User from "./icons/User";
import updateFieldHeight from "../../utils/autosize";
import punctuationRegex from "../../utils/regex/punctuationRegex";
import cn from "classnames";
import cuid from "cuid";
import React, { useRef, useState, useEffect } from "react";
import Avatar from "./Avatar";
import { useComments } from "../../lib/hooks/use-comments";
import { useModal } from "../../lib/hooks/use-modal";
import { useUser } from "../../lib/hooks/use-user";
import { supabase } from "../../utils/supabase";
import { CommentType } from "../../utils/types";
import NewUserModal from "./NewUserModal";

interface Props {
  parentId?: number | null;
  autofocus?: boolean;
  handleResetCallback?: () => void;
  hideEarlyCallback?: () => void;
}

const NewCommentForm = ({
  parentId = null,
  autofocus = false,
  handleResetCallback,
  hideEarlyCallback,
}: Props): JSX.Element => {
  const [content, setContent] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, profile } = useUser();
  const { mutateGlobalCount, rootId, mutateComments } = useComments();
  // const { open, isOpen } = useModal({ signInModal: SignInModal, newUserModal: NewUserModal });

  useEffect(() => {
    if (user && profile && (!profile.full_name || !profile.username)) {
      open("newUserModal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, profile]);

  // useEffect(() => {
  //   if (!isOpen) {
  //     setIsLoading(false);
  //   }
  // }, [isOpen]);

  useEffect(() => {
    if (autofocus) {
      if (textareaRef && textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [autofocus]);

  async function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
    if (textareaRef?.current) {
      updateFieldHeight(textareaRef.current);
    }
  }

  function handleReset(): void {
    setContent("");
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "initial";
    }
    setIsLoading(false);
  }

  async function handleSubmit(): Promise<void> {
    setIsLoading(true);
    hideEarlyCallback?.();

    // if (!user) {
    //   return open('signInModal');
    // }

    // if (!profile) {
    //   return open('newUserModal');
    // }

    const postString = content
      .toString()
      .substring(0, 77)
      .replace(punctuationRegex, "")
      .replace(/(\r\n|\n|\r)/gm, "")
      .split(" ")
      .filter((str) => str !== "")
      .join("-")
      .toLowerCase();

    const slug = `${postString}-${cuid.slug()}`;

    const post = {
      authorId: user?.id,
      content: content,
      parentId: parentId ?? rootId,
      slug,
    };

    mutateGlobalCount((count: number) => count + 1, false);

    mutateComments(async (pages: CommentType[]) => {
      const optimisticResponse: CommentType = {
        ...post,
        author: profile,
        highlight: true,
        live: false,
        createdAt: new Date().toISOString(),
        id: null,
        title: null,
        isPublished: false,
        votes: 0,
        upvotes: 0,
        downvotes: 0,
        userVoteValue: 0,
      } as unknown as CommentType;

      const newData = [optimisticResponse, ...pages];

      return newData;
    }, false);

    const { data, error } = await supabase.from("posts").insert([post]);

    if (error) {
      console.log(error);
    } else {
      mutateComments(async (staleResponses: CommentType[]) => {
        const newResponse = {
          ...(typeof data[0] === "object" ? data[0] : {}),
          // ...data?.[0],
          author: profile,
          responses: [],
          responsesCount: 0,
          highlight: true,
          votes: 0,
          upvotes: 0,
          downvotes: 0,
          userVoteValue: 0,
        } as unknown as CommentType;

        const filteredResponses = staleResponses.filter(
          (response) => response.slug !== newResponse.slug
        );

        const newData = [[newResponse], ...filteredResponses];

        return newData;
      }, false);

      handleReset();
      handleResetCallback?.();
    }
  }

  return (
    <>
      <div className="flex flex-grow flex-col min-h-14">
        <div className="flex-grow flex items-center space-x-2">
          {!user && (
            <div
              className="focus-ring"
              // onClick={() => open("signInModal")}
              aria-label="Create new account"
            >
              <User className="text-gray-600 w-7 h-7" />
            </div>
          )}
          {user && (
            <button
              className="focus-ring"
              aria-label="View profile information"
            >
              <Avatar profile={profile} />
              {/* <Smile className="w-7 h-7 text-gray-500 hover:text-gray-800 transition" /> */}
            </button>
          )}

          <label className="flex-grow flex items-center cursor-text select-none focus-within-ring min-h-14">
            <span className="sr-only">Enter a comment</span>
            <textarea
              className="block bg-transparent flex-grow leading-5 min-h-5 max-h-36 resize-none m-0 px-0 text-gray-800 placeholder-gray-500 border-none overflow-auto text-sm transition-opacity disabled:opacity-50 focus:outline-none focus:shadow-none focus:ring-0"
              placeholder="Add a comment..."
              rows={1}
              value={content}
              onChange={handleChange}
              ref={textareaRef}
              disabled={isLoading}
            ></textarea>
          </label>

          <div className="h-full flex items-center justify-center w-12">
            <button
              className={cn(
                "text-indigo-500 font-semibold px-2 text-sm h-full max-h-10 border border-transparent focus-ring",
                {
                  "cursor-not-allowed opacity-50":
                    content.length < 1 || isLoading,
                }
              )}
              disabled={content.length < 1}
              onClick={handleSubmit}
              aria-label="Submit new post"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCommentForm;
