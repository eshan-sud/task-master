// backend/middleware/csrf.js

const csrf = require("csurf");

export default csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  },
});
