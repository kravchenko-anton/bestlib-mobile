import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 6,
  tables: [
    tableSchema({
      name: "books_list",
      columns: [
        { name: "book_id", type: "string" },
        { name: "title", type: "string" },
        { name: "author", type: "string" },
        { name: "picture", type: "string" },
        { name: "is_read", type: "boolean" },
        { name: "is_saved", type: "boolean" },
        { name: "is_finished", type: "boolean" },
      ],
    }),
    tableSchema({
      name: "reactions_list",
      columns: [
        { name: "book_id", type: "string" },
        { name: "book_title", type: "string" },
        { name: "book_author", type: "string" },
        { name: "book_picture", type: "string" },
        { name: "type", type: "string" },
        { name: "text", type: "string" },
        { name: "xpath", type: "string" },
        { name: "startOffset", type: "number" },
        { name: "endOffset", type: "number" },
      ],
    }),
    tableSchema({
      name: "reading_histories",
      columns: [
        { name: "book_id", type: "string" },
        { name: "book_title", type: "string" },
        { name: "book_author", type: "string" },
        { name: "book_picture", type: "string" },
        { name: "start_date", type: "number" },
        { name: "end_date", type: "number" },
        { name: "reading_time_ms", type: "number" },
        { name: "scroll_position", type: "number" },
        { name: "start_progress", type: "number" },
        { name: "end_progress", type: "number" },
        { name: "progress_delta", type: "number" },
      ],
    }),
  ],
});
