import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Reading extends Model {
  static table = "reading_histories";
  @field("book_id") bookId: string;
  @field("book_title") bookTitle: string;
  @field("book_author") bookAuthor: string;
  @field("book_picture") bookPicture: string;
  @field("start_date") startDate: number;
  @field("end_date") endDate: number;
  @field("reading_time_ms") readingTimeMs: number;
  @field("scroll_position") scrollPosition: number;
  @field("start_progress") startProgress: number;
  @field("end_progress") endProgress: number;
  @field("progress_delta") progressDelta: number;
}
