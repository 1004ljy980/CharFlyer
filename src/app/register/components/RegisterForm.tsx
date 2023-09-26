'use client';

import styles from './RegisterForm.module.scss';
import { GrFormNext } from 'react-icons/gr';

import { useState } from 'react';
import { TypeManagementContent } from '@/types/interfaces/management.interface';

const FIRST_STEP = 1;
const SECOND_STEP = 2;
const FINISH_STEP = 3;
const NEXT_STEP = 1;

export default function RegisterForm({
  managementContent,
}: {
  managementContent: TypeManagementContent;
}) {
  // 회원가입 진행도를 표시하기 위한 상태
  const [step, setStep] = useState(FIRST_STEP);

  // 폼 제출 함수
  const postUserForm = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.registerForm}>
      {/* 가입하기 버튼 */}
      <div>
        <p>모두가 기다리고 있어요.</p>
        <p>가입하셔서 여러분의 캐릭터와 굿즈를 알려주세요 !</p>
      </div>
      <button>가입할래요.</button>
      {/* 진행도 */}
      <div className={styles.registerStep}>
        <div className={styles.stepBar}>
          <div
            className={`${
              step == FIRST_STEP
                ? styles.firstStep
                : step == SECOND_STEP
                ? styles.secondStep
                : styles.finishStep
            } ${styles.stepPointer}`}
          ></div>
        </div>
        <ul className={styles.stepBox}>
          <li>약관동의</li>
          <GrFormNext />
          <li>정보입력</li>
          <GrFormNext />
          <li>가입완료</li>
        </ul>
      </div>
      {/* 약관동의 체크 리스트 */}
      <div className={styles.checkContainer}>
        <ul className={styles.checkList}>
          <li className={styles.allCheck}>
            <input type="checkbox" />
            <span className={styles.question}>전체 동의합니다.</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className={styles.question}>(필수) 만 14세 이상입니다.</span>
          </li>
          <li>
            <input type="checkbox" />
            <span className={styles.question}>(필수) 이용약관 동의</span>
            <textarea>{managementContent?.termsOfService}</textarea>
          </li>
          <li>
            <input type="checkbox" />
            <span className={styles.question}>
              (필수) 개인정보 수집 및 이용 동의
            </span>
            <textarea>
              {managementContent?.personalInformationAgreement}
            </textarea>
          </li>
        </ul>
        <button>동의합니다.</button>
      </div>
      {/* 정보입력 폼 */}
      <form onSubmit={postUserForm}>
        <button type="submit"></button>
      </form>
      {/* 가입완료 메시지 */}
    </div>
  );
}
