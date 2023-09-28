'use client';

import styles from './RegisterForm.module.scss';
import { GrFormNext } from 'react-icons/gr';
import { GrFormDown } from 'react-icons/gr';

import Image from 'next/image';
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
  const [start, setStart] = useState(false);
  const [step, setStep] = useState<number | null>(null);

  // 약관동의 펼치기
  // termsOfService
  const [TOSOpen, setTOSOpen] = useState(false);
  // personalInformationAgreement
  const [PIAOpen, setPIAOpen] = useState(false);

  // 체크박스
  const [isChecked, setIsChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'checkboxAll':
        setIsChecked(() => {
          return isChecked.checkbox1 &&
            isChecked.checkbox2 &&
            isChecked.checkbox3
            ? {
                checkbox1: false,
                checkbox2: false,
                checkbox3: false,
              }
            : {
                checkbox1: true,
                checkbox2: true,
                checkbox3: true,
              };
        });
        break;
      case 'checkbox1':
        setIsChecked(() => {
          const newIsChecked = {
            ...isChecked,
            checkbox1: !isChecked.checkbox1,
          };
          return newIsChecked;
        });
        break;
      case 'checkbox2':
        setIsChecked(() => {
          const newIsChecked = {
            ...isChecked,
            checkbox2: !isChecked.checkbox2,
          };
          return newIsChecked;
        });
        break;
      case 'checkbox3':
        setIsChecked(() => {
          const newIsChecked = {
            ...isChecked,
            checkbox3: !isChecked.checkbox3,
          };
          return newIsChecked;
        });
        break;
    }
  };

  // 가입 시작
  const startRegister = () => {
    setStart(true);
    setStep(FIRST_STEP);
  };
  // 폼 제출 함수
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.registerForm}>
      {/* 가입하기 버튼 */}
      {!start && (
        <div className={styles.startContainer}>
          <div className={styles.letsStartComment}>
            <div className={styles.airplaneBox}>
              <Image
                className={styles.floatingAirplane}
                src="/image/paper_airplane_only.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes="100%"
                alt="둥둥 떠다니는 비행기"
              />
            </div>
            <div className={styles.commentBox}>
              <p>모두가 기다리고 있어요.</p>
              <p>가입하셔서 여러분의 캐릭터와 굿즈를 알려주세요 !</p>
            </div>
          </div>
          <button className={styles.startButton} onClick={startRegister}>
            가입할래요.
          </button>
        </div>
      )}

      {/* 진행도 */}
      {start && (
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
      )}

      {/* 약관동의 체크 리스트 */}
      {step == FIRST_STEP && (
        <div className={styles.checkContainer}>
          <ul className={styles.checkList}>
            <li className={styles.allCheck}>
              <input
                id="checkboxAll"
                type="checkbox"
                checked={
                  isChecked.checkbox1 &&
                  isChecked.checkbox2 &&
                  isChecked.checkbox3
                }
                onChange={handleCheckBoxChange}
              />
              <span className={styles.question}>전체 동의합니다.</span>
            </li>
            <li>
              <input
                id="checkbox1"
                type="checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                checked={isChecked.checkbox1}
                onChange={handleCheckBoxChange}
              />
              <span className={styles.question}>
                (필수) 만 14세 이상입니다.
              </span>
            </li>
            <li
              onClick={() => {
                setTOSOpen((prev) => !prev);
              }}
            >
              <input
                id="checkbox2"
                type="checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                checked={isChecked.checkbox2}
                onChange={handleCheckBoxChange}
              />
              <span className={styles.question}>(필수) 이용약관 동의</span>
              <GrFormDown className={styles.downLogo} />
              {TOSOpen && (
                <textarea
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {managementContent?.termsOfService}
                </textarea>
              )}
            </li>
            <li
              onClick={() => {
                setPIAOpen((prev) => !prev);
              }}
            >
              <input
                id="checkbox3"
                type="checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                checked={isChecked.checkbox3}
                onChange={handleCheckBoxChange}
              />
              <span className={styles.question}>
                (필수) 개인정보 수집 및 이용 동의
              </span>
              <GrFormDown className={styles.downLogo} />
              {PIAOpen && (
                <textarea>
                  {managementContent?.personalInformationAgreement}
                </textarea>
              )}
            </li>
          </ul>
          <button className={styles.agreeButton}>동의합니다.</button>
        </div>
      )}

      {/* 정보입력 폼 */}
      {step == SECOND_STEP && (
        <form onSubmit={handleFormSubmit}>
          <button type="submit"></button>
        </form>
      )}

      {/* 가입완료 메시지 */}
      {step == FINISH_STEP && <></>}
    </div>
  );
}
