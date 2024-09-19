import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 9,
  tables: [
    tableSchema({
      name: "reactions_list",
      columns: [
        { name: "type", type: "string" },
        { name: "text", type: "string" },
        { name: "xpath", type: "string" },
        { name: "startOffset", type: "number" },
        { name: "endOffset", type: "number" },
        { name: "book_id", type: "string" },
        { name: "book_title", type: "string" },
        { name: "book_author", type: "string" },
        { name: "book_picture", type: "string" },
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
