// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&family=Orbitron:wght@400;700&family=Metamorphous&display=swap" rel="stylesheet" />

                {/* Script pour appliquer le thème avant le rendu React */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (_) {}
              })();
            `,
                    }}
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
