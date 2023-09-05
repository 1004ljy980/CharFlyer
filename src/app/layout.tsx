// 스타일
import '@/app/globals.css';
import styles from '@/app/layout.module.scss';
import { AiFillGithub } from 'react-icons/ai';
import { SiTistory } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';

// 컴포넌트
import Link from 'next/link';
import Image from 'next/image';

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
            <h1>캐플라이어</h1>
            <Image
              className={styles.logo}
              src="/image/web_logo.png"
              width={120}
              height={48}
              alt="캐플라이어 로고"
            />

            {/* 일반 메뉴 */}
            <nav className={styles.leftContainer}>
              <ul>
                <li>
                  <Link className={styles.link} href="">
                    메인
                  </Link>
                </li>
                <li>
                  <Link className={styles.link} href="">
                    카테고리
                  </Link>
                </li>
              </ul>
            </nav>

            {/* 사용자 메뉴 */}
            <nav className={styles.rightContainer}>
              <ul>
                <li>
                  <Link className={styles.loginLink} href="">
                    로그인
                  </Link>
                </li>
                <li>
                  <Link className={styles.registerLink} href="">
                    회원가입
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {children}

        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <Image
              className={styles.logo}
              src="/image/web_logo.png"
              width={120}
              height={48}
              alt="캐플라이어 로고"
            />
            <div className={styles.footerTable}>
              <div className={styles.leftContainer}>
                <div>
                  <p>캐플라이어가 도와드릴게요.</p>
                  <p>캐릭터와의 뜻 밖의 만남.</p>
                  <p>굿즈와의 기분좋은 만남.</p>
                </div>
                <p>Copyright 2023. CharFlyer All rights reserved.</p>
              </div>
              <div className={styles.rightContainer}>
                <p className={styles.subtitle}>SUPPORT</p>
                <p>이주영</p>
                <div className={styles.supportTable}>
                  <AiFillGithub />
                  <p>github</p>
                  <p>https://github.com/1004ljy980</p>
                  <SiTistory />
                  <p>tistory</p>
                  <p>https://lee-ju-0.tistory.com/</p>
                  <HiOutlineMail />
                  <p>email</p>
                  <p>lee_ju_0@naver.com</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
