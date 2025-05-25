import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/profiles", "./routes/profiles/index.tsx"),
  route("/profiles/new", "./routes/profiles/new/index.tsx"),
  route("/profiles/:profileId/edit", "./routes/profiles/edit/index.tsx"),
] satisfies RouteConfig;
