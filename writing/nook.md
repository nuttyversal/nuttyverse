# Nutty's Nook

<b>Welcome to my nook — a cozy space I've created for composing content in the
Nuttyverse!</b> It's essentially a nutty-flavored markdown editor, tailored to
my own aesthetic and functional preferences.

On the left side, you'll find a [CodeMirror][CodeMirror] editor configured with
[Vim][Vim] bindings. As I draft my markdown content, it passes through the
[MDX][MDX] pipeline, compiling it into JSX, which is then beautifully rendered
on the right side in real-time.

A note for the navigators who browse the web using only a keyboard interface.
The editor will trap focus in order to support `<Tab>` key bindings. However,
there is an escape hatch: "Press `Esc`, then (`<Shift> +`) `<Tab>` to move focus
away from the editor."

## Authentication flow

- A navigator makes a login request with their username & password.

- The server authenticates the navigator generates an access token & refresh
  token pair. The access token is returned to the navigator, but the server
  stores away the refresh token (in the Redis cache).

- The navigator includes the access token in subsequent requests to access
  protected endpoints requiring authentication.

- If the protected endpoint returns a `401 Unauthorized` response, then the
  access token has expired and must be refreshed. When this happens, a navigator
  can use the expired access token to request a new access token.

- When a token refresh is requested, the server will retrieve for the user's
  refresh token. As long as their refresh token is still valid (unexpired), then
  it can be used to generate new tokens. If not, then the navigator will be
  logged out.

- Given that the refresh token is still valid, it will be used to generate both
  a new access token and refresh token. The existing token will be rotated
  with the fresh token, which effectively renews the navigator's session.

- As long as the navigator refreshes their tokens within the refresh token
  expiration, their sessions will extend indefinitely.

- When the navigator logs out, all of the tokens that were issued to them will
  be invalidated.

## Authentication

- The expiration time for access tokens is $t_A = \text{30 minutes}$.

- The expiration time for refresh tokens is $t_R = \text{7 days}$.

- When a navigator makes a request to `Login` to the Nuttyverse, a token pair
  $(A_t, R_t)$ is issued at time $t$. $A_t$ is an access token that expires at
  $t + t_A$. $R_t$ is a refresh token that expires at $t + t_R$.

- An access token $A_t$ is given to the navigator, but refresh tokens never leave
  the server. The navigator can use $A_t$ to authenticate and access API protected
  endpoints between $t$ and $t + t_A$.

