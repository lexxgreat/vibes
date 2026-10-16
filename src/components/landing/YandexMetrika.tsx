"use client";

import Script from "next/script";
import { YM_COUNTER_ID } from "@/lib/analytics";

/**
 * Yandex.Metrika init snippet.
 *
 * Counter ID is read from NEXT_PUBLIC_YM_ID (set in Vercel env vars
 * or .env locally). When empty, the script is skipped entirely.
 *
 * Tracking events fired from the landing (see lib/analytics.ts):
 *   - button_click  — every CTA button (data-track="button")
 *   - widget_click  — the floating contact widget (data-track="vid")
 */
export function YandexMetrika() {
  if (!YM_COUNTER_ID) {
    return null;
  }

  const id = Number(YM_COUNTER_ID);

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=${id}', 'ym');

          ym(${id}, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            referrer: document.referrer,
            url: location.href,
            accurateTrackBounce: true,
            trackLinks: true
          });
        `}
      </Script>

      {/* Noscript fallback (per Yandex.Metrika docs) */}
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}
