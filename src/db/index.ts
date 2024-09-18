import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import * as Crypto from "expo-crypto";
import Book from "../model/Book";
import Reaction from "../model/Reaction";

import schema from "./schema";

setGenerator(() => Crypto.randomUUID());

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  jsi: true,
  onSetUpError: (error) => {},
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Reaction, Book],
});

export default database;

export const ReactionsCollection = database.get<Reaction>("reactions_list");
export const allocationsCollection = database.get<Book>("allocations");
