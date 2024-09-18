import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Book extends Model {
  static table = "books_list";
  @field("book_id") bookId: string;
  @field("title") title: string;
  @field("author") author: string;
  @field("picture") picture: string;
  @field("is_read") isRead: boolean;
  @field("is_saved") isSaved: boolean;
  @field("is_finished") isFinished: boolean;
}
