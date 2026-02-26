# discourse-replyquotes

A Discourse plugin that automatically inserts a quote of the first paragraph of a post when a user clicks the per-post reply button.

## What it does

When a user clicks **Reply** on a specific post (not the topic-level reply button), the composer opens with a `[quote]` block pre-filled with the first paragraph of that post. The user can then edit or delete the quote before submitting.

Replies to the topic (not a specific post) are unaffected. Existing drafts are never overwritten.

## Installation

Add to your Discourse instance via the admin plugin installer or by cloning into the `plugins/` directory:

```bash
cd /var/discourse/plugins
git clone https://github.com/Folxlore-Design/discourse-replyquotes.git
```

Then rebuild the app:

```bash
cd /var/discourse
./launcher rebuild app
```

## How it works

Pure client-side — no backend code or site settings. The plugin hooks into the Discourse composer's `open()` method. When `model.replyPost` is set (indicating a per-post reply), it extracts the first `<p>` from the post's rendered HTML and formats it as a standard Discourse quote block:

```
[quote="username, post:N, topic:M"]
First paragraph text here.
[/quote]
```

## License

MIT
