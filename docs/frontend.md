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
