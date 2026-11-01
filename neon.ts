import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  buckets: {
    "profile-images": {
      access: "private",
    },
  },
});