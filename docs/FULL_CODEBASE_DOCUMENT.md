# ChatGPT Clone — Full Project Codebase & Structure Document

> **Project Root**: `d:\AI-learning\chatgpt-clone`  
> **Total Tracked Files**: 71  
> **Total Lines of Code**: 4,206 lines  
> **Total Codebase Size**: 132.10 KB  
> **Generated On**: 2026-10-31 23:28:47  

---

## 1. Complete Folder Structure Tree

```text
chatgpt-clone/
├── .env
├── .gitignore
├── .vscode/
│   └── settings.json
├── AGENTS.md
├── README.md
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── [...path]/
│   │           └── route.ts
│   ├── chat/
│   │   ├── [conversationId]/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── profile/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── profile-section.tsx
│   │   └── sidebar.tsx
│   ├── shared/
│   │   └── password-input.tsx
│   ├── theme-provider.tsx
│   └── ui/
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── scroll-area.tsx
│       ├── separator.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── components.json
├── eslint.config.mjs
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── data/
│   │   │   └── auth.json
│   │   ├── hooks/
│   │   │   └── use-auth.ts
│   │   ├── index.ts
│   │   └── types/
│   │       └── auth.types.ts
│   ├── chat/
│   │   ├── components/
│   │   │   ├── chat-container.tsx
│   │   │   ├── chat-input.tsx
│   │   │   ├── message-item.tsx
│   │   │   ├── message-list.tsx
│   │   │   └── typing-indicator.tsx
│   │   ├── data/
│   │   │   └── conversations.json
│   │   ├── hooks/
│   │   │   └── use-chat.ts
│   │   ├── index.ts
│   │   └── types/
│   │       └── chat.types.ts
│   ├── conversation/
│   │   ├── components/
│   │   │   ├── conversation-item.tsx
│   │   │   ├── conversation-list.tsx
│   │   │   └── new-chat-button.tsx
│   │   ├── data/
│   │   ├── hooks/
│   │   │   └── use-conversations.ts
│   │   ├── index.ts
│   │   └── types/
│   │       └── conversation.types.ts
│   ├── landing/
│   │   └── components/
│   │       └── landing-page.tsx
│   └── profile/
│       ├── components/
│       │   └── profile-completion-form.tsx
│       ├── data/
│       ├── hooks/
│       │   └── use-profile.ts
│       ├── index.ts
│       └── types/
│           └── profile.types.ts
├── frontend.md
├── lib/
│   ├── auth/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-workspace.yaml
├── proxy.ts
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json
```

## 2. Master File Index

