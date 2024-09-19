import Reading from "@/model/Reading";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId";
import * as Crypto from "expo-crypto";
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
  modelClasses: [Reaction, Reading],
});

export default database;

export const ReactionsCollection = database.get<Reaction>("reactions_list");
export const ReadingCollection = database.get<Reading>("reading_histories");