- An access token $A_t$ can also be used to request a `Token Refresh` operation,
  which issues a new token pair $(A_{t'}, R_{t'})$ between $t < t' < t + t_R$.
  During this operation, $R_t$ is invalidated and rotated with $R_{t'}$. This
  effectively extends the login session by $t' - t$.

- If $R_t$ expires before another `Token Refresh` operation could be requested,
  then a `Logout` operation will be forced. The navigator will to have make a
  request to `Login` before they can access protected endpoints again.

- When a navigator makes a request to `Logout`, all previously issued access
  tokens and refresh tokens are revoked and can no longer be used to request
  operations to be performed in the Nuttyverse.

- A security consideration. While this allows for longer sessions without
  re-authentication, it also means that a compromised (but expired) access token
  could potentially be used for a `Token Refresh` operation.


## After the holy wars …

Have you used Vim before? Interacting with this editor might not make much sense
if you haven't. It's a rather arcane (and initially unintuitive) way of editing
text. However, it's also incredibly powerful once you become proficient at
wielding it.

Vim is a kind of black magic (yes, indeed, it is [evil][evil]) that lets you
manipulate a cursor to transform text using only your keyboard. Try it for
yourself! `^.^`

### Movement spells

There are lots of ways that you can move around the document. We can start with
the basic movement spells. These are your weakest spells that will nudge the
cursor by a *teeny* amount:

- <VimSpell spell="h" />
- <VimSpell spell="j" />
- <VimSpell spell="k" />
- <VimSpell spell="l" />

Once you've mastered those spells, we can try casting slightly stronger spells.

- <VimSpell spell="w" />
- <VimSpell spell="e" />
- <VimSpell spell="b" />
- <VimSpell spell="(" />
- <VimSpell spell=")" />
- <VimSpell spell="{" />
- <VimSpell spell="}" />

Certain spells will have a great effect on the cursor. Cast with caution!

- <VimSpell spell="gg" />
- <VimSpell spell="G" />

These movement spells control the scrolling of the document:

- <VimSpell spell="Ctrl+e" />
- <VimSpell spell="Ctrl+y" />
- <VimSpell spell="Ctrl+d" />
- <VimSpell spell="Ctrl+u" />
- <VimSpell spell="Ctrl+f" />
- <VimSpell spell="Ctrl+b" />

### Modal editing

Vim is a modal editor, which means that the list of spells that can be cast
changes based on the currently active mode. For example, movement spells may
only be casted in `NORMAL` or `VISUAL` mode.

To insert text into the document, try entering `INSERT` mode. Once you enter
this mode, the block cursor (`-> █`) will transform into a line cursor (`-> ▏`).
In `INSERT` mode, typing characters inserts characters just like a regular text
editor.

- <VimSpell spell="i" />
- <VimSpell spell="a" />
- <VimSpell spell="Esc" />

## May I have this dance?

The block cursor dances over the lines in the editor, beckoning his partner, the
preview pane, to follow. She acquiesces <Icon name="heart" />, and in perfect
synchronization, they dance, the preview scrolling in rhythm with his leaps.

### Sync mechanism

As the markdown syntax tree is traversed, the `remark` and `rehype` plugins that
transform MDX nodes into JSX & HTML nodes carry over the positional information
of the node as it is located in the source document.

Each node is annotated with a class (`.source-map-<line-number>`), loosely
tethering the nodes to their nascent form in the editor. However, this results
in a partial, non-injective mapping — creating some friction in this duet.

Consider the following <s>aphorism</s> markdown:

```markdown
1 | Act is the blossom of thought; and joy and suffering are its fruits;
2 | thus does a man garner in the sweet and bitter fruitage of his own
3 | husbandry.
4 |
5 | ― James Allen, As a Man Thinketh
```

… will be transformed into …

```html
<p class="source-map-1">
	Act is the blossom of thought; and joy and suffering are its fruits;
	thus does a man garner in the sweet and bitter fruitage of his own
	husbandry.
</p>

<p class="source-map-5">
	― James Allen, As a Man Thinketh
</p>
```

From this initial transformation, we can see that `Ln. 1 – 3` maps to
`.source-map-1` ($\implies$ non-injectivity), `Ln. 5` maps to `.source-map-5`,
and `Ln. 4` does not seem to map to anything ($\implies$ partial domain).

Ideally, whenever the cursor leaps from one line to another line, that movement
should be mirrored in the scrolling of the preview to establish a clear spatial
relationship between the editor and the preview. Moving from `Ln. 1` to `Ln. 3`
should result in movement in the preview, as should moving from `Ln. 3` to `Ln.
4` or from `Ln. 4` to `Ln. 5`.

Doing this involves enriching the mapping in a manner that makes it both
**injective** and **total**. We can start by transforming the codomain into
`scrollY` positions instead of element selectors. This shift from discrete
elements to a continuous scroll space allows us to assign a unique position to
every line, even those that previously didn't map to any element.

**Make it injective**. When multiple lines point to the same element, the target
scrolling positions are [linearly interpolated][1] over $\Delta y = y_2 - y_1$
of the element's bounding box. They glide between the element's opening note
($y_1$) to its closing refrain ($y_2$), ensuring movement even when the
underlying markup remains static.

**Make it total**. In cases when one or more consecutive lines in the editor
don't map to any element in the preview, then the target scrolling positions are
also [linearly interpolated][2] between the ending $y$ of the last mapped
element and the starting $y$ of the next mapped element.

These refinements to our mapping function enable a precise synchronization
mechanism. By attaching listeners to the editor's cursor movements, we can now
initiate smooth tweens between specific `scrollY` positions in the preview to
align it with the cursor position.

[1]: https://code.nuttyver.se/observable/nuttyverse/src/commit/94b282d19f8045e081ae4ebd0a4d245ea1d75e94/app/src/components/Editor/sync/calc.ts#L57-L79
[2]: https://code.nuttyver.se/observable/nuttyverse/src/commit/94b282d19f8045e081ae4ebd0a4d245ea1d75e94/app/src/components/Editor/sync/calc.ts#L81-L107

[evil]: https://github.com/emacs-evil/evil
[marks]: https://vim.fandom.com/wiki/Using_marks
[Flying Raijin]: https://naruto.fandom.com/wiki/Flying_Thunder_God_Technique

[CodeMirror]: https://codemirror.net/
[MDX]: https://mdxjs.com/
[Vim]: https://www.vim.org/