| # | File Path | Category | Language | Lines | Size |
|---|---|---|---|---|---|
| 1 | [.env](#file-1) | Root Configuration & Docs | `dotenv` | 4 | 473 B |
| 2 | [.gitignore](#file-2) | Root Configuration & Docs | `gitignore` | 49 | 482 B |
| 3 | [AGENTS.md](#file-3) | Root Configuration & Docs | `markdown` | 9 | 679 B |
| 4 | [README.md](#file-4) | Root Configuration & Docs | `markdown` | 36 | 1486 B |
| 5 | [components.json](#file-5) | Root Configuration & Docs | `json` | 25 | 519 B |
| 6 | [eslint.config.mjs](#file-6) | Root Configuration & Docs | `javascript` | 18 | 465 B |
| 7 | [frontend.md](#file-7) | Root Configuration & Docs | `markdown` | 569 | 15352 B |
| 8 | [next-env.d.ts](#file-8) | Root Configuration & Docs | `typescript` | 7 | 296 B |
| 9 | [next.config.ts](#file-9) | Root Configuration & Docs | `typescript` | 20 | 366 B |
| 10 | [package.json](#file-10) | Root Configuration & Docs | `json` | 38 | 946 B |
| 11 | [pnpm-workspace.yaml](#file-11) | Root Configuration & Docs | `yaml` | 3 | 57 B |
| 12 | [proxy.ts](#file-12) | Root Configuration & Docs | `typescript` | 14 | 321 B |
| 13 | [tsconfig.json](#file-13) | Root Configuration & Docs | `json` | 42 | 713 B |
| 14 | [.vscode/settings.json](#file-14) | VS Code Config | `json` | 7 | 80 B |
| 15 | [app/(auth)/login/page.tsx](#file-15) | App Router & Pages | `tsx` | 9 | 239 B |
| 16 | [app/(auth)/profile/page.tsx](#file-16) | App Router & Pages | `tsx` | 10 | 274 B |
| 17 | [app/(auth)/signup/page.tsx](#file-17) | App Router & Pages | `tsx` | 9 | 242 B |
| 18 | [app/api/auth/[...path]/route.ts](#file-18) | App Router & Pages | `typescript` | 3 | 89 B |
| 19 | [app/chat/[conversationId]/page.tsx](#file-19) | App Router & Pages | `tsx` | 27 | 741 B |
| 20 | [app/chat/page.tsx](#file-20) | App Router & Pages | `tsx` | 17 | 441 B |
| 21 | [app/chat/profile/page.tsx](#file-21) | App Router & Pages | `tsx` | 5 | 183 B |
| 22 | [app/globals.css](#file-22) | App Router & Pages | `css` | 130 | 4304 B |
| 23 | [app/layout.tsx](#file-23) | App Router & Pages | `tsx` | 54 | 1190 B |
| 24 | [app/page.tsx](#file-24) | App Router & Pages | `tsx` | 5 | 139 B |
| 25 | [components/layout/profile-section.tsx](#file-25) | Components & UI | `tsx` | 91 | 2590 B |
| 26 | [components/layout/sidebar.tsx](#file-26) | Components & UI | `tsx` | 187 | 7063 B |
| 27 | [components/shared/password-input.tsx](#file-27) | Components & UI | `tsx` | 45 | 1202 B |
| 28 | [components/theme-provider.tsx](#file-28) | Components & UI | `tsx` | 12 | 325 B |
| 29 | [components/ui/avatar.tsx](#file-29) | Components & UI | `tsx` | 108 | 3028 B |
| 30 | [components/ui/button.tsx](#file-30) | Components & UI | `tsx` | 55 | 2799 B |
| 31 | [components/ui/dialog.tsx](#file-31) | Components & UI | `tsx` | 160 | 4118 B |
| 32 | [components/ui/dropdown-menu.tsx](#file-32) | Components & UI | `tsx` | 266 | 8896 B |
| 33 | [components/ui/input.tsx](#file-33) | Components & UI | `tsx` | 19 | 970 B |
| 34 | [components/ui/scroll-area.tsx](#file-34) | Components & UI | `tsx` | 54 | 1614 B |
| 35 | [components/ui/separator.tsx](#file-35) | Components & UI | `tsx` | 24 | 535 B |
| 36 | [components/ui/textarea.tsx](#file-36) | Components & UI | `tsx` | 17 | 783 B |
| 37 | [components/ui/tooltip.tsx](#file-37) | Components & UI | `tsx` | 65 | 3003 B |
| 38 | [features/auth/components/login-form.tsx](#file-38) | Feature: Auth | `tsx` | 116 | 3675 B |
| 39 | [features/auth/components/signup-form.tsx](#file-39) | Feature: Auth | `tsx` | 137 | 4398 B |
| 40 | [features/auth/data/auth.json](#file-40) | Feature: Auth | `json` | 8 | 153 B |
| 41 | [features/auth/hooks/use-auth.ts](#file-41) | Feature: Auth | `typescript` | 73 | 1638 B |
| 42 | [features/auth/index.ts](#file-42) | Feature: Auth | `typescript` | 10 | 250 B |
| 43 | [features/auth/types/auth.types.ts](#file-43) | Feature: Auth | `typescript` | 16 | 256 B |
| 44 | [features/chat/components/chat-container.tsx](#file-44) | Feature: Chat | `tsx` | 236 | 8685 B |
| 45 | [features/chat/components/chat-input.tsx](#file-45) | Feature: Chat | `tsx` | 84 | 2874 B |
| 46 | [features/chat/components/message-item.tsx](#file-46) | Feature: Chat | `tsx` | 56 | 1890 B |
| 47 | [features/chat/components/message-list.tsx](#file-47) | Feature: Chat | `tsx` | 37 | 915 B |
| 48 | [features/chat/components/typing-indicator.tsx](#file-48) | Feature: Chat | `tsx` | 21 | 831 B |
| 49 | [features/chat/data/conversations.json](#file-49) | Feature: Chat | `json` | 17 | 393 B |
| 50 | [features/chat/hooks/use-chat.ts](#file-50) | Feature: Chat | `typescript` | 129 | 3599 B |
| 51 | [features/chat/index.ts](#file-51) | Feature: Chat | `typescript` | 13 | 445 B |
| 52 | [features/chat/types/chat.types.ts](#file-52) | Feature: Chat | `typescript` | 14 | 270 B |
| 53 | [features/conversation/components/conversation-item.tsx](#file-53) | Feature: Conversation | `tsx` | 158 | 5324 B |
| 54 | [features/conversation/components/conversation-list.tsx](#file-54) | Feature: Conversation | `tsx` | 54 | 1943 B |
| 55 | [features/conversation/components/new-chat-button.tsx](#file-55) | Feature: Conversation | `tsx` | 22 | 485 B |
| 56 | [features/conversation/hooks/use-conversations.ts](#file-56) | Feature: Conversation | `typescript` | 165 | 4607 B |
| 57 | [features/conversation/index.ts](#file-57) | Feature: Conversation | `typescript` | 0 | 0 B |
| 58 | [features/conversation/types/conversation.types.ts](#file-58) | Feature: Conversation | `typescript` | 9 | 239 B |
| 59 | [features/landing/components/landing-page.tsx](#file-59) | Feature: Landing | `tsx` | 92 | 3997 B |
| 60 | [features/profile/components/profile-completion-form.tsx](#file-60) | Feature: Profile | `tsx` | 399 | 14465 B |
| 61 | [features/profile/hooks/use-profile.ts](#file-61) | Feature: Profile | `typescript` | 91 | 2915 B |
| 62 | [features/profile/index.ts](#file-62) | Feature: Profile | `typescript` | 0 | 0 B |
| 63 | [features/profile/types/profile.types.ts](#file-63) | Feature: Profile | `typescript` | 16 | 294 B |
| 64 | [lib/auth/client.ts](#file-64) | Libraries & Utilities | `typescript` | 5 | 125 B |
| 65 | [lib/auth/server.ts](#file-65) | Libraries & Utilities | `typescript` | 9 | 265 B |
| 66 | [lib/utils.ts](#file-66) | Libraries & Utilities | `typescript` | 1 | 24 B |
| 67 | [public/file.svg](#file-67) | Public Assets | `xml` | 1 | 391 B |
| 68 | [public/globe.svg](#file-68) | Public Assets | `xml` | 1 | 1035 B |
| 69 | [public/next.svg](#file-69) | Public Assets | `xml` | 1 | 1375 B |
| 70 | [public/vercel.svg](#file-70) | Public Assets | `xml` | 1 | 128 B |
| 71 | [public/window.svg](#file-71) | Public Assets | `xml` | 1 | 385 B |

---

## 3. Complete Source Code by File

> **Note**: Every file below contains its 100% complete and unabridged code with exact relative and absolute paths.


### === ROOT CONFIGURATION & DOCS ===

<a id="file-1"></a>
#### File #1: `.env`

- **File Name**: `.env`
- **Relative Path**: `.env`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\.env`
- **Category**: Root Configuration & Docs
- **Language**: `dotenv` | **Lines**: 4 | **Size**: 473 bytes

````dotenv
DATABASE_URL="postgresql://neondb_owner:npg_afTuHwLW9dB6@ep-orange-moon-azvvhn70-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
NEON_AUTH_BASE_URL="https://ep-orange-moon-azvvhn70.neonauth.c-3.ap-southeast-1.aws.neon.tech/neondb/auth"
NEXT_JWKS_URL="https://ep-orange-moon-azvvhn70.neonauth.c-3.ap-southeast-1.aws.neon.tech/neondb/auth/.well-known/jwks.json"
NEON_AUTH_COOKIE_SECRET="8A1hkQI9st1cNH9+M+F9HCHYm6QdS4vOtqQfDP6HlJk="

````

---

<a id="file-2"></a>
#### File #2: `.gitignore`

- **File Name**: `.gitignore`
- **Relative Path**: `.gitignore`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\.gitignore`
- **Category**: Root Configuration & Docs
- **Language**: `gitignore` | **Lines**: 49 | **Size**: 482 bytes

````gitignore

# Dependencies
/node_modules
/.pnp
.pnp.*
/.pnpm-store

# Next.js
/.next/
/out/
/build/

# Production build
/dist

# Environment variables and secrets
.env
.env.*
!.env.example

# Deployment
.vercel

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Logs
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
*.log

# Operating system
.DS_Store
Thumbs.db
Desktop.ini

# Editor settings
.vscode/*
!.vscode/extensions.json
.idea/

# Testing and coverage
/coverage

# Temporary files
*.tmp
*.temp

````

---

<a id="file-3"></a>
#### File #3: `AGENTS.md`

- **File Name**: `AGENTS.md`
- **Relative Path**: `AGENTS.md`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\AGENTS.md`
- **Category**: Root Configuration & Docs
- **Language**: `markdown` | **Lines**: 9 | **Size**: 679 bytes

````markdown
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

````

---

<a id="file-4"></a>
#### File #4: `README.md`

- **File Name**: `README.md`
- **Relative Path**: `README.md`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\README.md`
- **Category**: Root Configuration & Docs
- **Language**: `markdown` | **Lines**: 36 | **Size**: 1486 bytes

````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

````

---

<a id="file-5"></a>
#### File #5: `components.json`

- **File Name**: `components.json`
- **Relative Path**: `components.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components.json`
- **Category**: Root Configuration & Docs
- **Language**: `json` | **Lines**: 25 | **Size**: 519 bytes

````json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-maia",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "hugeicons",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}

````

---

<a id="file-6"></a>
#### File #6: `eslint.config.mjs`

- **File Name**: `eslint.config.mjs`
- **Relative Path**: `eslint.config.mjs`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\eslint.config.mjs`
- **Category**: Root Configuration & Docs
- **Language**: `javascript` | **Lines**: 18 | **Size**: 465 bytes

````javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

````

---

<a id="file-7"></a>
#### File #7: `frontend.md`

- **File Name**: `frontend.md`
- **Relative Path**: `frontend.md`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\frontend.md`
- **Category**: Root Configuration & Docs
- **Language**: `markdown` | **Lines**: 569 | **Size**: 15352 bytes

````markdown
# AI Practicals — ChatGPT Clone Build Notes

This document summarizes the implementation discussed so far. Use it as a practical reference while continuing development.

> **Note:** These are the code patterns and decisions discussed in the conversation. Existing project files may contain additional code. Preserve the working UI and existing behavior when applying changes.

## 1. Project Overview

The project is a ChatGPT-style application using:

- Next.js App Router (Next.js 16.4)
- React and TypeScript
- Tailwind CSS
- shadcn-style UI components using Base UI
- `pnpm`
- `localStorage` for demo conversation/profile persistence
- `next-themes` for light/dark theme switching

## 2. Relevant Project Structure

```text
app/
  (auth)/
    login/page.tsx
    signup/page.tsx
    profile/page.tsx
  chat/
    page.tsx
    [conversationId]/page.tsx
  layout.tsx
  globals.css

components/
  layout/sidebar.tsx
  theme-provider.tsx
  ui/
    button.tsx
    input.tsx
    dropdown-menu.tsx
    dialog.tsx
    ...

features/
  auth/hooks/use-auth.ts
  chat/
    components/
      chat-container.tsx
      chat-input.tsx
      message-list.tsx
      message-item.tsx
      typing-indicator.tsx
    hooks/use-chat.ts
    types/chat.types.ts
  conversation/
    components/
      conversation-list.tsx
      conversation-item.tsx
      new-chat-button.tsx
    hooks/use-conversations.ts
    types/conversation.types.ts
  profile/
    components/profile-completion-form.tsx
    hooks/use-profile.ts
    types/profile.types.ts
```

`features/` is at the project root alongside `app/` and `components/`. The `@/*` alias maps to the project root.

## 3. Dynamic Conversation Route and Suspense

### Problem

Next.js 16.4 reported a Blocking Route error when `params` was awaited before a Suspense boundary could handle it.

### Working route

File: `app/chat/[conversationId]/page.tsx`

```tsx
import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

type Props = {
  params: Promise<{ conversationId: string }>;
};

async function ConversationContent({ params }: Props) {
  const { conversationId } = await params;

  return <ChatContainer conversationId={conversationId} />;
}

export default function ConversationPage({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading conversation...</div>}>
      <ConversationContent params={params} />
    </Suspense>
  );
}
```

`ConversationContent` awaits the route params inside the Suspense boundary, then passes the ID to the existing `ChatContainer`.

The general `/chat` page also wraps `ChatContainer` in Suspense because the component uses `useSearchParams()`:

```tsx
import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatContainer />
    </Suspense>
  );
}
```

## 4. ChatContainer Responsibilities

File: `features/chat/components/chat-container.tsx`

The component coordinates:

- Desktop and mobile sidebar
- Shared header
- Conversation title in the header
- Chat messages and input
- Profile view selected with `?view=profile`
- Conversation creation, selection, deletion, renaming, and activity updates
- Theme toggle in the header

Relevant logic:

```tsx
const isProfileView = searchParams.get("view") === "profile";

const chatId =
  conversationId ?? activeConversationId ?? "new-chat";

const activeConversation = conversations.find(
  (conversation) => conversation.id === chatId
);

const conversationTitle = activeConversation?.title ?? "New chat";
```

This finds the active conversation and displays its title instead of always showing “AI Assistant”.

The `sidebarProps` object should include the rename callback:

```tsx
const sidebarProps = {
  conversations,
  activeConversationId: conversationId ?? activeConversationId,
  onNewChat: handleNewChat,
  onSelectConversation: handleSelectConversation,
  onDeleteConversation: handleDeleteConversation,
  onRenameConversation: updateConversationTitle,
};
```

The existing `useConversations` hook is expected to provide `updateConversationTitle`.

## 5. Rename Conversation Feature

### Expected behavior

Each sidebar conversation has a three-dot menu with:

- Rename
- Delete conversation

Clicking Rename opens a centered dialog. Its input is prefilled with the current title and it has Save and Cancel buttons.

### `ConversationItem` props

File: `features/conversation/components/conversation-item.tsx`

```tsx
interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}
```

### Rename dialog state and save logic

```tsx
const [renameOpen, setRenameOpen] = useState(false);
const [title, setTitle] = useState(conversation.title);

function openRenameDialog() {
  setTitle(conversation.title);
  setRenameOpen(true);
}

function handleSave(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const newTitle = title.trim();
  if (!newTitle) return;

  if (newTitle !== conversation.title) {
    onRename(newTitle);
  }

  setRenameOpen(false);
}
```

Render the `Dialog` as a sibling of the conversation row/dropdown—not nested inside the dropdown:

```tsx
<Dialog open={renameOpen} onOpenChange={setRenameOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Rename conversation</DialogTitle>
      <DialogDescription>
        Enter a new title for this conversation.
      </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSave}>
      <Input
        autoFocus
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        aria-label="Conversation title"
        maxLength={100}
      />

      <DialogFooter className="mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setTitle(conversation.title);
            setRenameOpen(false);
          }}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={!title.trim()}>
          Save
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

This uses the existing UI components.

### Callback wiring

The rename callback passes through four components:

1. `ConversationItem` calls `onRename(newTitle)`.
2. `ConversationList` adds the conversation ID: `onRename(conversation.id, newTitle)`.
3. `Sidebar` passes `onRenameConversation` to `ConversationList`.
4. `ChatContainer` supplies `updateConversationTitle` as `onRenameConversation`.

In `conversation-list.tsx`, add this to its props:

```tsx
onRename: (id: string, newTitle: string) => void;
```

Pass it to each item:

```tsx
<ConversationItem
  key={conversation.id}
  conversation={conversation}
  isActive={activeConversationId === conversation.id}
  onSelect={() => onSelect(conversation.id)}
  onDelete={() => onDelete(conversation.id)}
  onRename={(newTitle) => onRename(conversation.id, newTitle)}
/>
```

In `sidebar.tsx`, include `onRenameConversation` in `SidebarProps` and the component's destructured props, then pass it down:

```tsx
<ConversationList
  conversations={conversations}
  activeConversationId={activeConversationId}
  onSelect={onSelectConversation}
  onDelete={onDeleteConversation}
  onRename={onRenameConversation}
/>
```

### Why the dialog is centered

The existing `components/ui/dialog.tsx` uses Base UI:

```tsx
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
```

Its `DialogContent` uses a portal and fixed positioning, including:

```text
fixed top-1/2 left-1/2
-translate-x-1/2 -translate-y-1/2
```

Keep the dialog as a sibling of the conversation row/dropdown. The existing dialog component already supplies the portal, overlay, and centered positioning.

## 6. Light/Dark Theme

### Install package

```bash
pnpm add next-themes
```

### Provider component

File: `components/theme-provider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Root layout

Keep the existing fonts and metadata in `app/layout.tsx`, and import:

```tsx
import { ThemeProvider } from "@/components/theme-provider";
```

The root layout should wrap the application children in the provider and use `suppressHydrationWarning` on `<html>`:

```tsx
export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

`attribute="class"` makes `next-themes` apply the `dark` class to the HTML element. The global CSS must define appropriate light and dark variables for all UI colors to switch.

### Theme toggle in the ChatContainer header

The requested location is the **far right of the ChatContainer header**, not the sidebar.

Imports can be combined:

```tsx
import { Menu, Sparkles, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
```

Call hooks inside the component, never at module level:

```tsx
const { theme, setTheme } = useTheme();
```

An invalid-hook-call error occurred when `useTheme()` was placed outside `ChatContainer`. Moving it into the component body fixed that issue.

### Prevent theme hydration mismatch

A hydration mismatch occurred because the server rendered a Moon icon while the browser rendered a Sun icon according to the saved theme.

Import `useEffect` and `useState`:

```tsx
import { useEffect, useState } from "react";
```

Inside `ChatContainer`:

```tsx
const { theme, setTheme } = useTheme();
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
```

Use a placeholder until the component mounts:

```tsx
<Button
  type="button"
  variant="ghost"
  size="icon"
  aria-label="Toggle theme"
  onClick={() =>
    setTheme(theme === "dark" ? "light" : "dark")
  }
>
  {mounted ? (
    theme === "dark" ? (
      <Sun className="size-5" />
    ) : (
      <Moon className="size-5" />
    )
  ) : (
    <span className="size-5" />
  )}
</Button>
```

This avoids rendering different theme icons on the server and the first browser render.

### Header positioning

The conversation title should stay left and the theme button should be at the far right:

```tsx
<header className="flex h-14 w-full shrink-0 items-center border-b px-4">
  <div className="flex min-w-0 flex-1 items-center gap-2">
    {/* Existing mobile menu button */}
    <span className="truncate font-medium">
      {isProfileView ? "Your Profile" : conversationTitle}
    </span>
  </div>

  <div className="ml-auto flex shrink-0 items-center justify-end">
    {/* Theme toggle button */}
  </div>
</header>
```

If it still doesn't align at the far right, verify the correct header was updated and that the parent section has `flex-1 min-w-0`.

## 7. Existing Chat and Profile Behavior

The profile view is selected through the query string:

```tsx
const isProfileView = searchParams.get("view") === "profile";
```

The sidebar profile link uses:

```text
/chat?view=profile
```

The shared header displays `"Your Profile"` in profile view, otherwise the current conversation title.

The chat input is disabled until messages are loaded and while the assistant is responding:

```tsx
<ChatInput
  onSend={handleSendMessage}
  disabled={!messagesLoaded || isLoading}
/>
```

When sending the first message, the app calls `updateConversationTitle(targetId, content)` if the conversation has no messages. The current implementation may later benefit from title truncation/formatting, but that wasn't changed in this conversation.

## 8. Troubleshooting Notes

### Dynamic route returns 404

Check that the path is exactly:

```text
app/chat/[conversationId]/page.tsx
```

The square brackets are part of the folder name. Restart the dev server after correcting route structure:

```bash
pnpm dev
```

### Blocking Route error for `params`

Place the component awaiting `params` beneath a Suspense boundary, as shown in Section 3.

### Invalid hook call

Hooks like `useTheme`, `useState`, `useEffect`, `useRouter`, and `useSearchParams` must be called inside a function component or custom hook, not at module scope.

### Theme hydration mismatch

Use a mounted state to defer rendering the theme-dependent icon. Keep `suppressHydrationWarning` on `<html>` as shown above.

### Dialog doesn't open or isn't centered

The Base UI dialog already uses a portal and fixed centering. Keep `Dialog` as a sibling of the conversation row/dropdown and make sure the Rename action sets `renameOpen` to `true`.

### TypeScript errors for rename callbacks

Check the callback is consistently defined and passed through:

- `ConversationItem`
- `ConversationList`
- `Sidebar`
- `ChatContainer`

## 9. Feature Checklist

- [x] Dynamic conversation route with async params and Suspense
- [x] Conversation title in the header
- [x] Sidebar three-dot menu
- [x] Rename and Delete actions
- [x] Rename dialog with the previous title prefilled
- [x] Save and Cancel buttons
- [x] Rename callback wired through the component hierarchy
- [x] `next-themes` provider setup
- [x] Theme toggle in the ChatContainer header
- [x] Theme hook moved inside the React component
- [x] Hydration mismatch fix for theme-dependent icons

Still worth testing in the running app:

- [ ] Renamed titles persist after refresh and update the header immediately
- [ ] Theme changes colors across the whole UI, not just the icon
- [ ] Theme choice persists after refresh
- [ ] Theme toggle is aligned at the far right on desktop and mobile
- [ ] `app/globals.css` includes the light/dark variables needed for all components

## 10. Recommended Next Steps

1. Test rename persistence, including refreshing the page.
2. Verify `app/globals.css` defines light and dark theme variables.
3. Confirm the theme choice persists after a reload.
4. Test the header layout on desktop and mobile widths.
5. Continue implementing remaining chat features one at a time, keeping the existing UI intact and explaining each change.

````

---

<a id="file-8"></a>
#### File #8: `next-env.d.ts`

- **File Name**: `next-env.d.ts`
- **Relative Path**: `next-env.d.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\next-env.d.ts`
- **Category**: Root Configuration & Docs
- **Language**: `typescript` | **Lines**: 7 | **Size**: 296 bytes

````typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";
import "./.next/dev/types/root-params.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

````

---

<a id="file-9"></a>
#### File #9: `next.config.ts`

- **File Name**: `next.config.ts`
- **Relative Path**: `next.config.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\next.config.ts`
- **Category**: Root Configuration & Docs
- **Language**: `typescript` | **Lines**: 20 | **Size**: 366 bytes

````typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

````

---

<a id="file-10"></a>
#### File #10: `package.json`

- **File Name**: `package.json`
- **Relative Path**: `package.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\package.json`
- **Category**: Root Configuration & Docs
- **Language**: `json` | **Lines**: 38 | **Size**: 946 bytes

````json
{
  "name": "chatgpt-clone",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "@hugeicons/core-free-icons": "^4.3.5",
    "@hugeicons/react": "^1.1.10",
    "@neondatabase/auth": "0.7.0-beta",
    "@neondatabase/auth-ui": "0.4.0-beta",
    "class-variance-authority": "^0.7.1",
    "cn": "^0.4.0",
    "lucide-react": "^1.53.0",
    "next": "16.4.3",
    "next-themes": "^0.4.6",
    "react": "19.3.0",
    "react-dom": "19.3.0",
    "shadcn": "^4.21.4",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "packageManager": "pnpm@10.33.3"
}

````

---

<a id="file-11"></a>
#### File #11: `pnpm-workspace.yaml`

- **File Name**: `pnpm-workspace.yaml`
- **Relative Path**: `pnpm-workspace.yaml`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\pnpm-workspace.yaml`
- **Category**: Root Configuration & Docs
- **Language**: `yaml` | **Lines**: 3 | **Size**: 57 bytes

````yaml
ignoredBuiltDependencies:
  - sharp
  - unrs-resolver

````

---

<a id="file-12"></a>
#### File #12: `proxy.ts`

- **File Name**: `proxy.ts`
- **Relative Path**: `proxy.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\proxy.ts`
- **Category**: Root Configuration & Docs
- **Language**: `typescript` | **Lines**: 14 | **Size**: 321 bytes

````typescript
import { auth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

const authMiddleware = auth.middleware({
  loginUrl: "/login",
});

export default function proxy(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: ["/profile/:path*"],
};

````

---

<a id="file-13"></a>
#### File #13: `tsconfig.json`

- **File Name**: `tsconfig.json`
- **Relative Path**: `tsconfig.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\tsconfig.json`
- **Category**: Root Configuration & Docs
- **Language**: `json` | **Lines**: 42 | **Size**: 713 bytes

````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": [
    "node_modules"
  ]
}

````

---


### === VS CODE CONFIG ===

<a id="file-14"></a>
#### File #14: `.vscode/settings.json`

- **File Name**: `settings.json`
- **Relative Path**: `.vscode/settings.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\.vscode\settings.json`
- **Category**: VS Code Config
- **Language**: `json` | **Lines**: 7 | **Size**: 80 bytes

````json
{
  "cSpell.words": [
    "hugeicons",
    "neondatabase",
    "turbopack"
  ]
}

````

---


### === APP ROUTER & PAGES ===

<a id="file-15"></a>
#### File #15: `app/(auth)/login/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/(auth)/login/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\(auth)\login\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 9 | **Size**: 239 bytes

````tsx
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <LoginForm />
        </main>
    );
}

````

---

<a id="file-16"></a>
#### File #16: `app/(auth)/profile/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/(auth)/profile/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\(auth)\profile\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 10 | **Size**: 274 bytes

````tsx

import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";

export default function ProfilePage() {
    return (
        <main className="min-h-dvh bg-background">
            <ProfileCompletionForm />
        </main>
    );
}

````

---

<a id="file-17"></a>
#### File #17: `app/(auth)/signup/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/(auth)/signup/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\(auth)\signup\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 9 | **Size**: 242 bytes

````tsx
import { SignupForm } from "@/features/auth";

export default function SignupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-12">
            <SignupForm />
        </main>
    );
}

````

---

<a id="file-18"></a>
#### File #18: `app/api/auth/[...path]/route.ts`

- **File Name**: `route.ts`
- **Relative Path**: `app/api/auth/[...path]/route.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\api\auth\[...path]\route.ts`
- **Category**: App Router & Pages
- **Language**: `typescript` | **Lines**: 3 | **Size**: 89 bytes

````typescript
import { auth } from "@/lib/auth/server";

export const { GET, POST } = auth.handler();

````

---

<a id="file-19"></a>
#### File #19: `app/chat/[conversationId]/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/chat/[conversationId]/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\chat\[conversationId]\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 27 | **Size**: 741 bytes

````tsx

import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

type Props = {
    params: Promise<{ conversationId: string }>;
};

async function ConversationContent({ params }: Props) {
    const { conversationId } = await params;

    return <ChatContainer conversationId={conversationId} />;
}

export default function ConversationPage({ params }: Props) {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading conversation...
                </div>
            }
        >
            <ConversationContent params={params} />
        </Suspense>
    );
}

````

---

<a id="file-20"></a>
#### File #20: `app/chat/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/chat/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\chat\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 17 | **Size**: 441 bytes

````tsx

import { Suspense } from "react";
import { ChatContainer } from "@/features/chat/components/chat-container";

export default function ChatPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center">
                    Loading chat...
                </div>
            }
        >
            <ChatContainer />
        </Suspense>
    );
}

````

---

<a id="file-21"></a>
#### File #21: `app/chat/profile/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/chat/profile/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\chat\profile\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 5 | **Size**: 183 bytes

````tsx
import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";

export default function ChatProfilePage() {
    return <ProfileCompletionForm />;
}

````

---

<a id="file-22"></a>
#### File #22: `app/globals.css`

- **File Name**: `globals.css`
- **Relative Path**: `app/globals.css`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\globals.css`
- **Category**: App Router & Pages
- **Language**: `css` | **Lines**: 130 | **Size**: 4304 bytes

````css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.87 0 0);
  --chart-2: oklch(0.556 0 0);
  --chart-3: oklch(0.439 0 0);
  --chart-4: oklch(0.371 0 0);
  --chart-5: oklch(0.269 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

````

---

<a id="file-23"></a>
#### File #23: `app/layout.tsx`

- **File Name**: `layout.tsx`
- **Relative Path**: `app/layout.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\layout.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 54 | **Size**: 1190 bytes

````tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}


````

---

<a id="file-24"></a>
#### File #24: `app/page.tsx`

- **File Name**: `page.tsx`
- **Relative Path**: `app/page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\app\page.tsx`
- **Category**: App Router & Pages
- **Language**: `tsx` | **Lines**: 5 | **Size**: 139 bytes

````tsx
import { LandingPage } from "@/features/landing/components/landing-page";

export default function HomePage() {
  return <LandingPage />;
}

````

---


### === COMPONENTS & UI ===

<a id="file-25"></a>
#### File #25: `components/layout/profile-section.tsx`

- **File Name**: `profile-section.tsx`
- **Relative Path**: `components/layout/profile-section.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\layout\profile-section.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 91 | **Size**: 2590 bytes

````tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRound, LogOut, ChevronUp } from "lucide-react";

import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarProfile() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  }

  const displayName = user?.name || user?.email || "My account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          disabled={isLoading || loggingOut}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent disabled:opacity-60"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground">
              Account
            </p>
          </div>

          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="start"
        className="mb-2 w-56"
      >
        <DropdownMenuItem
          onSelect={() => router.push("/profile")}
          className="cursor-pointer gap-2"
        >
          <UserRound className="size-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={handleLogout}
          disabled={loggingOut}
          className="cursor-pointer gap-2 text-destructive focus:text-destructive"
        >
          <LogOut className="size-4" />
          {loggingOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

````

---

<a id="file-26"></a>
#### File #26: `components/layout/sidebar.tsx`

- **File Name**: `sidebar.tsx`
- **Relative Path**: `components/layout/sidebar.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\layout\sidebar.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 187 | **Size**: 7063 bytes

````tsx

"use client";

import Link from "next/link";
import {
    Bot,
    PanelLeftClose,
    PanelLeftOpen,
    MessageSquarePlus,
    MessageSquare
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NewChatButton } from "@/features/conversation/components/new-chat-button";
import { ConversationList } from "@/features/conversation/components/conversation-list";
import type { Conversation } from "@/features/conversation/types/conversation.types";
import { useProfile } from "@/features/profile/hooks/use-profile";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { SidebarProfile } from "@/components/layout/profile-section"

interface SidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    onRenameConversation: (id: string, newTitle: string) => void;
    onClose?: () => void;
    collapsed: boolean;
    onToggle: () => void;
}

export function Sidebar({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    onDeleteConversation,
    onRenameConversation,
    onClose,
    collapsed,
    onToggle,
}: SidebarProps) {
    const { profile, isLoaded: profileLoaded } = useProfile();
    const { user } = useAuth();

    const displayName =
        profile.fullName.trim() || user?.name || "My Profile";

    const email = user?.email || "View your profile";

    const initials =
        displayName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "U";

    return (
        <aside
            className={`flex h-full shrink-0 flex-col overflow-hidden border-r bg-muted/40 p-3 transition-[width] duration-200 ease-in-out ${collapsed ? "w-[68px]" : "w-72"
                }`}
        >
            {/* Sidebar header */}
            <div
                className={`flex h-11 shrink-0 items-center ${collapsed ? "justify-center" : "justify-between px-1"
                    }`}
            >
                {collapsed ? (
                    <div className="group relative flex size-10 items-center justify-center">
                        <Bot className="size-5 transition-opacity group-hover:opacity-0" />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggle}
                            aria-label="Expand sidebar"
                            title="Expand sidebar"
                            className="absolute inset-0 size-10 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                        >
                            <PanelLeftOpen className="size-5" />
                        </Button>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/chat"
                            className="flex min-w-0 items-center gap-2 font-semibold"
                        >
                            <Bot className="size-5 shrink-0" />
                            <span className="truncate">AI Chat</span>
                        </Link>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onToggle}
                            aria-label="Collapse sidebar"
                            title="Collapse sidebar"
                            className="size-8 shrink-0"
                        >
                            <PanelLeftClose className="size-4" />
                        </Button>
                    </>
                )}
            </div>

            {/* New chat */}
            <div
                className={`mt-4 shrink-0 ${collapsed ? "flex justify-center" : ""
                    }`}
            >
                {collapsed ? (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onNewChat}
                        aria-label="New chat"
                        title="New chat"
                    >
                        <MessageSquarePlus className="size-5" />
                    </Button>
                ) : (
                    <NewChatButton onClick={onNewChat} />
                )}
            </div>

            {/* Conversation list */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
                {collapsed ? (
                    <div className="flex flex-col items-center gap-2">
                        {conversations.map((conversation) => {
                            const isActive =
                                conversation.id === activeConversationId;

                            return (
                                <Button
                                    key={conversation.id}
                                    variant={isActive ? "secondary" : "ghost"}
                                    size="icon"
                                    title={conversation.title}
                                    aria-label={conversation.title}
                                    onClick={() =>
                                        onSelectConversation(conversation.id)
                                    }
                                >
                                    <MessageSquare className="size-4" />
                                </Button>
                            );
                        })}
                    </div>
                ) : (
                    <ConversationList
                        conversations={conversations}
                        activeConversationId={activeConversationId}
                        onSelect={onSelectConversation}
                        onDelete={onDeleteConversation}
                        onRename={onRenameConversation}
                    />
                )}
            </div>

            <Separator className="my-3 shrink-0" />

            {/* Profile area */}
            <div className="mt-auto border-t p-3">
                <SidebarProfile />
            </div>


            {/* Mobile close button */}
            {onClose && (
                <div className="mt-2 shrink-0 md:hidden">
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={onClose}
                    >
                        <PanelLeftClose className="mr-2 size-4" />
                        Close sidebar
                    </Button>
                </div>
            )}
        </aside>
    );
}

````

---

<a id="file-27"></a>
#### File #27: `components/shared/password-input.tsx`

- **File Name**: `password-input.tsx`
- **Relative Path**: `components/shared/password-input.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\shared\password-input.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 45 | **Size**: 1202 bytes

````tsx
"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons";

import { Input } from "@/components/ui/input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type"
>;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`pr-11 ${props.className ?? ""}`}
      />

      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute right-3 top-1/2 -translate-y-1/2
          rounded-sm text-muted-foreground hover:text-foreground
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring"
      >
        <HugeiconsIcon
          icon={visible ? ViewOffIcon : ViewIcon}
          size={20}
        />
      </button>
    </div>
  );
}

````

---

<a id="file-28"></a>
#### File #28: `components/theme-provider.tsx`

- **File Name**: `theme-provider.tsx`
- **Relative Path**: `components/theme-provider.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\theme-provider.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 12 | **Size**: 325 bytes

````tsx

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
    children,
    ...props
}: ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

````

---

<a id="file-29"></a>
#### File #29: `components/ui/avatar.tsx`

- **File Name**: `avatar.tsx`
- **Relative Path**: `components/ui/avatar.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\avatar.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 108 | **Size**: 3028 bytes

````tsx
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { cn } from "cn"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}

````

---

<a id="file-30"></a>
#### File #30: `components/ui/button.tsx`

- **File Name**: `button.tsx`
- **Relative Path**: `components/ui/button.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\button.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 55 | **Size**: 2799 bytes

````tsx
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

````

---

<a id="file-31"></a>
#### File #31: `components/ui/dialog.tsx`

- **File Name**: `dialog.tsx`
- **Relative Path**: `components/ui/dialog.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\dialog.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 160 | **Size**: 4118 bytes

````tsx
"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-sm text-popover-foreground ring-1 ring-foreground/5 duration-100 outline-none sm:max-w-md data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4"
                size="icon-sm"
              />
            }
          >
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-base leading-none font-medium",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

````

---

<a id="file-32"></a>
#### File #32: `components/ui/dropdown-menu.tsx`

- **File Name**: `dropdown-menu.tsx`
- **Relative Path**: `components/ui/dropdown-menu.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\dropdown-menu.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 266 | **Size**: 8896 bytes

````tsx
"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { cn } from "cn"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-48 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-3 py-2.5 text-xs text-muted-foreground data-inset:pl-9.5",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-36 rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl ring-1 ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

````

---

<a id="file-33"></a>
#### File #33: `components/ui/input.tsx`

- **File Name**: `input.tsx`
- **Relative Path**: `components/ui/input.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\input.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 19 | **Size**: 970 bytes

````tsx
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

````

---

<a id="file-34"></a>
#### File #34: `components/ui/scroll-area.tsx`

- **File Name**: `scroll-area.tsx`
- **Relative Path**: `components/ui/scroll-area.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\scroll-area.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 54 | **Size**: 1614 bytes

````tsx
"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"
import { cn } from "cn"

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }

````

---

<a id="file-35"></a>
#### File #35: `components/ui/separator.tsx`

- **File Name**: `separator.tsx`
- **Relative Path**: `components/ui/separator.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\separator.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 24 | **Size**: 535 bytes

````tsx
"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

````

---

<a id="file-36"></a>
#### File #36: `components/ui/textarea.tsx`

- **File Name**: `textarea.tsx`
- **Relative Path**: `components/ui/textarea.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\textarea.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 17 | **Size**: 783 bytes

````tsx
import * as React from "react"
import { cn } from "cn"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full resize-none rounded-xl border border-input bg-input/30 px-3 py-3 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

````

---

<a id="file-37"></a>
#### File #37: `components/ui/tooltip.tsx`

- **File Name**: `tooltip.tsx`
- **Relative Path**: `components/ui/tooltip.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\components\ui\tooltip.tsx`
- **Category**: Components & UI
- **Language**: `tsx` | **Lines**: 65 | **Size**: 3003 bytes

````tsx
"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-2xl bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-4xl data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:translate-x-[1.5px] data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:translate-x-[-1.5px] data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:translate-x-[-1.5px] data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:translate-x-[1.5px] data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

````

---


### === FEATURE: AUTH ===

<a id="file-38"></a>
#### File #38: `features/auth/components/login-form.tsx`

- **File Name**: `login-form.tsx`
- **Relative Path**: `features/auth/components/login-form.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\components\login-form.tsx`
- **Category**: Feature: Auth
- **Language**: `tsx` | **Lines**: 116 | **Size**: 3675 bytes

````tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";
import { PasswordInput } from "@/components/shared/password-input";

export function LoginForm() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        const result = await login({
            email,
            password,
        });

        if (!result.success) {
            setError(result.error ?? "Something went wrong.");
            return;
        }

        router.push("/profile");
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Welcome back
                </h1>

                <p className="text-muted-foreground">
                    Log in to continue to your AI assistant.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium"
                    >
                        Email
                    </label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium"
                    >
                        Password
                    </label>

                    <PasswordInput
                        name="password"
                        placeholder="Enter Your password"
                        autoComplete="current-password"
                        onChange={(event)=> setPassword(event.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    variant="default"
                    className="w-full bg-white text-black hover:cursor-pointer hover:bg-white/80"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-foreground underline underline-offset-4"
                >
                    Create an account
                </Link>
            </p>
        </div>
    );
}

````

---

<a id="file-39"></a>
#### File #39: `features/auth/components/signup-form.tsx`

- **File Name**: `signup-form.tsx`
- **Relative Path**: `features/auth/components/signup-form.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\components\signup-form.tsx`
- **Category**: Feature: Auth
- **Language**: `tsx` | **Lines**: 137 | **Size**: 4398 bytes

````tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/use-auth";
import { PasswordInput } from "@/components/shared/password-input";

export function SignupForm() {
    const router = useRouter();
    const { signup, isLoading } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        setError("");

        const result = await signup({
            name,
            email,
            password,
        });

        if (!result.success) {
            setError(result.error ?? "Something went wrong.");
            return;
        }

        router.push("/profile");
    };

    return (
        <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold tracking-tight">
                    Create an account
                </h1>

                <p className="text-muted-foreground">
                    Start chatting with your AI assistant.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="name"
                        className="text-sm font-medium"
                    >
                        Name
                    </label>

                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your user name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium"
                    >
                        Email
                    </label>

                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email id"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium"
                    >
                        Password
                    </label>

                    <PasswordInput
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    className="w-full bg-white text-black hover:cursor-pointer hover:bg-white/80"
                    disabled={isLoading}
                >
                    {isLoading ? "Creating account..." : "Create account"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-foreground underline underline-offset-4"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}

````

---

<a id="file-40"></a>
#### File #40: `features/auth/data/auth.json`

- **File Name**: `auth.json`
- **Relative Path**: `features/auth/data/auth.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\data\auth.json`
- **Category**: Feature: Auth
- **Language**: `json` | **Lines**: 8 | **Size**: 153 bytes

````json
{
    "demoUser": {
        "id": "user-001",
        "name": "naveen",
        "email": "naveen@gmail.com",
        "password": "navi123"
    }
}

````

---

<a id="file-41"></a>
#### File #41: `features/auth/hooks/use-auth.ts`

- **File Name**: `use-auth.ts`
- **Relative Path**: `features/auth/hooks/use-auth.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\hooks\use-auth.ts`
- **Category**: Feature: Auth
- **Language**: `typescript` | **Lines**: 73 | **Size**: 1638 bytes

````typescript
"use client";

import { authClient } from "@/lib/auth/client";
import type { AuthUser, LoginData, SignupData } from "../types/auth.types";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  const user: AuthUser | null = session?.user
    ? {
        id: session.user.id,
        name: session.user.name ?? "",
        email: session.user.email,
      }
    : null;

  async function login(input: LoginData) {
    try {
      const { error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch {
      return {
        success: false,
        error: "Unable to sign in. Please try again.",
      };
    }
  }

  async function signup(input: SignupData) {
    try {
      const { error } = await authClient.signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch {
      return {
        success: false,
        error: "Unable to create your account. Please try again.",
      };
    }
  }

  async function logout() {
    const { error } = await authClient.signOut();

    if (error) {
      throw new Error(error.message);
    }
  }

  return {
    user,
    isLoading: isPending,
    login,
    signup,
    logout,
  };
}

````

---

<a id="file-42"></a>
#### File #42: `features/auth/index.ts`

- **File Name**: `index.ts`
- **Relative Path**: `features/auth/index.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\index.ts`
- **Category**: Feature: Auth
- **Language**: `typescript` | **Lines**: 10 | **Size**: 250 bytes

````typescript
export { LoginForm } from "./components/login-form";
export { SignupForm } from "./components/signup-form";

export { useAuth } from "./hooks/use-auth";

export type {
    AuthUser,
    LoginData,
    SignupData,
} from "./types/auth.types";

````

---

<a id="file-43"></a>
#### File #43: `features/auth/types/auth.types.ts`

- **File Name**: `auth.types.ts`
- **Relative Path**: `features/auth/types/auth.types.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\auth\types\auth.types.ts`
- **Category**: Feature: Auth
- **Language**: `typescript` | **Lines**: 16 | **Size**: 256 bytes

````typescript
export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type SignupData = {
    name: string;
    email: string;
    password: string;
};

````

---


### === FEATURE: CHAT ===

<a id="file-44"></a>
#### File #44: `features/chat/components/chat-container.tsx`

- **File Name**: `chat-container.tsx`
- **Relative Path**: `features/chat/components/chat-container.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\components\chat-container.tsx`
- **Category**: Feature: Chat
- **Language**: `tsx` | **Lines**: 236 | **Size**: 8685 bytes

````tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";
import { useChat } from "../hooks/use-chat";
import { useConversations } from "@/features/conversation/hooks/use-conversations";
import { ProfileCompletionForm } from "@/features/profile/components/profile-completion-form";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ChatContainerProps {
    conversationId?: string;
}

export function ChatContainer({
    conversationId,
}: ChatContainerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isProfileView = searchParams.get("view") === "profile";
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        conversations,
        activeConversationId,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversationTitle,
        touchConversation,
    } = useConversations(conversationId);

    // A dedicated route always uses its own UUID.
    const chatId =
        conversationId ?? activeConversationId ?? "new-chat";

    const {
        messages,
        isLoading,
        isLoaded: messagesLoaded,
        sendMessage,
    } = useChat(chatId);

    const activeConversation = conversations.find(
        (conversation) => conversation.id === chatId
    );

    const conversationTitle = activeConversation?.title ?? "New chat";

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    function handleNewChat() {
        const conversation = createConversation();

        router.push(`/chat/${conversation.id}`);
        setSidebarOpen(false);
    }

    function handleSelectConversation(id: string) {
        selectConversation(id);
        router.push(`/chat/${id}`);
        setSidebarOpen(false);
    }

    function handleDeleteConversation(id: string) {
        deleteConversation(id);

        if (id === (conversationId ?? activeConversationId)) {
            router.push("/chat");
        }
    }

    function handleSendMessage(content: string) {
        if (!messagesLoaded || isLoading) return;

        let targetId = conversationId ?? activeConversationId;

        if (!targetId) {
            const conversation = createConversation();
            targetId = conversation.id;

            router.push(`/chat/${targetId}`);
        }

        if (messages.length === 0) {
            updateConversationTitle(targetId, content);
        }

        touchConversation(targetId);
        sendMessage(content, targetId);
    }

    const sidebarProps = {
        conversations,
        activeConversationId: conversationId ?? activeConversationId,
        onNewChat: handleNewChat,
        onSelectConversation: handleSelectConversation,
        onDeleteConversation: handleDeleteConversation,
        onRenameConversation: updateConversationTitle,
    };

    return (
        <main className="flex h-dvh overflow-hidden bg-background">
            {/* Desktop sidebar */}
            <div className="hidden h-full shrink-0 md:block">
                <Sidebar
                    {...sidebarProps}
                    collapsed={sidebarCollapsed}
                    onToggle={() =>
                        setSidebarCollapsed((previous) => !previous)
                    }
                />
            </div>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="h-full w-72 max-w-[85vw]">
                        <Sidebar
                            {...sidebarProps}
                            collapsed={false}
                            onToggle={() => setSidebarOpen(false)}
                            onClose={() => setSidebarOpen(false)}
                        />
                    </div>

                    <button
                        type="button"
                        aria-label="Close sidebar"
                        className="flex-1 bg-black/40"
                        onClick={() => setSidebarOpen(false)}
                    />
                </div>
            )}

            {/* Main panel: shared header and switchable content */}
            <section className="flex min-w-0 flex-1 flex-col">

                <header className="flex h-14 w-full shrink-0 items-center border-b px-4">
                    {/* Left side */}
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Open sidebar"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="size-5" />
                        </Button>

                        <span className="truncate font-medium">
                            {isProfileView ? "Your Profile" : conversationTitle}
                        </span>
                    </div>

                    {/* Far right side */}
                    <div className="ml-auto flex shrink-0 items-center justify-end">

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-label="Toggle theme"
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                        >
                            {mounted ? (
                                theme === "dark" ? (
                                    <Sun className="size-5" />
                                ) : (
                                    <Moon className="size-5" />
                                )
                            ) : (
                                <span className="size-5" />
                            )}
                        </Button>
                    </div>
                </header>


                {isProfileView ? (
                    <div className="min-h-0 flex-1 overflow-y-auto">
                        <ProfileCompletionForm />
                    </div>
                ) : (
                    <div className="flex min-h-0 flex-1 flex-col">
                        {!messagesLoaded ? (
                            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
                                Loading conversation...
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                                <Sparkles className="mb-5 size-8 text-muted-foreground" />

                                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    What can I help with?
                                </h1>

                                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                                    Ask questions, explore ideas, or get help with your next project.
                                </p>
                            </div>
                        ) : (
                            <div className="min-h-0 flex-1 overflow-y-auto">
                                <MessageList
                                    messages={messages}
                                    isLoading={isLoading}
                                />
                            </div>
                        )}

                        <ChatInput
                            onSend={handleSendMessage}
                            disabled={!messagesLoaded || isLoading}
                        />
                    </div>
                )}
            </section>
        </main>
    );
}

````

---

<a id="file-45"></a>
#### File #45: `features/chat/components/chat-input.tsx`

- **File Name**: `chat-input.tsx`
- **Relative Path**: `features/chat/components/chat-input.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\components\chat-input.tsx`
- **Category**: Feature: Chat
- **Language**: `tsx` | **Lines**: 84 | **Size**: 2874 bytes

````tsx
"use client";

import { useState, type FormEvent } from "react";
import { ArrowUp, Paperclip } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({
    onSend,
    disabled = false,
}: ChatInputProps) {
    const [value, setValue] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const message = value.trim();

        if (!message || disabled) return;

        onSend(message);
        setValue("");
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-3xl px-4 pb-3"
        >
            <div className="rounded-2xl border bg-background p-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <Textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => {
                        if (
                            event.key === "Enter" &&
                            !event.shiftKey &&
                            !event.nativeEvent.isComposing
                        ) {
                            event.preventDefault();
                            event.currentTarget.form?.requestSubmit();
                        }
                    }}
                    placeholder="Message your AI assistant..."
                    aria-label="Message your AI assistant"
                    disabled={disabled}
                    rows={2}
                    className="max-h-48 min-h-12 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
                />

                <div className="flex items-center justify-between pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Attach a file (not implemented)"
                        disabled
                    >
                        <Paperclip className="size-4" />
                    </Button>

                    <Button
                        type="submit"
                        size="icon"
                        aria-label="Send message"
                        disabled={disabled || !value.trim()}
                    >
                        <ArrowUp className="size-4" />
                    </Button>
                </div>
            </div>

            <p className="mt-2 text-center text-xs text-muted-foreground">
                AI can make mistakes. Check important information.
            </p>
        </form>
    );
}

````

---

<a id="file-46"></a>
#### File #46: `features/chat/components/message-item.tsx`

- **File Name**: `message-item.tsx`
- **Relative Path**: `features/chat/components/message-item.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\components\message-item.tsx`
- **Category**: Feature: Chat
- **Language**: `tsx` | **Lines**: 56 | **Size**: 1890 bytes

````tsx
import { Bot, User, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ChatMessage } from "../types/chat.types";

interface MessageItemProps {
    message: ChatMessage;
}

export function MessageItem({ message }: MessageItemProps) {
    const isUser = message.role === "user";

    return (
        <article
            className={`flex gap-3 py-5 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            {!isUser && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <Bot className="size-4" />
                </div>
            )}

            <div
                className={`max-w-[85%] space-y-2 ${isUser
                        ? "rounded-2xl bg-muted px-4 py-3 sm:max-w-[75%]"
                        : "min-w-0 flex-1"
                    }`}
            >
                <p className="whitespace-pre-wrap break-words text-sm leading-7">
                    {message.content}
                </p>

                {!isUser && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                        aria-label="Copy response"
                        onClick={() =>
                            void navigator.clipboard.writeText(message.content)
                        }
                    >
                        <Copy className="size-4" />
                    </Button>
                )}
            </div>

            {isUser && (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full border bg-background">
                    <User className="size-4" />
                </div>
            )}
        </article>
    );
}

````

---

<a id="file-47"></a>
#### File #47: `features/chat/components/message-list.tsx`

- **File Name**: `message-list.tsx`
- **Relative Path**: `features/chat/components/message-list.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\components\message-list.tsx`
- **Category**: Feature: Chat
- **Language**: `tsx` | **Lines**: 37 | **Size**: 915 bytes

````tsx
"use client";

import { useEffect, useRef } from "react";

import type { ChatMessage } from "../types/chat.types";
import { MessageItem } from "./message-item";
import { TypingIndicator } from "./typing-indicator";

interface MessageListProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export function MessageList({
    messages,
    isLoading,
}: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    return (
        <div className="mx-auto w-full max-w-3xl px-4">
            {messages.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
        </div>
    );
}

````

---

<a id="file-48"></a>
#### File #48: `features/chat/components/typing-indicator.tsx`

- **File Name**: `typing-indicator.tsx`
- **Relative Path**: `features/chat/components/typing-indicator.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\components\typing-indicator.tsx`
- **Category**: Feature: Chat
- **Language**: `tsx` | **Lines**: 21 | **Size**: 831 bytes

````tsx
import { Bot } from "lucide-react";

export function TypingIndicator() {
    return (
        <div
            className="flex items-center gap-3 py-5"
            role="status"
            aria-label="Assistant is responding"
        >
            <div className="flex size-8 items-center justify-center rounded-full border">
                <Bot className="size-4" />
            </div>

            <div className="flex items-center gap-1">
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-muted-foreground" />
            </div>
        </div>
    );
}

````

---

<a id="file-49"></a>
#### File #49: `features/chat/data/conversations.json`

- **File Name**: `conversations.json`
- **Relative Path**: `features/chat/data/conversations.json`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\data\conversations.json`
- **Category**: Feature: Chat
- **Language**: `json` | **Lines**: 17 | **Size**: 393 bytes

````json
[
    {
        "id": "demo-1",
        "title": "Build a React application",
        "updatedAt": "2026-10-10T10:00:00.000Z"
    },
    {
        "id": "demo-2",
        "title": "Learn TypeScript",
        "updatedAt": "2026-10-09T10:00:00.000Z"
    },
    {
        "id": "demo-3",
        "title": "AI project ideas",
        "updatedAt": "2026-10-08T10:00:00.000Z"
    }
]

````

---

<a id="file-50"></a>
#### File #50: `features/chat/hooks/use-chat.ts`

- **File Name**: `use-chat.ts`
- **Relative Path**: `features/chat/hooks/use-chat.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\hooks\use-chat.ts`
- **Category**: Feature: Chat
- **Language**: `typescript` | **Lines**: 129 | **Size**: 3599 bytes

````typescript

"use client";

import { useEffect, useState } from "react";
import type { ChatMessage } from "@/features/chat/types/chat.types";

const STORAGE_KEY = "chatgpt-clone-messages-v1";

type MessagesByConversation = Record<string, ChatMessage[]>;

export function useChat(conversationId: string) {
    const [messagesByConversation, setMessagesByConversation] =
        useState<MessagesByConversation>({});
    const [loadingIds, setLoadingIds] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    parsed !== null &&
                    typeof parsed === "object" &&
                    !Array.isArray(parsed)
                ) {
                    setMessagesByConversation(
                        parsed as MessagesByConversation
                    );
                }
            }
        } catch (error) {
            console.error("Failed to load messages:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(messagesByConversation)
            );
        } catch (error) {
            console.error("Failed to save messages:", error);
        }
    }, [messagesByConversation, isLoaded]);

    const messages = messagesByConversation[conversationId] ?? [];
    const isLoading = loadingIds.includes(conversationId);

    function sendMessage(
        content: string,
        targetId: string = conversationId
    ) {
        const text = content.trim();

        if (
            !text ||
            !targetId ||
            !isLoaded ||
            loadingIds.includes(targetId)
        ) {
            return;
        }

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            createdAt: new Date().toISOString(),
        };

        setMessagesByConversation((previous) => ({
            ...previous,
            [targetId]: [
                ...(previous[targetId] ?? []),
                userMessage,
            ],
        }));

        setLoadingIds((previous) =>
            previous.includes(targetId)
                ? previous
                : [...previous, targetId]
        );

        window.setTimeout(() => {
            const assistantMessage: ChatMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: `You said: ${text}`,
                createdAt: new Date().toISOString(),
            };

            setMessagesByConversation((previous) => ({
                ...previous,
                [targetId]: [
                    ...(previous[targetId] ?? []),
                    assistantMessage,
                ],
            }));

            setLoadingIds((previous) =>
                previous.filter((id) => id !== targetId)
            );
        }, 800);
    }

    function clearMessages() {
        setMessagesByConversation((previous) => ({
            ...previous,
            [conversationId]: [],
        }));
    }

    return {
        messages,
        isLoading,
        isLoaded,
        sendMessage,
        clearMessages,
    };
}

````

---

<a id="file-51"></a>
#### File #51: `features/chat/index.ts`

- **File Name**: `index.ts`
- **Relative Path**: `features/chat/index.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\index.ts`
- **Category**: Feature: Chat
- **Language**: `typescript` | **Lines**: 13 | **Size**: 445 bytes

````typescript
export { ChatContainer } from "./components/chat-container";
export { MessageList } from "./components/message-list";
export { MessageItem } from "./components/message-item";
export { ChatInput } from "./components/chat-input";
export { TypingIndicator } from "./components/typing-indicator";

export { useChat } from "./hooks/use-chat";

export type {
    ChatMessage,
    Conversation,
    MessageRole,
} from "./types/chat.types";

````

---

<a id="file-52"></a>
#### File #52: `features/chat/types/chat.types.ts`

- **File Name**: `chat.types.ts`
- **Relative Path**: `features/chat/types/chat.types.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\chat\types\chat.types.ts`
- **Category**: Feature: Chat
- **Language**: `typescript` | **Lines**: 14 | **Size**: 270 bytes

````typescript
export type MessageRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: MessageRole;
    content: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string;
    updatedAt: string;
}

````

---


### === FEATURE: CONVERSATION ===

<a id="file-53"></a>
#### File #53: `features/conversation/components/conversation-item.tsx`

- **File Name**: `conversation-item.tsx`
- **Relative Path**: `features/conversation/components/conversation-item.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\components\conversation-item.tsx`
- **Category**: Feature: Conversation
- **Language**: `tsx` | **Lines**: 158 | **Size**: 5324 bytes

````tsx

"use client";

import { useState } from "react";
import {
    MessageSquare,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import type { Conversation } from "../types/conversation.types";

interface ConversationItemProps {
    conversation: Conversation;
    isActive: boolean;
    onSelect: () => void;
    onDelete: () => void;
    onRename: (newTitle: string) => void;
}

export function ConversationItem({
    conversation,
    isActive,
    onSelect,
    onDelete,
    onRename,
}: ConversationItemProps) {
    const [renameOpen, setRenameOpen] = useState(false);
    const [title, setTitle] = useState(conversation.title);

    // function openRenameDialog() {
    //     // Pre-fill the input with the existing title.
    //     setTitle(conversation.title);
    //     setRenameOpen(true);
    // }

    function handleSave(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newTitle = title.trim();

        // Don't save an empty title.
        if (!newTitle) return;

        // Don't call the rename handler if nothing changed.
        if (newTitle !== conversation.title) {
            onRename(newTitle);
        }

        setRenameOpen(false);
    }

    return (
        <>
            <div
                className={`group flex items-center gap-1 rounded-lg ${isActive ? "bg-muted" : "hover:bg-muted/60"
                    }`}
            >
                <button
                    type="button"
                    onClick={onSelect}
                    className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 text-left text-sm"
                >
                    <MessageSquare className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate">{conversation.title}</span>
                </button>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        type="button"
                        aria-label="Conversation options"
                        className="mr-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md opacity-0 hover:bg-muted group-hover:opacity-100 focus-visible:opacity-100"
                    >
                        <MoreHorizontal className="size-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() => {
                                setTitle(conversation.title);
                                setRenameOpen(true);
                            }}
                        >
                            <Pencil className="mr-2 size-4" />
                            Rename
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onSelect={onDelete}
                            className="text-destructive focus:text-destructive"
                        >
                            <Trash2 className="mr-2 size-4" />
                            Delete conversation
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Rename conversation</DialogTitle>
                        <DialogDescription>
                            Enter a new title for this conversation.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSave}>
                        <Input
                            autoFocus
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            aria-label="Conversation title"
                            maxLength={100}
                        />

                        <DialogFooter className="mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setTitle(conversation.title);
                                    setRenameOpen(false);
                                }}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={!title.trim()}>
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

````

---

<a id="file-54"></a>
#### File #54: `features/conversation/components/conversation-list.tsx`

- **File Name**: `conversation-list.tsx`
- **Relative Path**: `features/conversation/components/conversation-list.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\components\conversation-list.tsx`
- **Category**: Feature: Conversation
- **Language**: `tsx` | **Lines**: 54 | **Size**: 1943 bytes

````tsx
"use client";

import { MessageSquareText } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { Conversation } from "../types/conversation.types";
import { ConversationItem } from "./conversation-item";

interface ConversationListProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onRename: (id: string, newTitle: string) => void;
}

export function ConversationList({
    conversations,
    activeConversationId,
    onSelect,
    onDelete,
    onRename
}: ConversationListProps) {
    return (
        <ScrollArea className="min-h-0 flex-1">
            <div className="space-y-1 p-2">
                <p className="px-2 py-2 text-xs font-medium text-muted-foreground">
                    Recent conversations
                </p>

                {conversations.map((conversation) => (
                    <ConversationItem
                        key={conversation.id}
                        conversation={conversation}
                        isActive={activeConversationId === conversation.id}
                        onSelect={() => onSelect(conversation.id)}
                        onDelete={() => onDelete(conversation.id)}
                        onRename={(newTitle) => onRename(conversation.id, newTitle)}
                    />
                ))}

                {conversations.length === 0 && (
                    <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                        <MessageSquareText className="size-5 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            No conversations yet.
                        </p>
                    </div>
                )}
            </div>
        </ScrollArea>
    );
}

````

---

<a id="file-55"></a>
#### File #55: `features/conversation/components/new-chat-button.tsx`

- **File Name**: `new-chat-button.tsx`
- **Relative Path**: `features/conversation/components/new-chat-button.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\components\new-chat-button.tsx`
- **Category**: Feature: Conversation
- **Language**: `tsx` | **Lines**: 22 | **Size**: 485 bytes

````tsx
"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewChatButtonProps {
    onClick: () => void;
}

export function NewChatButton({ onClick }: NewChatButtonProps) {
    return (
        <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={onClick}
        >
            <Plus className="size-4" />
            New chat
        </Button>
    );
}

````

---

<a id="file-56"></a>
#### File #56: `features/conversation/hooks/use-conversations.ts`

- **File Name**: `use-conversations.ts`
- **Relative Path**: `features/conversation/hooks/use-conversations.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\hooks\use-conversations.ts`
- **Category**: Feature: Conversation
- **Language**: `typescript` | **Lines**: 165 | **Size**: 4607 bytes

````typescript

"use client";

import { useEffect, useState } from "react";
import type { Conversation } from "@/features/conversation/types/conversation.types";

const STORAGE_KEY = "chatgpt-clone-conversations-v1";

const DEFAULT_CONVERSATIONS: Conversation[] = [
    {
        id: "demo-1",
        title: "Welcome to your chat",
        updatedAt: "2026-01-01T00:00:00.000Z",
    },
    {
        id: "demo-2",
        title: "Explore AI",
        updatedAt: "2026-01-02T00:00:00.000Z",
    },
];

export function useConversations(initialId?: string) {
    const [conversations, setConversations] =
        useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] =
        useState<string | null>(initialId ?? null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load saved conversations in the browser.
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (Array.isArray(parsed)) {
                    setConversations(parsed as Conversation[]);
                } else {
                    setConversations(DEFAULT_CONVERSATIONS);
                }
            } else {
                setConversations(DEFAULT_CONVERSATIONS);
            }
        } catch (error) {
            console.error("Could not load conversations:", error);
            setConversations(DEFAULT_CONVERSATIONS);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Ensure a directly opened conversation URL exists in the sidebar.
    useEffect(() => {
        if (!isLoaded) return;

        if (!initialId) {
            setActiveConversationId(null);
            return;
        }

        setActiveConversationId(initialId);

        setConversations((previous) => {
            if (previous.some((item) => item.id === initialId)) {
                return previous;
            }

            return [
                {
                    id: initialId,
                    title: "New chat",
                    updatedAt: new Date().toISOString(),
                },
                ...previous,
            ];
        });
    }, [initialId, isLoaded]);

    // Save after the initial browser load.
    useEffect(() => {
        if (!isLoaded) return;

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(conversations)
            );
        } catch (error) {
            console.error("Could not save conversations:", error);
        }
    }, [conversations, isLoaded]);

    function createConversation(): Conversation {
        const conversation: Conversation = {
            id: crypto.randomUUID(),
            title: "New chat",
            updatedAt: new Date().toISOString(),
        };

        setConversations((previous) => [
            conversation,
            ...previous,
        ]);
        setActiveConversationId(conversation.id);

        return conversation;
    }

    function selectConversation(id: string) {
        setActiveConversationId(id);
    }

    function deleteConversation(id: string) {
        setConversations((previous) =>
            previous.filter((item) => item.id !== id)
        );

        setActiveConversationId((current) =>
            current === id ? null : current
        );
    }

    function updateConversationTitle(
        id: string,
        message: string
    ) {
        const title =
            message.trim().replace(/\s+/g, " ").slice(0, 40) ||
            "New chat";

        setConversations((previous) =>
            previous.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        title,
                        updatedAt: new Date().toISOString(),
                    }
                    : item
            )
        );
    }

    function touchConversation(id: string) {
        setConversations((previous) =>
            previous.map((item) =>
                item.id === id
                    ? { ...item, updatedAt: new Date().toISOString() }
                    : item
            )
        );
    }

    return {
        conversations,
        activeConversationId,
        isLoaded,
        createConversation,
        selectConversation,
        deleteConversation,
        updateConversationTitle,
        touchConversation,
    };
}

````

---

<a id="file-57"></a>
#### File #57: `features/conversation/index.ts`

- **File Name**: `index.ts`
- **Relative Path**: `features/conversation/index.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\index.ts`
- **Category**: Feature: Conversation
- **Language**: `typescript` | **Lines**: 0 | **Size**: 0 bytes

````typescript


````

---

<a id="file-58"></a>
#### File #58: `features/conversation/types/conversation.types.ts`

- **File Name**: `conversation.types.ts`
- **Relative Path**: `features/conversation/types/conversation.types.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\conversation\types\conversation.types.ts`
- **Category**: Feature: Conversation
- **Language**: `typescript` | **Lines**: 9 | **Size**: 239 bytes

````typescript
export interface Conversation {
    id: string;
    title: string;
    updatedAt: string;
}

export interface ConversationWithMessages extends Conversation {
    messages: import("@/features/chat/types/chat.types").ChatMessage[];
}

````

---


### === FEATURE: LANDING ===

<a id="file-59"></a>
#### File #59: `features/landing/components/landing-page.tsx`

- **File Name**: `landing-page.tsx`
- **Relative Path**: `features/landing/components/landing-page.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\landing\components\landing-page.tsx`
- **Category**: Feature: Landing
- **Language**: `tsx` | **Lines**: 92 | **Size**: 3997 bytes

````tsx
"use client";

import Link from "next/link";
import { ArrowRight, Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingPage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-background">
            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            </div>

            {/* Header */}
            <header className="flex h-16 items-center justify-between px-6 md:px-10">
                <div className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Bot className="size-5" />
                    </div>

                    <span className="text-lg font-semibold tracking-tight">
                        AI Chat
                    </span>
                </div>

                <Link href="/login">
                    <Button variant="outline" className="hover:cursor-pointer">
                        Log in
                    </Button>
                </Link>
            </header>

            {/* Hero */}
            <section className="flex flex-1 items-center justify-center px-6 py-20">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
                        <Sparkles className="size-4" />
                        <span>Your intelligent AI assistant</span>
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                        Ask anything.
                        <br />
                        <span className="text-muted-foreground">
                            Create anything.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                        A simple and powerful AI workspace for thinking,
                        learning, writing, coding, and exploring ideas.
                    </p>

                    {/* CTA */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link href="/signup">
                            <Button size="lg" className="gap-2 px-6 hover:cursor-pointer hover:underline">
                                Get Started
                                <ArrowRight className="size-4" />
                            </Button>
                        </Link>

                        <Link href="/login">
                            <Button
                                size="lg"
                                variant="outline"
                                className="px-6 hover:cursor-pointer"
                            >
                                I already have an account
                            </Button>
                        </Link>
                    </div>

                    {/* Small note */}
                    <p className="mt-6 text-xs text-muted-foreground">
                        Start chatting with your AI assistant in seconds.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t px-6 py-5 text-center text-xs text-muted-foreground">
                Built with Next.js, React, TypeScript & shadcn/ui
            </footer>
        </main>
    );
}

````

---


### === FEATURE: PROFILE ===

<a id="file-60"></a>
#### File #60: `features/profile/components/profile-completion-form.tsx`

- **File Name**: `profile-completion-form.tsx`
- **Relative Path**: `features/profile/components/profile-completion-form.tsx`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\profile\components\profile-completion-form.tsx`
- **Category**: Feature: Profile
- **Language**: `tsx` | **Lines**: 399 | **Size**: 14465 bytes

````tsx

"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, UserRound, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/features/profile/hooks/use-profile";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const AVATAR_SIZE = 256;

async function resizeAvatar(file: File): Promise<string> {
    const image = await createImageBitmap(file);

    try {
        const canvas = document.createElement("canvas");
        canvas.width = AVATAR_SIZE;
        canvas.height = AVATAR_SIZE;

        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Could not process this image.");
        }

        const scale = Math.max(
            AVATAR_SIZE / image.width,
            AVATAR_SIZE / image.height
        );

        const width = image.width * scale;
        const height = image.height * scale;

        context.drawImage(
            image,
            (AVATAR_SIZE - width) / 2,
            (AVATAR_SIZE - height) / 2,
            width,
            height
        );

        return canvas.toDataURL("image/jpeg", 0.8);
    } finally {
        image.close();
    }
}

export function ProfileCompletionForm() {
    const router = useRouter();
    const { profile, isLoaded, saveProfile } = useProfile();

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isLoaded) return;

        setFullName(profile.fullName);
        setUsername(profile.username);
        setBio(profile.bio);
        setAvatarUrl(profile.avatarUrl || "");
    }, [
        isLoaded,
        profile.fullName,
        profile.username,
        profile.bio,
        profile.avatarUrl,
    ]);

    const completion = [
        fullName.trim().length > 0,
        username.trim().length > 0,
        bio.trim().length > 0,
        avatarUrl.length > 0,
    ].filter(Boolean).length;

    const progress = Math.round((completion / 4) * 100);

    const initials =
        fullName
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "U";

    async function handleAvatarChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const file = event.currentTarget.files?.[0];
        event.currentTarget.value = "";

        if (!file) return;

        setError("");
        setSaved(false);

        if (!file.type.startsWith("image/")) {
            setError("Please select an image file.");
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError("Choose an image smaller than 5 MB.");
            return;
        }

        try {
            const resizedImage = await resizeAvatar(file);
            setAvatarUrl(resizedImage);
        } catch {
            setError("Could not process this image. Try another one.");
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSaved(false);
        setError("");

        const cleanName = fullName.trim();
        const cleanUsername = username.trim().replace(/^@/, "");

        if (!cleanName) {
            setError("Please enter your full name.");
            return;
        }

        if (!/^[a-zA-Z0-9_]{3,20}$/.test(cleanUsername)) {
            setError(
                "Username must be 3–20 characters using letters, numbers, or underscores."
            );
            return;
        }

        setIsSaving(true);

        const success = saveProfile({
            fullName: cleanName,
            username: cleanUsername,
            bio: bio.trim(),
            avatarUrl,
        });

        setIsSaving(false);

        if (success) {
            router.push("/chat");
        } else {
            setError("Could not save your profile. Please try again.");
        }
    }

    if (!isLoaded) {
        return (
            <div className="flex min-h-64 items-center justify-center text-sm text-muted-foreground">
                Loading your profile...
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-2xl px-5 py-8 sm:px-8">
            <div className="mb-8">
                <p className="text-sm font-medium text-primary">
                    YOUR ACCOUNT
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                    Complete your profile
                </h1>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Add a few details so your account feels like yours.
                    You can update these details at any time.
                </p>
            </div>

            {/* Profile preview */}
            <div className="mb-8 rounded-xl border p-4 sm:p-5">
                <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold">
                        {avatarUrl ? (
                            <img
                                src={avatarUrl}
                                alt="Profile preview"
                                className="size-full object-cover"
                            />
                        ) : initials === "U" ? (
                            <UserRound className="size-7 text-muted-foreground" />
                        ) : (
                            initials
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                            {fullName.trim() || "Your name"}
                        </p>
                        <p className="mt-1 truncate text-sm text-muted-foreground">
                            {username.trim()
                                ? `@${username.trim().replace(/^@/, "")}`
                                : "Your username"}
                        </p>
                        {bio.trim() && (
                            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                {bio}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Profile completion
                        </span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <div
                        className="h-2 overflow-hidden rounded-full bg-secondary"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progress}
                        aria-label="Profile completion"
                    >
                        <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar upload */}
                <div className="space-y-3">
                    <label className="text-sm font-medium">
                        Profile picture
                    </label>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-secondary">
                            {avatarUrl ? (
                                <img
                                    src={avatarUrl}
                                    alt="Selected profile picture"
                                    className="size-full object-cover"
                                />
                            ) : (
                                <UserRound className="size-8 text-muted-foreground" />
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    document.getElementById("avatarUpload")?.click()
                                }
                            >
                                <Upload className="mr-2 size-4" />
                                Upload image
                            </Button>

                            {avatarUrl && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setAvatarUrl("");
                                        setSaved(false);
                                    }}
                                >
                                    <X className="mr-2 size-4" />
                                    Remove
                                </Button>
                            )}
                        </div>

                        <input
                            id="avatarUpload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <p className="text-xs text-muted-foreground">
                        JPG, PNG, or another image format. Maximum 5 MB.
                    </p>
                </div>

                {/* Full name */}
                <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-medium">
                        Full name *
                    </label>
                    <Input
                        id="fullName"
                        name="fullName"
                        autoComplete="name"
                        value={fullName}
                        onChange={(event) => {
                            setFullName(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium">
                        Username *
                    </label>
                    <Input
                        id="username"
                        name="username"
                        autoComplete="username"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        placeholder="e.g. alex_smith"
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        3–20 characters. Letters, numbers, and underscores only.
                    </p>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">
                        About you
                    </label>
                    <Textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={(event) => {
                            setBio(event.currentTarget.value);
                            setSaved(false);
                            setError("");
                        }}
                        placeholder="Tell us a little about yourself..."
                        rows={4}
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                {saved && (
                    <p
                        role="status"
                        className="flex items-center gap-2 text-sm text-green-600"
                    >
                        <Check className="size-4" />
                        Profile saved successfully.
                    </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/chat")}
                    >
                        Do this later
                    </Button>

                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
}

````

---

<a id="file-61"></a>
#### File #61: `features/profile/hooks/use-profile.ts`

- **File Name**: `use-profile.ts`
- **Relative Path**: `features/profile/hooks/use-profile.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\profile\hooks\use-profile.ts`
- **Category**: Feature: Profile
- **Language**: `typescript` | **Lines**: 91 | **Size**: 2915 bytes

````typescript

"use client";

import { useEffect, useState } from "react";
import {
    DEFAULT_PROFILE,
    type UserProfile,
} from "@/features/profile/types/profile.types";

const STORAGE_KEY = "chatgpt-clone-profile-v1";

export function useProfile() {
    const [profile, setProfile] =
        useState<UserProfile>(DEFAULT_PROFILE);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (saved) {
                const parsed: unknown = JSON.parse(saved);

                if (
                    parsed &&
                    typeof parsed === "object" &&
                    "fullName" in parsed &&
                    "username" in parsed &&
                    "bio" in parsed
                ) {
                    const data = parsed as Record<string, unknown>;

                    setProfile({
                        fullName:
                            typeof data.fullName === "string"
                                ? data.fullName
                                : "",
                        username:
                            typeof data.username === "string"
                                ? data.username
                                : "",
                        bio:
                            typeof data.bio === "string"
                                ? data.bio
                                : "",
                        avatarUrl:
                            typeof data.avatarUrl === "string"
                                ? data.avatarUrl
                                : "",
                        updatedAt:
                            typeof data.updatedAt === "string"
                                ? data.updatedAt
                                : "",
                    });
                }
            }
        } catch (error) {
            console.error("Could not load profile:", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    function saveProfile(
        values: Omit<UserProfile, "updatedAt">
    ): boolean {
        const updatedProfile: UserProfile = {
            ...values,
            fullName: values.fullName.trim(),
            username: values.username.trim().replace(/^@/, ""),
            bio: values.bio.trim(),
            avatarUrl: values.avatarUrl || "",
            updatedAt: new Date().toISOString(),
        };

        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedProfile)
            );

            setProfile(updatedProfile);
            return true;
        } catch (error) {
            console.error("Could not save profile:", error);
            return false;
        }
    }

    return { profile, isLoaded, saveProfile };
}

````

---

<a id="file-62"></a>
#### File #62: `features/profile/index.ts`

- **File Name**: `index.ts`
- **Relative Path**: `features/profile/index.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\profile\index.ts`
- **Category**: Feature: Profile
- **Language**: `typescript` | **Lines**: 0 | **Size**: 0 bytes

````typescript


````

---

<a id="file-63"></a>
#### File #63: `features/profile/types/profile.types.ts`

- **File Name**: `profile.types.ts`
- **Relative Path**: `features/profile/types/profile.types.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\features\profile\types\profile.types.ts`
- **Category**: Feature: Profile
- **Language**: `typescript` | **Lines**: 16 | **Size**: 294 bytes

````typescript

export interface UserProfile {
    fullName: string;
    username: string;
    bio: string;
    avatarUrl: string;
    updatedAt: string;
}

export const DEFAULT_PROFILE: UserProfile = {
    fullName: "",
    username: "",
    bio: "",
    avatarUrl: "",
    updatedAt: "",
};

````

---


### === LIBRARIES & UTILITIES ===

<a id="file-64"></a>
#### File #64: `lib/auth/client.ts`

- **File Name**: `client.ts`
- **Relative Path**: `lib/auth/client.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\lib\auth\client.ts`
- **Category**: Libraries & Utilities
- **Language**: `typescript` | **Lines**: 5 | **Size**: 125 bytes

````typescript
"use client";

import { createAuthClient } from "@neondatabase/auth/next";

export const authClient = createAuthClient();

````

---

<a id="file-65"></a>
#### File #65: `lib/auth/server.ts`

- **File Name**: `server.ts`
- **Relative Path**: `lib/auth/server.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\lib\auth\server.ts`
- **Category**: Libraries & Utilities
- **Language**: `typescript` | **Lines**: 9 | **Size**: 265 bytes

````typescript
import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
    baseUrl: process.env.NEON_AUTH_BASE_URL!,
    cookies: {
        secret: process.env.NEON_AUTH_COOKIE_SECRET!,
        sessionDataTtl: 300,
    },
});

````

---

<a id="file-66"></a>
#### File #66: `lib/utils.ts`

- **File Name**: `utils.ts`
- **Relative Path**: `lib/utils.ts`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\lib\utils.ts`
- **Category**: Libraries & Utilities
- **Language**: `typescript` | **Lines**: 1 | **Size**: 24 bytes

````typescript
export { cn } from "cn"

````

---


### === PUBLIC ASSETS ===

<a id="file-67"></a>
#### File #67: `public/file.svg`

- **File Name**: `file.svg`
- **Relative Path**: `public/file.svg`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\public\file.svg`
- **Category**: Public Assets
- **Language**: `xml` | **Lines**: 1 | **Size**: 391 bytes

````xml
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>

````

---

<a id="file-68"></a>
#### File #68: `public/globe.svg`

- **File Name**: `globe.svg`
- **Relative Path**: `public/globe.svg`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\public\globe.svg`
- **Category**: Public Assets
- **Language**: `xml` | **Lines**: 1 | **Size**: 1035 bytes

````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>

````

---

<a id="file-69"></a>
#### File #69: `public/next.svg`

- **File Name**: `next.svg`
- **Relative Path**: `public/next.svg`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\public\next.svg`
- **Category**: Public Assets
- **Language**: `xml` | **Lines**: 1 | **Size**: 1375 bytes

````xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>

````

---

<a id="file-70"></a>
#### File #70: `public/vercel.svg`

- **File Name**: `vercel.svg`
- **Relative Path**: `public/vercel.svg`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\public\vercel.svg`
- **Category**: Public Assets
- **Language**: `xml` | **Lines**: 1 | **Size**: 128 bytes

````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>

````

---

<a id="file-71"></a>
#### File #71: `public/window.svg`

- **File Name**: `window.svg`
- **Relative Path**: `public/window.svg`
- **Absolute Path**: `d:\AI-learning\chatgpt-clone\public\window.svg`
- **Category**: Public Assets
- **Language**: `xml` | **Lines**: 1 | **Size**: 385 bytes

````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>

````

---
