# Netlify Deployment Guide

## Issues Fixed

1. **Git merge conflicts** in `server/routes/answer.ts` - Resolved all `<<<<<<< HEAD` and `>>>>>>> refs/remotes/origin/main` markers
2. **Build configuration** - Updated `netlify.toml` to use `pnpm build:client` instead of `pnpm build`
3. **Netlify function format** - Updated functions to use proper Netlify function response format
4. **Import path issues** - Simplified the Netlify function to avoid complex server route dependencies

## Deployment Steps

### 1. Install Dependencies
```bash
# If you don't have pnpm installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 2. Build the Project
```bash
# Build only the client (Netlify doesn't need server build)
pnpm build:client
```

### 3. Deploy to Netlify

#### Option A: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

#### Option B: Deploy via Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   - **Build command**: `pnpm build:client`
   - **Publish directory**: `dist/spa`
   - **Functions directory**: `netlify/functions`

### 4. Environment Variables (Optional)
If you need to set environment variables in Netlify:
1. Go to Site settings > Environment variables
2. Add any required variables (check your `.env` file)

## Current Configuration

### netlify.toml
```toml
[build]
  command = "pnpm build:client"
  functions = "netlify/functions"
  publish = "dist/spa"

[functions]
  external_node_modules = ["express", "@google/generative-ai", "zod", "zenscroll"]
  node_bundler = "esbuild"
  directory = "netlify/functions"
  
[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = false
```

### API Endpoints
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo response
- `POST /api/answer` - Legal AI response (placeholder for now)

## Troubleshooting

### Common Issues

1. **Build fails with "pnpm not found"**
   - Use `npm run build:client` instead
   - Or install pnpm: `npm install -g pnpm`

2. **Functions not working**
   - Check that `netlify/functions` directory exists
   - Verify function files are `.mts` or `.js` format
   - Check Netlify function logs in the dashboard

3. **CORS errors**
   - The functions already include CORS headers
   - Check that the redirect rule is working: `/api/*` → `/.netlify/functions/api/:splat`

4. **404 errors on routes**
   - The SPA redirect rule should handle this: `/*` → `/index.html`

### PowerShell Execution Policy Issue
If you get PowerShell execution policy errors:
```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Next Steps

1. **Test the deployment** - Visit your Netlify URL and test the API endpoints
2. **Implement full legal AI** - Replace the placeholder response in `netlify/functions/api.mts` with the full implementation
3. **Add environment variables** - Set up any required API keys or configuration
4. **Monitor logs** - Use Netlify function logs to debug any issues

## File Structure
```
Briefix/
├── netlify/
│   └── functions/
│       └── api.mts          # Main API function
├── client/                  # React frontend
├── server/                  # Server-side code (not used in Netlify)
├── netlify.toml            # Netlify configuration
└── package.json            # Dependencies and scripts
```

The deployment should now work correctly with these fixes!
