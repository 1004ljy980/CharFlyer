import styles from './page.module.scss';
import { BsSearch } from 'react-icons/bs';

import Image from 'next/image';
import BannerList from './components/BannerList';
import { getIntroductionPostsList } from '@/utils/api/Fetcher';
import RecommendedList from './components/RecommendedList';
import './globals.css';

// 데이터는 해당 page에서 받아들이고, 나머지 컴포넌트는 client component로 옮겨야 함.(이벤트 필요)
// 단, 서버 컴포넌트와 클라이언트 컴포넌트는 네트워크 경계를 나누고 있으므로 직렬화가 필요함.
// https://velog.io/@brgndy/React-Server-vs-Client-Component-in-Next.js-13-%ED%95%B4%EC%84%9D

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchIconBox}>
        <BsSearch className={styles.searchIcon} />
      </div>
      <div className={styles.searchInputBox}>
        <input
          className={styles.searchInput}
          placeholder="키워드를 적어 검색해보세요."
        />
      </div>
    </div>
  );
};

export default async function Home() {
  // 추후에 4페이지(10개 * 4)를 받아들이고, 2페이지씩 위 아래 BannerSection에 각각 전달해야함.
  const bannerData = await getIntroductionPostsList();

  return (
      <main className={styles.main}>
        <section className={styles.bannerSection}>
          <p className={styles.bannerText}>캐릭터들이 찾아오고 있어요.</p>
          {bannerData ? (
            <>
              <div>
                <BannerList postList={bannerData} isFlip={true} />
              </div>
              <div>
                <BannerList postList={bannerData} />
              </div>
            </>
          ) : (
            <></>
          )}
        </section>
        <section className={styles.searchingSection}>
          <p className={styles.searchTitle}>
            어떤 <span>캐릭터</span>를 원하세요?
          </p>
          <p className={styles.searchSubTitle}>
            물론, <span>굿즈</span>도요!
          </p>
          <div className={styles.searchBox}>
            <SearchBar />
          </div>
          <div className={styles.boatBox}>
            {/* 배경 이미지 */}
            <Image
              src="/image/paper_boat.png"
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100%"
              alt="종이배"
            />
            <Image
              src="/image/paper_boat_wave.png"
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100%"
              alt="수면"
            />
            <div className={styles.surface}></div>
          </div>
        </section>
        <section className={styles.recommendedSection}>
          <p className={styles.recommendedSectionTitle}>비행기가 날아왔어요.</p>
          <div className={styles.recommendedBox}>
            <RecommendedList postList={bannerData} />
          </div>
        </section>
        <section className={styles.randomSearchingSection}>
          <p>그리고, 누군가의 이야기</p>
          <div className={styles.backgroundLine}></div>
          <div className={styles.randomAirplaneBox}>
            <Image
              className={styles.randomAirplane}
              src="/image/paper_airplane_only.png"
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100%"
              alt="종이비행기 랜덤 탐색"
            />
          </div>
        </section>
      </main>
  );
}
