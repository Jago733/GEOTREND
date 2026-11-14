"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAnalytics } from "@/lib/firebase";
import { logEvent } from "firebase/analytics";

export function FirebaseAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    initAnalytics().then((analytics) => {
      if (analytics && isMounted) {
        logEvent(analytics, "page_view", {
          page_path: pathname,
          page_title: document.title,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [pathname]);

  return null;
}
