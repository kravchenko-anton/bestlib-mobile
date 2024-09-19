import { Model } from "@nozbe/watermelondb";
import { field, nochange, text } from "@nozbe/watermelondb/decorators";

export default class Reaction extends Model {
  static table = "reactions_list";
  @text("type") type: string;
  @text("text") text: string;
  @text("xpath") xpath: string;
  @field("startOffset") startOffset: number;
  @field("endOffset") endOffset: number;
  @nochange @field("book_id") bookId: string;
  @field("book_title") bookTitle: string;
  @field("book_author") bookAuthor: string;
  @field("book_picture") bookPicture: string;
  toJson() {
    const json = Object.assign({}, this._raw);
    Object.keys(json).forEach((key) => {
      if (key.startsWith("_")) {
        // @ts-ignore
        delete json[key];
      }
    });
    return json;
  }
}
