import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '캐플라이어',
  description: '캐릭터들과 알아가는 이야기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
