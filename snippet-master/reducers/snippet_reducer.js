import {
  BOOKMARK_SNIPPET,
  DELETE_SNIPPET,
  GET_ADMIN_SNIPPETS_SUCCESS,
  GET_SNIPPETS_BEGIN,
  GET_SNIPPETS_SUCCESS,
  HIDE_SNIPPET_MODAL,
  INPUT_CHANGE,
  LOAD_MORE,
  RELOAD_SNIPPETS,
  REMOVE_SNIPPET,
  SEARCHING,
  SHOW_SNIPPET_MODAL,
  SINGLE_SNIPPET_SUCCES,
  UNBOOKMARK_SNIPPET,
} from "../utils/actions";

const snippet_reducer = (state, action) => {
  if (action.type === GET_SNIPPETS_BEGIN) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === GET_SNIPPETS_SUCCESS) {
    return {
      ...state,
      snippets: action?.payload?.snippets,
      totalSnippets: action?.payload?.size,
      loading: false,
    };
  }

  if (action.type === LOAD_MORE) {
    return {
      ...state,
      snippets: [...state.snippets, ...action.payload.snippets],
      totalSnippets: action.payload.size,
      loading: false,
    };
  }

  if (action.type === INPUT_CHANGE) {
    return {
      ...state,
      searchState: {
        ...state.searchState,
        search: action.payload,
      },
    };
  }

  if (action.type === SEARCHING) {
    return {
      ...state,
      searchState: {
        ...state.searchState,
        message: action.payload.message,
        searched: true,
        search: action.payload.search,
      },
      snippets: action.payload.data,
    };
  }

  if (action.type === RELOAD_SNIPPETS) {
    return {
      ...state,
      snippets: action.payload,
    };
  }

  if (action.type === GET_ADMIN_SNIPPETS_SUCCESS) {
    return {
      ...state,
      allSnippetsAdmin: action.payload,
    };
  }

  if (action.type === DELETE_SNIPPET) {
    return {
      ...state,
      loading: false,
    };
  }

  if (action.type === SHOW_SNIPPET_MODAL) {
    return {
      ...state,
      snippetModal: true,
    };
  }
  if (action.type === HIDE_SNIPPET_MODAL) {
    return {
      ...state,
      snippetModal: false,
    };
  }

  if (action.type === REMOVE_SNIPPET) {
    return {
      ...state,
      removeSnippet: !state.removeSnippet,
    };
  }

  if (action.type === BOOKMARK_SNIPPET) {
    return {
      ...state,
      bookmarked: !state.bookmarked,
    };
  }

  if (action.type === UNBOOKMARK_SNIPPET) {
    return {
      ...state,
      bookmarked: !state.bookmarked,
    };
  }

  //single snippet
  if (action.type === SINGLE_SNIPPET_SUCCES) {
    return {
      ...state,
      singleSnippet: action.payload,
      expandSnippet: !state.expandSnippet,
    };
  }

  return { ...state };
};

export default snippet_reducer;
