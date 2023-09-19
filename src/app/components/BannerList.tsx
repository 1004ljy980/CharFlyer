'use client';

import styles from './BannerList.module.scss';

import { useState } from 'react';
import { TypeIntroductionPostList } from '@/types/interfaces/introductionPost.interface';

import Image from 'next/image';

export default function BannerList({
  postList,
}: {
  postList: Array<TypeIntroductionPostList>;
}) {
  // 마우스가 올라갔을 때 애니메이션을 멈추기 위한 상태
  const [stop, setStop] = useState(false);
  const onStop = () => setStop(true);
  const onRun = () => setStop(false);

  console.log(postList);

  // 20개의 비행기로 리스트가 구성됩니다.
  const airplaneList: Array<TypeIntroductionPostList> = [];
  for (let i = 0; i < 20; i++) {
    let j = 0;
    j++ < postList.length ? airplaneList.push(postList[j]) : (j = 0);
  }

  enum AirplaneListTypes {
    Original = 'ORIGIN',
    Clone = 'CLONE',
  }

  // 원본, 복사본
  const AirplaineList = ({ listType }: { listType: AirplaneListTypes }) => {
    const listClasses = [
      styles.airplanList,
      stop && styles.stop,
      listType == AirplaneListTypes.Original ? styles.original : styles.clone,
    ].join(' ');

    return (
      <div className={listClasses}>
        {airplaneList.map((airplane, index) => {
          return (
            <div key={index} className={styles.airplane}>
              <Image
                src="/image/paper_boat.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                alt={`종이비행기 ${airplane.title}`}
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
