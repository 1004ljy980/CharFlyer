import styles from './page.module.scss';
import { BsSearch } from 'react-icons/bs';

import Image from 'next/image';
import BannerList from './components/BannerList';
import { getIntroductionPostsList } from '@/utils/api/Fetcher';

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

const RecommendedList = () => {
  return (
    <div className={styles.recommendedContainer}>
      <div>
        <Image
          className={styles.recommendedAirplane}
          src="/image/paper_airplane_only_45deg.png"
          fill={true}
          style={{ objectFit: 'contain' }}
          sizes="100%"
          alt="추천 종이비행기 첫 번째"
        />
      </div>
      <div>
        <Image
          className={styles.recommendedAirplane}
          src="/image/paper_airplane_only_45deg.png"
          fill={true}
          sizes="100%"
          style={{ objectFit: 'contain' }}
          alt="추천 종이비행기 두 번째"
        />
      </div>
      <div>
        <Image
          className={styles.recommendedAirplane}
          src="/image/paper_airplane_only_45deg.png"
          fill={true}
          sizes="100%"
          style={{ objectFit: 'contain' }}
          alt="추천 종이비행기 세 번째"
        />
      </div>
    </div>
  );
};

export default async function Home() {
  const bannerData = await getIntroductionPostsList();
  console.log(bannerData);

  return (
    <>
      <main className={styles.main}>
        <section className={styles.bannerSection}>
          {bannerData ? (
            <>
              <div>
                <BannerList postList={bannerData} />
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
          <p>비행기가 날아왔어요.</p>
          <div className={styles.recommendedBox}>
            <RecommendedList />
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
    </>
  );
}
