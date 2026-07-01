# GBIT Website

A simple multi-page company website built with **only HTML, inline CSS, and vanilla JavaScript** — no Bootstrap, Tailwind, React, or any external library.

## Pages

| File | What it is |
|------|------------|
| `index.html` | Home page |
| `insights.html` | Insights / case studies |
| `careers.html` | Job openings |
| `about.html` | About the company |
| `login.html` | Login form |
| `signup.html` | Registration form |
| `contact.html` | Contact Us form + office locations |
| `header.html` | Reusable header (loaded into every page) |
| `footer.html` | Reusable footer (loaded into every page) |
| `script.js` | All the JavaScript (header/footer loading, validation, session) |

## How to run

**Run it on a local server — do NOT double-click the HTML files.**

The header and footer are loaded with `fetch()`, which is blocked when a page is opened directly as a file (`file://`). Opening as a file also breaks the login/logout state.

Easiest way (VS Code):
1. Install the **Live Server** extension.
2. Right-click `index.html` → **Open with Live Server**.
3. The address bar should show `http://127.0.0.1:5500/...`

## Reusable header & footer

Every page has two empty boxes:

```html
<div id="header"></div>
<div id="footer"></div>
```

`script.js` fetches `header.html` / `footer.html` and drops them into these boxes, so the header/footer are written once and shared everywhere.

## Login

- Fixed (hardcoded) credentials:
  - **Email:** `yamini@gmail.com`
  - **Password:** `12345`
- On success → shows "Login Successful" and redirects to `index.html`.
- On failure → shows "Invalid Email or Password."

> Note: hardcoded credentials in JavaScript are **not secure** (anyone can read them in the browser). This is only for practice/demo. Real login needs a server.

## Login / Logout using session storage

The site remembers you are logged in using **one flag** in `sessionStorage`:

1. **Login success** → `sessionStorage.setItem("loggedIn", "true")`
2. **Every page** → `showAuthLinks()` reads that flag:
   - flag is `"true"` → show **Logout**, hide **Login**
   - otherwise → show **Login**, hide **Logout**
3. **Logout** → `sessionStorage.clear()` → redirect to `login.html` → flag gone → shows **Login** again

`sessionStorage` lasts only for the current browser tab. Close the tab and you are logged out again. (Swap it for `localStorage` if you want it to survive closing the tab.)

You can watch this live: **F12 → Application → Session Storage**.

## Validation (two layers)

### 1. HTML validation (first check, done by the browser)
Attributes on the inputs, e.g.:
- `required`
- `type="email"`, `type="tel"`
- `pattern`, `minlength`, `maxlength`

The browser blocks the obvious problems (empty fields, bad email) automatically before the form submits.

### 2. JavaScript validation (second check, our own rules)
Functions in `script.js` read each field and check the details, showing a message under the field:

| Function | Page | Checks |
|----------|------|--------|
| `validateLogin` | login | email not empty + has `@`, password not empty, then match credentials |
| `validateSignup` | signup | name lengths, phone = 10 digits, email has `@`, password ≥ 8, confirm matches |
| `validateContact` | contact | name (letters, min 15), email has `@`, phone = 10 digits, subject required, message ≥ 20 chars |

JavaScript is needed for rules HTML cannot do (like "confirm password must match password") and for custom error messages.

> Both layers run in the browser, so neither is real security. A real app also needs server-side validation.

## Contact form

The Contact page **does not save or send anything**. `validateContact` just checks the fields, then shows "Message Sent Successfully!" and clears the form. To actually deliver the message you would need a backend/API.

## Layout (sticky footer)

Each page uses flexbox so the footer sits at the bottom of the page (like a normal corporate site):

```html
<body style="display:flex; flex-direction:column; min-height:100vh;">
  <div id="header"></div>
  <div style="flex:1;"> ... page content ... </div>
  <div id="footer"></div>
</body>
```

`flex:1` on the middle section makes it grow and push the footer down, so:
- short page → footer sits at the bottom of the screen
- long page → footer comes after the content when you scroll
