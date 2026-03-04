import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mrs Portfolio",
  description: "Rishikesh's personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Script to remove Next.js dev tools badge */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove Next.js dev tools badge
              function removeNextDevTools() {
                const selectors = [
                  '[data-next-badge]',
                  '[data-nextjs-dev-tools-button]',
                  '[data-next-badge-root]',
                  '[data-nextjs-toast]',
                  '.nextjs-dev-toolbar',
                  '.nextjs-dev-overlay'
                ];
                
                selectors.forEach(selector => {
                  const elements = document.querySelectorAll(selector);
                  elements.forEach(el => {
                    if (el.parentNode) {
                      el.parentNode.removeChild(el);
                    }
                  });
                });
                
                // Also check for shadow DOM elements
                const allElements = document.querySelectorAll('*');
                allElements.forEach(el => {
                  if (el.shadowRoot) {
                    const shadowElements = el.shadowRoot.querySelectorAll('[data-next-badge], [data-nextjs-dev-tools-button]');
                    shadowElements.forEach(shadowEl => {
                      if (shadowEl.parentNode) {
                        shadowEl.parentNode.removeChild(shadowEl);
                      }
                    });
                  }
                });
              }
              
              // Run immediately and on DOM changes
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', removeNextDevTools);
              } else {
                removeNextDevTools();
              }
              
              // Watch for new elements being added
              const observer = new MutationObserver(removeNextDevTools);
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            `,
          }}
        />
      </body>
    </html>
  );
}