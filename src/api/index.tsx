import {
  AuthApi,
  AuthorApi,
  BookApi,
  CatalogApi,
  EbookApi,
  GenreApi,
  ReactionApi,
  RecommendationApi,
  StorageApi,
  UserApi,
} from "api-client";
import { instance } from "./interceptors";

const mobileInstance: any = instance;
const serverUrl = process.env.SERVER_URL;
const baseParameters = {
  basePath: serverUrl,
  isJsonMime: () => true,
};
const auth = new AuthApi(baseParameters, serverUrl, undefined);

const book = new BookApi(baseParameters, serverUrl, mobileInstance);

const catalog = new CatalogApi(baseParameters, serverUrl, mobileInstance);

const ebook = new EbookApi(baseParameters, serverUrl, mobileInstance);

const genre = new GenreApi(baseParameters, serverUrl, mobileInstance);

const recommendation = new RecommendationApi(
  baseParameters,
  serverUrl,
  mobileInstance,
);

const storage = new StorageApi(baseParameters, serverUrl, mobileInstance);

const user = new UserApi(baseParameters, serverUrl, mobileInstance);
const reaction = new ReactionApi(baseParameters, serverUrl, mobileInstance);
const author = new AuthorApi(baseParameters, serverUrl, mobileInstance);
export default {
  auth,
  book,
  catalog,
  author,
  ebook,
  genre,
  reaction,
  recommendation,
  storage,
  user,
};
