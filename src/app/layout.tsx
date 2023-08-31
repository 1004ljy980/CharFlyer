// 스타일
import '@/app/globals.css';
import styles from '@/app/layout.module.scss';

// 메타 데이터
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '캐플라이어',
  description: '캐릭터, 굿즈는 여기서 찾아보세요!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header className={styles.header}>
          <h1>캐플라이어</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
