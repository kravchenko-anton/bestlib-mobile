import database, { ReactionsCollection } from "@/db";
import type Reaction from "@/model/Reaction";
import { Q } from "@nozbe/watermelondb";
import { useEffect, useState } from "react";

export type CreateReaction = {
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookPicture: string;
  type: string;
  text: string;
  xpath: string;
  startOffset: number;
  endOffset: number;
};
export const useReactions = (bookId: string) => {
  const reactionBookList = ReactionsCollection;
  const [reactions, setReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    const observeData = async () => {
      const subscription = reactionBookList
        .query(Q.where("book_id", bookId))
        .observe()
        .subscribe((records) => {
          setReactions(
            records.map((record) => record._raw) as unknown as Reaction[],
          );
        });

      return () => subscription.unsubscribe();
    };

    observeData();
  }, [bookId]);

  const findReactionById = async (id: string) => {
    return await reactionBookList.find(id);
  };
  const createReaction = async (data: CreateReaction) => {
    console.log("Creating reaction", data);
    await database.write(async () => {
      return await reactionBookList.create((reaction) => {
        reaction.bookId = bookId;
        reaction.bookTitle = data.bookTitle;
        reaction.bookAuthor = data.bookAuthor;
        reaction.bookPicture = data.bookPicture;
        reaction.type = data.type;
        reaction.text = data.text;
        reaction.xpath = data.xpath;
        reaction.startOffset = data.startOffset;
        reaction.endOffset = data.endOffset;
      });
    });
  };
  const deleteReaction = async (id: string) => {
    await database.write(async () => {
      const reaction = await reactionBookList.find(id);
      await reaction.markAsDeleted();
    });
  };
  const updateReaction = async (id: string, data: (_: Reaction) => void) => {
    await database.write(async () => {
      const reaction = await reactionBookList.find(id);
      await reaction.update(data);
    });
  };
  return {
    allReactions: reactions,
    createReaction,
    updateReaction,
    deleteReaction,
    findReactionById,
  };
};
