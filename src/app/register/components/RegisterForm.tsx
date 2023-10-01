'use client';

import styles from './RegisterForm.module.scss';
import { GrFormNext } from 'react-icons/gr';
import { GrFormDown } from 'react-icons/gr';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { TypeManagementContent } from '@/types/interfaces/management.interface';
import useDebounce from '@/hooks/useDebounce';

const FIRST_STEP = 1;
const SECOND_STEP = 2;
const FINISH_STEP = 3;

export default function RegisterForm({
  managementContent,
}: {
  managementContent: TypeManagementContent;
}) {
  // 회원가입 진행도를 표시하기 위한 상태
  const [start, setStart] = useState(false);
  const [step, setStep] = useState<number | null>(null);

  // 가입 시작
  const startRegister = () => {
    setStart(true);
    setStep(FIRST_STEP);
  };

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
  const isAllcheck = () => {
    return isChecked.checkbox1 &&
    isChecked.checkbox2 &&
    isChecked.checkbox3
  }
  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'checkboxAll':
        setIsChecked(() => {
          return isAllcheck()
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

  // 정보입력으로 이동
  const goEnterInformationStep = () => {
    setStep(SECOND_STEP);
  }

  // 정보입력
  // check 상태들은 유효성을 검사하는 상태이며, false : 통과 X, true : 통과 O 의 의미를 가진다.
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassowrd] = useState<boolean | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [checkConfirmPassword, setCheckConfirmPassword] = useState<boolean | null>(null);
  const [name, setName] = useState('');
  const [checkName, setCheckName] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState(null);
  const [checkProfileImage, setCheckProfileImage] = useState<boolean | null>(null);
  const [introduction, setInstroduction] = useState('');
  const [tags, setTags] = useState<string[]>(new Array(5)); 

  const debounceEmailCheck = useDebounce((email : string)=> {
    setCheckEmail(()=>{
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regex.test(email);
    })
  }, 500)
  const handleChangeEmail = (event : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    debounceEmailCheck(event.target.value);
    console.log(checkEmail);
  }
  const profileInputRef = useRef<HTMLInputElement | null>(null);

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
                  isAllcheck()
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
          <button className={styles.agreeButton} disabled={!isAllcheck()} onClick={goEnterInformationStep}>동의합니다.</button>
        </div>
      )}

      {/* 정보입력 폼 */}
      {step == SECOND_STEP && (
        <form className={styles.informationForm} onSubmit={handleFormSubmit}>
          <p className={styles.titleLine}><span>필수사항 *</span></p>
          <p>이메일</p>
          <div className={`${styles.inputBox} ${(checkEmail !== null) ? checkEmail ? styles.greenOutline : styles.redOutline : ''}`}><input className={styles.input} placeholder='@를 포함한 이메일 주소를 입력해주세요.' value={email} onChange={handleChangeEmail}/></div>
          <p>비밀번호</p>
          <div className={styles.inputBox}><input className={styles.input} placeholder='비밀번호를 입력해주세요. (영문+숫자+특수문자 8자 이상)' value={email} onChange={()=>{}}/></div>
          <div className={styles.inputBox}><input className={styles.input} placeholder='비밀번호를 다시 입력해주세요.' value={email} onChange={()=>{}}/></div>
          <p>닉네임</p>
          <div className={styles.inputBox}><input className={styles.input} placeholder='닉네임을 정해주세요. (한글 8자, 영문 16자 이내)' value={email} onChange={()=>{}}/></div>
          <p className={styles.titleLine}><span>선택사항</span></p>
          <p>프로필이미지</p>
          <div className={styles.profileBox}>
          <div className={styles.profileImageBox}>
          </div>
          <button className={styles.profileUploadButton} onClick={()=>{profileInputRef.current?.click()}}>
            프로필 업로드
          <input type="file" accept=".jpg,.jpeg,.png" ref={profileInputRef} style={{display : 'none'}} />
          </button>
          </div>
          <p>소개글 (100자 이내)</p>
          <div className={styles.inputBox}><input className={styles.input} maxLength={100} placeholder='여러분을 소개해주세요. (100글자 이내)' value={email} onChange={()=>{}}/></div>
          <p>선호 태그 (5개 이내)</p>
          <div className={styles.tagsBox}>
            <div className={styles.inputBox}><input className={styles.input} maxLength={10} placeholder='태그' value={email} onChange={()=>{}}/></div>
            <div className={styles.inputBox}><input className={styles.input} maxLength={10} placeholder='태그' value={email} onChange={()=>{}}/></div>
            <div className={styles.inputBox}><input className={styles.input} maxLength={10} placeholder='태그' value={email} onChange={()=>{}}/></div>
            <div className={styles.inputBox}><input className={styles.input} maxLength={10} placeholder='태그' value={email} onChange={()=>{}}/></div>
            <div className={styles.inputBox}><input className={styles.input} maxLength={10} placeholder='태그' value={email} onChange={()=>{}}/></div>
          </div>
          <button className={styles.registerButton} type="submit">가입할래요.</button>
        </form>
      )}

      {/* 가입완료 메시지 */}
      {step == FINISH_STEP && <></>}
    </div>
  );
}
