# Hackmann 2023 Website

## Development

Also make sure to have a `.env` file with `PASSWORD` set to the password for the admin page (format: `PASSWORD=username:password`).

```bash
# If you don't have pnpm installed
npm install -g pnpm

# Install dependencies
pnpm install

# Push prisma
pnpm prisma db push

# Run dev server
pnpm run dev
```

## Todo

- [ ] Use forms instead of POST requests
