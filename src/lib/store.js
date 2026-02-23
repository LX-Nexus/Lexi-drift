const rid = () => crypto.randomUUID();
const LS_KEY = "lexi_drift_store_v1";

const defaultStore = {
  pdfs: {},
  chats: [],
  activeChatId: null,
};

export function loadStore() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return defaultStore;
    const parsed = JSON.parse(raw);
    return { ...defaultStore, ...parsed };
  } catch {
    return defaultStore;
  }
}

export function saveStore(s) {
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

export function createChat(s) {
  const now = Date.now();
  const chat = {
    id: rid(),
    title: "New chat",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
  return { ...s, chats: [chat, ...s.chats], activeChatId: chat.id };
}

export function setActiveChat(s, id) {
  return { ...s, activeChatId: id };
}

export function addPdf(s, file) {
  const pdf = { id: rid(), name: file.name, file };
  const next = { ...s, pdfs: { ...s.pdfs, [pdf.id]: pdf } };
  return { next, pdf };
}

export function pushMsg(s, chatId, msg) {
  const chats = s.chats.map((c) =>
    c.id === chatId
      ? {
          ...c,
          messages: [...c.messages, msg],
          updatedAt: Date.now(),
          title:
            c.title === "New chat" && msg.text
              ? msg.text.slice(0, 28)
              : c.title,
        }
      : c
  );
  return { ...s, chats };
}

export function updateMsg(s, chatId, msgId, patch) {
  const chats = s.chats.map((c) =>
    c.id === chatId
      ? {
          ...c,
          messages: c.messages.map((m) =>
            m.id === msgId ? { ...m, ...patch } : m
          ),
        }
      : c
  );
  return { ...s, chats };
}
