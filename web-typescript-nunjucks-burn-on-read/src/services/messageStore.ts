import { randomUUID } from "node:crypto";
import { mkdir, writeFile, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";

import type { SecretMessage } from "../types.js";

const storageDirectory = path.resolve("data/messages");

export async function createMessage(content: string): Promise<string> {

  await mkdir(storageDirectory, { recursive: true });

  // node.js's randomUUID() is a convenient way to generate a UUID v4.
  const id = randomUUID();

  const message: SecretMessage = {
    id,
    content,
    createdAt: Date.now(),
  };

  // This is called path construction using Node.js's built-in path module.
  const filePath = path.join(storageDirectory, `${id}.json`);


await writeFile(filePath, JSON.stringify(message), {
    encoding: "utf-8",
    flag: "wx"
  });

  return id;
}

export async function consumeMessage (
  id: string
): Promise<SecretMessage | null> {
  // Only accept valid UUIDs.
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return null;
  }

  const filePath = path.join(storageDirectory, `${id}.json`);
  const claimedPath = path.join(
    storageDirectory,
    `${id}.${randomUUID()}.consumed`
  );

  try {
    // Atomically claim the message.
    await rename(filePath, claimedPath);

    try {
      const content = await readFile(claimedPath, "utf-8");
      return JSON.parse(content) as SecretMessage;
    } finally {
      await unlink(claimedPath);
    }
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
}