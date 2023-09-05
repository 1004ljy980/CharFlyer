// 스타일
import styles from './appPage.module.scss';

const BannerList = () => {
  return <></>;
};

const SearchBar = () => {
  return <></>;
};

const RecommendedList = () => {
  return <></>;
};

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.bannerSection}>
          <div>
            <BannerList />
          </div>
          <div>
            <BannerList />
          </div>
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
            {/* 종이 배 이미지 */}
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
          {/* 비행기 이미지 */}
        </section>
      </main>
    </>
  );
}
