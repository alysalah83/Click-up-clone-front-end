"use client";

import "tldraw/tldraw.css";
import { Tldraw, useEditor } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import { useTheme } from "next-themes";
import { useEffect } from "react";

function ThemeUpdater() {
  const editor = useEditor();
  const { theme } = useTheme();

  useEffect(() => {
    if (editor) {
      editor.user.updateUserPreferences({
        colorScheme: theme as "dark" | "light" | undefined,
      });
    }
  }, [editor, theme]);

  return null;
}

function Whiteboard({ userId }: { userId: string }) {
  const { theme } = useTheme();
  const store = useSyncDemo({ roomId: userId });

  return (
    <Tldraw store={store} inferDarkMode={theme === "dark"}>
      <ThemeUpdater />
    </Tldraw>
  );
}

export default Whiteboard;
