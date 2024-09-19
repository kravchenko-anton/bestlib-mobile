import { Model } from "@nozbe/watermelondb";
import { date, field, nochange, text } from "@nozbe/watermelondb/decorators";

export default class Reading extends Model {
  static table = "reading_histories";
  @nochange @field("book_id") bookId: string;
  @text("book_title") bookTitle: string;
  @text("book_author") bookAuthor: string;
  @text("book_picture") bookPicture: string;
  @date("start_date") startDate: number;
  @date("end_date") endDate: number;
  @field("reading_time_ms") readingTimeMs: number;
  @field("scroll_position") scrollPosition: number;
  @field("start_progress") startProgress: number;
  @field("end_progress") endProgress: number;
  @field("progress_delta") progressDelta: number;
}
