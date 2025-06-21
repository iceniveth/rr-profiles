import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/profiles", "./routes/profiles/index.tsx"),
  route("/optimistic-profiles", "./routes/optimistic-profiles/index.tsx"),
  route("/profiles/new", "./routes/profiles/new/index.tsx"),
  route("/profiles/:profileId/edit", "./routes/profiles/edit/index.tsx"),
  route("/profiles/:profileId/delete", "./routes/profiles/delete/index.ts"),
] satisfies RouteConfig;
