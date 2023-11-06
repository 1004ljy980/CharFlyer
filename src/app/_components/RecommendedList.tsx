'use client';

import styles from './RecommendedList.module.scss';

import Image from 'next/image';
import { TypeIntroductionPostList } from '@/frontend/types/interfaces/introductionPost.interface';
import { useState } from 'react';

const AIRPLANE_AMOUNT = 3;

export default function RecommendedList({
  postList,
}: {
  postList: Array<TypeIntroductionPostList>;
}) {
  // 3개의 비행기로 리스트가 구성됩니다.
  const airplaneList: Array<TypeIntroductionPostList> = [];
  for (let i = 0, j = 0; i < AIRPLANE_AMOUNT; i++) {
    j == postList.length && (j = 0);
    airplaneList.push(postList[j++]);
  }

  return (
    <div className={styles.recommendedContainer}>
      {airplaneList.map((airplane, index) => {
        const [open, setOpen] = useState(false);

        return (
          <div key={index}>
            <Image
              className={styles.recommendedAirplane}
              src="/image/paper_airplane_only_45deg.png"
              fill={true}
              style={{ objectFit: 'contain' }}
              sizes="100%"
              alt={`추천 종이비행기 ${index}번째`}
              onClick={() => setOpen(true)}
            />
            {open && (
              <div
                className={`${styles.flyer} ${
                  open ? styles.open : styles.unopen
                }`}
              >
                <div className={styles.thumbnail}>
                  <Image
                    src={`${airplane.thumbnail}`}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="100%"
                    alt={`추천 종이비행기 ${index}번째 섬네일`}
                  />
                  <p className={styles.title}>{airplane.title}</p>
                </div>
                <div className={styles.descriptionContainer}>
                  <div className={styles.summaryBox}>
                    <p className={styles.summary}>{airplane.summary}</p>
                    {/* tags에 word-break break-word로 설정 */}
                    <p className={styles.tags}>
                      {airplane.tags.map((tag) => `#${tag}`).join(' ')}
                    </p>
                  </div>
                  <div className={styles.author}>
                    <div className={styles.authorProfile}>
                      <Image
                        src={`${airplane.authorImage}`}
                        fill={true}
                        style={{ objectFit: 'cover' }}
                        sizes="100%"
                        alt={`${airplane.authorName}의 프로필 이미지`}
                      />
                    </div>
                    <span className={styles.by}>by</span>
                    <span className={styles.authorName}>
                      {airplane.authorName}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
