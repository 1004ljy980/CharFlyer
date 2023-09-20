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

  enum AirplaneListTypes {
    Original = 'ORIGIN',
    Clone = 'CLONE',
  }

  // 원본, 복사본
  const AirplaineList = ({ listType }: { listType: AirplaneListTypes }) => {
    const listClasses = [
      styles.airplanList,
      stop ? styles.stop : '',
      listType == AirplaneListTypes.Original ? styles.original : styles.clone,
    ].join(' ');

    return (
      <div className={listClasses}>
        {airplaneList.map((airplane, index) => {
          return (
            <div key={index} className={styles.airplane}>
              <Image
                className={styles.airplaneImage}
                src="/image/paper_airplane.png"
                fill={true}
                style={{ objectFit: 'cover' }}
                sizes="100%"
                alt="추천 종이비행기 첫 번째"
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.listWrap}>
      <AirplaineList listType={AirplaneListTypes.Original} />
      <AirplaineList listType={AirplaneListTypes.Clone} />
    </div>
  );
}
