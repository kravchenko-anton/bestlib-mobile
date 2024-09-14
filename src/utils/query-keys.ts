export const QueryKeys = {
  library: ["user-library"],
  userStatistics: ["user-statistics"],
  featured: ["featured"],
  recommendationGenres: ["recommendation-genres"],
  searchByTerm: (searchTerm: string) => ["search-by-term", searchTerm],
  reaction: {
    list: ["reactions"],
    byId: (id: string) => ["reaction-by-id", id],
  },
  book: {
    picksOfTheWeek: ["picks-of-the-week"],
    key: ["book"],
    infoById: (id: string) => ["book", id],
    adminInfoById: (id: string) => ["admin-info-by-id", id],
    isSaved: (id: string) => ["is-saved-book", id],
    overview: {
      key: ["book-overview"],
      byId: (id: string) => ["book-overview", id],
    },
    updateInfo: {
      key: ["book-update-info"],
      byId: (id: string) => ["book-update-info", id],
    },
    catalog: {
      key: ["books-catalog"],
      action: (searchTerm: string, page: number) => [
        "books-catalog",
        searchTerm,
        page,
      ],
    },
  },

  genres: {
    key: ["genres"],
    byId: (id: string) => ["genre", id],
  },

  ebook: {
    key: ["ebook"],
    byId: (id: string) => ["ebook", id],
    storedEbookById: (id: string) => ["stored-ebook", id],
  },

  bookTemplate: {
    key: ["book-template"],
    byId: (id: string) => ["book-template", id],
    catalog: {
      key: ["book-templates-catalog"],
      action: (searchTerm: string, page: number) => [
        "book-template-catalog",
        searchTerm,
        page,
      ],
    },
  },

  users: {
    catalog: {
      key: ["users-catalog"],
      action: (searchTerm: string, page: number) => [
        "users-catalog",
        searchTerm,
        page,
      ],
    },
  },
};

export const MutationKeys = {
  book: {
    review: ["review-book"],
    update: ["update-book"],
    startReadingById: (id: string) => ["start-reading", id],
    toggleSaveById: ["toggle-save"],
    finishReading: ["finish-reading"],
    removeFromLibrary: ["remove-from-library"],
    removeBook: ["remove-book"],
    createBook: ["create-book"],
  },
  review: {
    sendReview: ["send-impression"],
  },
  bookTemplate: {
    unfold: ["unfold"],
    parse: ["parse-template"],
    deleteTemplate: ["delete-template"],
  },
  recommendation: {
    update: ["update-recommendation"],
  },
  user: {
    remove: ["remove-user"],
    adjustGoal: ["adjust-goal"],
    syncHistory: ["sync-history"],
  },
  storage: {
    uploadFile: ["upload-file"],
  },
  reaction: {
    create: ["create-reaction"],
    update: ["update-reaction"],
    remove: ["remove-reaction"],
  },
};
