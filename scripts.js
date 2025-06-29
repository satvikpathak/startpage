/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = $searchLookup$; // This will need to be defined elsewhere
const engine = "$searchEngine$"; // This will need to be defined elsewhere
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
};

const isWebUrl = value => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = value => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  const url = engineUrls[engine] ?? engine;
  return url.replace("{query}", value);
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = event => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * Inject bookmarks into HTML
 */

const bookmarks = [
  {
    "id": "1oaCBxd7s6KmzSwX",
    "label": "College",
    "bookmarks": [
      {
        "id": "3u4yWvo38VOYeGza",
        "label": "Classroom",
        "url": "https://classroom.google.com/u/3/?pli=1"
      },
      {
        "id": "nP7W7RsyJw7mkTl5",
        "label": "Gmail",
        "url": "https://mail.google.com/mail/u/2/#inbox"
      }
    ]
  },
  {
    "id": "dtrvLFFLFnrQjkG2",
    "label": "Coding",
    "bookmarks": [
      {
        "id": "82w1knOLi8eXsGLz",
        "label": "GitHub",
        "url": "https://github.com/"
      },
      {
        "id": "ofNYK1iWv2WXQk7D",
        "label": "ChatGPT",
        "url": "https://chatgpt.com/?oai-dm=1"
      },
      {
        "id": "DNZqAsQIJVGCnil5",
        "label": "LeetCode",
        "url": "https://leetcode.com/"
      },
      {
        "id": "Bz71CEQ9UFYwvn0Y",
        "label": "DSA",
        "url": "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/"
      },
      {
        "id": "PYTHON_PLAYLIST_ID",
        "label": "Python",
        "url": "https://www.youtube.com/playlist?list=PLGjplNEQ1it8-0CmoljS5yeV-GlKSUEt0"
      }
    ]
  },
  {
    "id": "i9omsaxoVWK4oT6w",
    "label": "Social",
    "bookmarks": [
      {
        "id": "DpLqzmkY5MRtLT08",
        "label": "Twitter",
        "url": "https://x.com/home"
      },
      {
        "id": "kUHGSDQaey4uoGG8",
        "label": "YouTube",
        "url": "https://www.youtube.com/"
      },
      {
        "id": "uemzWv4PgtifncYo",
        "label": "Monkeytype",
        "url": "https://monkeytype.com/"
      },
      {
        "id": "LINKEDIN_ID",
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/feed/"
      },
      {
      "id": "WHATSAPP_ID",
      "label": "WhatsApp",
      "url": "https://web.whatsapp.com/"
     }
    ]
  }
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = title => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach(li => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group));
};

injectBookmarks();
