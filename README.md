# discourse-replyquotes

A Discourse **theme component** that automatically inserts a quote of the first paragraph of a post when a user clicks the per-post reply button.

## What it does

When a user clicks **Reply** on a specific post (not the topic-level reply button), the composer opens with a `[quote]` block pre-filled with the first paragraph of that post. The user can then edit or delete the quote before submitting.

Replies to the topic (not a specific post) are unaffected. Existing drafts are never overwritten.

## Installation

In your Discourse admin panel, go to **Appearance → Themes**, click **Install**, choose **From a git repository**, and enter:

```
https://github.com/Folxlore-Design/discourse-replyquotes
```

No rebuild required. Activate the component by adding it to your active theme.

## How it works

Pure client-side — no backend code or site settings. The component hooks into the Discourse composer's `open()` method. When `model.replyPost` is set (indicating a per-post reply), it extracts the first `<p>` from the post's rendered HTML and formats it as a standard Discourse quote block:

```
[quote="username, post:N, topic:M"]
First paragraph text here.
[/quote]
```

## License

MIT
