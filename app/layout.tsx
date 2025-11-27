import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Abril Marangoni — Designer & Creative Technologist",
  description: "Portfolio of Abril Marangoni, a designer, developer, and builder of thoughtful digital experiences.",
  keywords: ["UX Designer", "UI Designer", "Creative Technologist", "Portfolio", "Minimal Design"],
  authors: [{ name: "Abril Marangoni" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Abril Marangoni — Designer & Creative Technologist",
    description: "A designer, developer, and builder of thoughtful digital experiences.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <Script id="dev-mode" strategy="afterInteractive">
          {`
            (function() {
              const devModeActivated = false;
              
              // Global reveal function
              window.reveal = function() {
                if (window.revealAlreadyShown) return;
                window.revealAlreadyShown = true;
                
                console.clear();
                console.log('%cYou like digging under the hood?', 'font-size: 20px; font-weight: bold; color: #000;');
                console.log('%cI do too. Let\'s connect.', 'font-size: 16px; color: #666; margin-top: 8px;');
                console.log('');
                console.log('%cEmail:', 'font-weight: bold; color: #000;');
                console.log('%cabrilmarangoni@gmail.com', 'color: #0066cc; text-decoration: underline;');
                console.log('');
                console.log('%cLinkedIn:', 'font-weight: bold; color: #000;');
                console.log('%chttps://www.linkedin.com/in/abril-marangoni-49924327a', 'color: #0066cc; text-decoration: underline;');
                console.log('');
                console.log('%cPhone:', 'font-weight: bold; color: #000;');
                console.log('%c+54 9 223 414-1654', 'color: #000;');
                console.log('');
                console.log('%c- Abi', 'font-style: italic; color: #999; margin-top: 12px;');
              };
              
              // Detect console open
              const threshold = 160;
              let consoleIsOpen = false;
              
              const checkConsole = () => {
                const widthThreshold = window.outerWidth - window.innerWidth > threshold;
                const heightThreshold = window.outerHeight - window.innerHeight > threshold;
                const orientation = widthThreshold ? 'vertical' : 'horizontal';
                
                if (!(heightThreshold && widthThreshold) && ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)) {
                  if (!consoleIsOpen) {
                    consoleIsOpen = true;
                    setTimeout(() => {
                      if (!window.revealAlreadyShown) {
                        window.reveal();
                      }
                    }, 500);
                  }
                }
              };
              
              // Check on load and resize
              window.addEventListener('load', checkConsole);
              window.addEventListener('resize', checkConsole);
              
              // Also trigger on common dev tools shortcuts
              document.addEventListener('keydown', (e) => {
                // F12, Ctrl+Shift+I, Ctrl+Shift+J, Cmd+Option+I, Cmd+Option+J
                if (e.key === 'F12' || 
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
                    (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j'))) {
                  setTimeout(() => {
                    if (!window.revealAlreadyShown) {
                      window.reveal();
                    }
                  }, 500);
                }
              });
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
