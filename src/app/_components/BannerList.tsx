'use client';

import styles from './BannerList.module.scss';

import { useState } from 'react';
import { TypeIntroductionPostList } from '@/frontend/types/interfaces/introductionPost.interface';

import Image from 'next/image';

const AIRPLANE_AMOUNT = 20;

export default function BannerList({
  postList,
  isFlip = false,
}: {
  postList: Array<TypeIntroductionPostList>;
  isFlip?: boolean;
}) {
  // 마우스가 올라갔을 때 애니메이션을 멈추기 위한 상태
  const [stop, setStop] = useState(false);
  const onStop = () => setStop(true);
  const onRun = () => setStop(false);

  // 20개의 비행기로 리스트가 구성됩니다.
  const airplaneList: Array<TypeIntroductionPostList> = [];
  for (let i = 0, j = 0; i < AIRPLANE_AMOUNT; i++) {
    j == postList.length && (j = 0);
    airplaneList.push(postList[j++]);
  }

  const listClasses = [styles.airplaneList, stop ? styles.stop : null].join(
    ' '
  );

  return (
    <div className={`${styles.listWrap} ${isFlip ? styles.flip : ''}`}>
      {/* 원본리스트 */}
      <ul className={`${listClasses} ${styles.original}`}>
        {airplaneList.map((airplane, index) => {
          const [hover, setHover] = useState(false);

          return (
            <li
              key={`original : ${index}`}
              className={styles.airplane}
              onMouseEnter={() => {
                onStop();
                setHover(true);
              }}
              onMouseLeave={() => {
                onRun();
                setHover(false);
              }}
            >
              <Image
                className={styles.airplaneImage}
                src="/image/paper_airplane_back.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="100%"
                alt={`${airplane.title} 뒷 이미지`}
              />
              <div className={`${hover && styles.polaroidUp}`}>
                <Image
                  className={styles.airplaneImage}
                  src="/image/paper_airplane_polaroid.png"
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  sizes="100%"
                  alt={`${airplane.title} 폴라로이드`}
                />
                <div className={styles.thumbnail}>
                  <Image
                    className={`${isFlip ? styles.flip : ''}`}
                    src={`${airplane.thumbnail}`}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="100%"
                    alt={`${airplane.title}의 소개 사진`}
                  />
                </div>
              </div>
              <Image
                className={styles.airplaneImage}
                src="/image/paper_airplane_front.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="100%"
                alt={`${airplane.title} 앞 이미지`}
              />
              {hover && (
                <div
                  className={`${styles.bubble} ${isFlip ? styles.flip : ''}`}
                >
                  <Image
                    src="/image/paper_airplane_bubble.png"
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    sizes="100%"
                    alt={`${airplane.title} 타이틀 풍선`}
                  />
                  <p>{airplane.title}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* 복제리스트 */}
      <ul className={`${listClasses} ${styles.clone}`}>
        {airplaneList.map((airplane, index) => {
          const [hover, setHover] = useState(false);

          return (
            <li
              key={`clone : ${index}`}
              className={styles.airplane}
              onMouseEnter={() => {
                onStop();
                setHover(true);
              }}
              onMouseLeave={() => {
                onRun();
                setHover(false);
              }}
            >
              <Image
                className={styles.airplaneImage}
                src="/image/paper_airplane_back.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="100%"
                alt={`${airplane.title} 뒷 이미지`}
              />
              <div className={`${hover && styles.polaroidUp}`}>
                <Image
                  className={styles.airplaneImage}
                  src="/image/paper_airplane_polaroid.png"
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  sizes="100%"
                  alt={`${airplane.title} 폴라로이드`}
                />
                <div className={styles.thumbnail}>
                  <Image
                    className={`${isFlip ? styles.flip : ''}`}
                    src={`${airplane.thumbnail}`}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="100%"
                    alt={`${airplane.title}의 소개 사진`}
                  />
                </div>
              </div>
              <Image
                className={styles.airplaneImage}
                src="/image/paper_airplane_front.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="100%"
                alt={`${airplane.title} 앞 이미지`}
              />
              {hover && (
                <div
                  className={`${styles.bubble} ${isFlip ? styles.flip : ''}`}
                >
                  <Image
                    src="/image/paper_airplane_bubble.png"
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    sizes="100%"
                    alt={`${airplane.title} 타이틀 풍선`}
                  />
                  <p>{airplane.title}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
