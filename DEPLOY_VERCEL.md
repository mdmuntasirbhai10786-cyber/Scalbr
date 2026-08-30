# Deploy SCALBR to Vercel

This project is a standard Next.js 15 App Router app. Deployment takes ~2 minutes.

## 1. Prerequisites

- A **GitHub / GitLab / Bitbucket** account with this repo pushed
- A **Vercel** account (free) at https://vercel.com
- A **MongoDB Atlas** cluster (free tier) at https://www.mongodb.com/cloud/atlas

## 2. Create the MongoDB Atlas cluster

1. Sign in to MongoDB Atlas → **Build a Database** → **M0 Free**
2. Choose a region close to your Vercel region (default `us-east` is fine)
3. **Database Access** → add a user (`scalbr_app`) with a strong password. Give it **Read and write to any database**
4. **Network Access** → add IP `0.0.0.0/0` (allow from anywhere, required for Vercel serverless)
5. **Connect** → **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://scalbr_app:<PASSWORD>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add the database name to the URI (before the `?`):
   ```
   mongodb+srv://scalbr_app:<PASSWORD>@cluster0.xxxxx.mongodb.net/scalbr?retryWrites=true&w=majority
   ```

## 3. Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Framework preset should auto-detect as **Next.js**. Leave build settings as default.
4. Expand **Environment Variables** and add:
   - `MONGO_URL` = the Atlas connection string from step 2.6
   - (optional) `DB_NAME` = `scalbr` (only if you did not include the DB name in the URI)
5. Click **Deploy**

Vercel will build and give you a `*.vercel.app` URL in ~60 seconds.

## 4. Update your Cal.com handle

Edit `/components/cal-init.js`:

```js
export const CAL_LINK = 'your-handle/intro-call'
```

Commit + push, Vercel will redeploy automatically.

## 5. Custom domain (optional)

Project → **Settings** → **Domains** → **Add** → follow DNS instructions.

---

## Known limits & gotchas on Vercel

### Attachment size

Vercel serverless functions cap request bodies at **4.5 MB**. The form is configured for:
- **2 MB per file**
- **3 MB total** across all attachments

For bigger files, users are prompted to paste a **Drive / Frame.io / WeTransfer link** in the "Website / Social link" field. To raise the cap without swapping storage, upgrade to Vercel Pro (10 MB) or move uploads to object storage (S3 / Vercel Blob / Cloudinary).

### Showreel video

`/public/showreel.webm` (~1 MB) and `.mp4` (~5 MB) ship as static assets. Replace them with your real showreel any time — no code change needed.

### Region

By default Vercel runs your serverless functions in `iad1` (Washington DC). If your Atlas cluster is in a different region, add `"functions": { "app/api/**": { "regions": ["iad1"] } }` to `vercel.json` (or match Atlas to Vercel's region).
