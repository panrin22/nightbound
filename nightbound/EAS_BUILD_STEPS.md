# Nightbound — EAS Build (Closed testing)

You must be logged in to Expo. Run these **in PowerShell** from:

```powershell
cd C:\Users\tawat\grokwork\ai-bedtime-stories\nightbound
```

## Step 1 — Login (you do this once)

```powershell
npx eas-cli login
```

Use the Expo account email/password (or create free account at https://expo.dev/signup).

Check:

```powershell
npx eas-cli whoami
```

## Step 2 — Link project (creates real projectId)

```powershell
npx eas-cli init
```

Answer:
- Create a new project? **Yes**
- Name: **nightbound** (or accept default)

This writes a real UUID into `app.json` → `extra.eas.projectId`.

Or:

```powershell
npx eas-cli build:configure
```

## Step 3 — Build Android App Bundle (Play)

```powershell
npx eas-cli build -p android --profile production --non-interactive
```

If it asks about generating a keystore: choose **yes** (let Expo manage it).

Build runs **in the cloud** (10–20+ minutes). When done, open the URL in the terminal or:

```powershell
npx eas-cli build:list
```

Download the **.aab** file.

## Step 4 — Upload to Play Console

1. [Play Console](https://play.google.com/console) → Nightbound  
2. **Release** → **Testing** → **Closed testing**  
3. Create new release → **Upload** the `.aab`  
4. Privacy policy already set:  
   `https://panrin22.github.io/nightbound/privacy-policy.html`  
5. Add testers (e.g. `rinpan@yahoo.com`)  
6. Send for review / roll out closed track  

## Notes

- **API:** First build may use offline stories if backend is not on HTTPS yet. That is OK for install testing.  
- **versionCode:** currently `1` — bump by 1 for every new Play upload.  
- **Not** `http://localhost:8081/` — that is only Metro dev.

## If login fails

```powershell
npx eas-cli logout
npx eas-cli login
```

Or create token: https://expo.dev/settings/access-tokens → then:

```powershell
$env:EXPO_TOKEN="your_token_here"
npx eas-cli whoami
```
