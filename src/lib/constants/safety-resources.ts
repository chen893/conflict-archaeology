export interface Hotline {
  name: string;
  number: string;
}

export interface SafetyResourceSet {
  hotlines: Hotline[];
}

const STORAGE_KEY = "safety_resources";

export const SAFETY_RESOURCES: SafetyResourceSet = {
  hotlines: [
    { name: "全国心理援助热线", number: "400-161-9995" },
    { name: "妇女维权热线", number: "12338" },
    { name: "紧急报警", number: "110" },
  ],
};

export function cacheSafetyResources() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAFETY_RESOURCES));
  } catch {
    // 本地存储失败时静默忽略，确保页面渲染不受影响
  }
}

export function getSafetyResources(): SafetyResourceSet {
  if (typeof window === "undefined") return SAFETY_RESOURCES;
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached) as SafetyResourceSet;
      if (parsed?.hotlines?.length) return parsed;
    }
    cacheSafetyResources();
    return SAFETY_RESOURCES;
  } catch {
    return SAFETY_RESOURCES;
  }
}

if (typeof window !== "undefined") {
  cacheSafetyResources();
}
