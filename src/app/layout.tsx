// 스타일
import '@/app/globals.css';
import styles from '@/app/layout.module.scss';

// 컴포넌트
import Link from 'next/link';

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
          <div className={styles.container}>
            <h1 className={styles.logo}>캐플라이어</h1>

            {/* 일반 메뉴 */}
            <nav className={styles.leftContainer}>
              <ul>
                <li>
                  <Link href="">메인</Link>
                </li>
                <li>
                  <Link href="">카테고리</Link>
                </li>
              </ul>
            </nav>

            {/* 사용자 메뉴 */}
            <nav className={styles.rightContainer}>
              <ul>
                <li>
                  <Link href="">로그인</Link>
                </li>
                <li>
                  <Link href="">회원가입</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className={styles.footer}></footer>
      </body>
    </html>
  );
}
