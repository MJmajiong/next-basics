import { createProviderClass } from "@next-core/brick-utils";
import { StoriesCache } from "@next-core/editor-bricks-helper";

interface installInfo {
  list?: string[];
  fields?: string[];
}

export async function getStoriesJSON(info?: installInfo) {
  const stories = StoriesCache.getInstance();
  if (info) {
    await stories.install({
      list: info.list,
      fields: info.fields || ["*"],
    });
  } else {
    const list = stories.getStoryList();
    if (list.length === 0) {
      await stories.install({});
    }
  }
  return stories.getStoryList();
}

// providers-of-next-builder.build-api-get-stories-json
customElements.define(
  "next-builder.provider-get-stories-json-with-cache",
  createProviderClass(getStoriesJSON)
);

export default StoriesCache;
