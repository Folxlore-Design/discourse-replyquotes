import { withPluginApi } from "discourse/lib/plugin-api";

// Extract plain text from the first <p> in the post's cooked HTML.
// Returns null if no <p> is found.
function extractFirstParagraph(cooked) {
  if (!cooked) return null;
  const div = document.createElement("div");
  div.innerHTML = cooked;
  const p = div.querySelector("p");
  return p ? p.textContent.trim() : null;
}

function buildQuote(post, text) {
  const username = post.username;
  const postNumber = post.post_number;
  const topicId = post.topic_id;
  return `[quote="${username}, post:${postNumber}, topic:${topicId}"]\n${text}\n[/quote]\n\n`;
}

export default {
  name: "reply-quotes",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.modifyClass("controller:composer", {
        pluginId: "reply-quotes",

        open(opts) {
          const result = this._super(opts);

          const finalize = () => {
            const model = this.model;
            // Only act when replying to a specific post with an empty composer
            if (!model?.replyPost) return;
            if (model.reply?.trim()) return;

            const post = model.replyPost;
            const firstParagraph = extractFirstParagraph(post.cooked);
            if (!firstParagraph) return;

            model.set("reply", buildQuote(post, firstParagraph));
          };

          if (result && typeof result.then === "function") {
            return result.then(finalize);
          }
          finalize();
          return result;
        },
      });
    });
  },
};
