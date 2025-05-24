import { createCookieSessionStorage } from "react-router";

export const flashCookie = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60,
    secrets: ["itsasecret"],
  },
});
