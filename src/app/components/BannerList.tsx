'use client';

import styles from './BannerList.module.scss';

import { useState } from 'react';
import { TypeIntroductionPostList } from '@/types/interfaces/introductionPost.interface';

import Image from 'next/image';

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
  for (let i = 0, j = 0; i < 20; i++) {
    j == postList.length && (j = 0);
    airplaneList.push(postList[j++]);
  }

  const listClasses = [styles.airplaneList, stop ? styles.stop : null].join(
    ' '
  );

  const Airplane = ({
    index,
    airplane,
  }: {
    index: number;
    airplane: TypeIntroductionPostList;
  }) => {
    return (
      <li
        key={index}
        className={styles.airplane}
        onMouseEnter={onStop}
        onMouseLeave={onRun}
      >
        <Image
          className={styles.airplaneImage}
          src="/image/paper_airplane.png"
          fill={true}
          style={{ objectFit: 'contain' }}
          sizes="100%"
          alt={`${airplane.title}`}
        />
        <div className={`${styles.thumbnail} ${isFlip ? styles.flip : ''}`}>
          <Image
            src={`${airplane.thumbnail}`}
            fill={true}
            style={{ objectFit: 'cover' }}
            sizes="100%"
            alt={`${airplane.title}의 소개 사진`}
          />
        </div>
      </li>
    );
  };

  return (
    <div className={`${styles.listWrap} ${isFlip ? styles.flip : ''}`}>
      <ul className={`${listClasses} ${styles.original}`}>
        {airplaneList.map((airplane, index) => {
          return <Airplane index={index} airplane={airplane} />;
        })}
      </ul>
      <ul className={`${listClasses} ${styles.clone}`}>
        {airplaneList.map((airplane, index) => {
          return <Airplane index={index} airplane={airplane} />;
        })}
      </ul>
    </div>
  );
}
