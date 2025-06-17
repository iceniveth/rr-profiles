# Blueprint for apps

It is assumed here to have knowledge of the Javacript ecosystem

1. Get started using [react-router](https://reactrouter.com/).
1. Install Prettier.
1. Automatic arranging of tailwind class names [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).
1. Add VSCode project setting to use Prettier formatting on save.
1. Install `vite-plugin-devtools-json` to avoid errors due to dev tools path (A react-router issue).
1. Learn [Conform](https://conform.guide/) for form validation.
   - Progressive enhancement.
   - Integrates well for both frontend and backend.

## Things to do:

- [x] Optimistic delete in profile list with progressive enhancement
- [x] Toggle filter using query string
- [ ] Add input:file in create and edit profile.
- [ ] Ensure that viewing a profile will prefill the input:file.
- [ ] Form resetting within the page
- [ ] Dialog but fallbacks to a new page (if no JS)
- [ ] Route for pessimistic UI (loading)
- [ ] Route for optimistic UI
