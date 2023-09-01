// 스타일
import styles from './appPage.module.scss';

const BannerList = () => {
  return <></>;
};

const SearchBar = () => {
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
          <p className={styles.searchTitle}>어떤 캐릭터를 원하세요?</p>
          <p className={styles.searchSubTitle}>물론, 굿즈도요!</p>
          <div>
            <SearchBar />
          </div>
          <div>
            {/* 배경 이미지 */}
            {/* 종이 배 이미지 */}
          </div>
        </section>
        <section className={styles.recommendedSection}></section>
        <section className={styles.randomSearchingSection}></section>
      </main>
    </>
  );
}
