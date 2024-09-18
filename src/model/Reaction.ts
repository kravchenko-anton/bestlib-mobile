import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Reaction extends Model {
  static table = "reactions_list";

  @field("book_id") bookId: string;
  @field("book_title") bookTitle: string;
  @field("book_author") bookAuthor: string;
  @field("book_picture") bookPicture: string;
  @field("type") type: string;
  @field("text") text: string;
  @field("xpath") xpath: string;
  @field("startOffset") startOffset: number;
  @field("endOffset") endOffset: number;
}
