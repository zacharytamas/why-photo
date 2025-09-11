# why-photo

This is a _very in development_ tool for myself to explore photos from my Immich instance. The idea behind this tool is to show me random photos I've taken and allow me to elaborate on what is happening in the photo, why I took it, etc. The result will eventually be added to my journal application.

I find that I don't journal as much as I'd like, especially with young children who are changing fast, but I do take a lot of photos of them and their shenanigans and what is going on in our lives. This tool's purpose is to help me reflect and document these later before I forget the significance of reasoning why I took the photo.

To run this application:

```bash
bun install
bunx --bun run start
```

# Building For Production

To build this application for production:

```bash
bunx --bun run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
bunx --bun run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
bunx --bun run lint
bunx --bun run format
bunx --bun run check
```
