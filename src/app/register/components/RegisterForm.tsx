'use client';

import styles from './RegisterForm.module.scss';
import { GrFormNext } from 'react-icons/gr';
import { GrFormDown } from 'react-icons/gr';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TypeManagementContent } from '@/types/interfaces/management.interface';
import useDebounce from '@/utils/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import encodeFileToBase64 from '@/utils/encodeFileToBase64';
import { postUser } from '@/utils/api/Fetcher';

const FIRST_STEP = 1;
const SECOND_STEP = 2;
const FINISH_STEP = 3;
const DEBOUNCE_DELAY = 500;
const LIMITS_FILE_SIZE = 5 * 1024 * 1024;

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
    return isChecked.checkbox1 && isChecked.checkbox2 && isChecked.checkbox3;
  };
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
  };

  // 정보입력
  // check 상태들은 유효성을 검사하는 상태이며, false : 통과 X, true : 통과 O 의 의미를 가진다.
  const [email, setEmail] = useState('');
  const [checkEmail, setCheckEmail] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassowrd] = useState<boolean | null>(null);
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [checkConfirmedPassword, setCheckConfirmedPassword] = useState<
    boolean | null
  >(null);
  const [name, setName] = useState('');
  const [checkName, setCheckName] = useState<boolean | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [introduction, setInstroduction] = useState('');
  const [tags, setTags] = useState<string[]>(new Array(5).fill(''));

  // 유효성 검사
  // 커스텀 훅으로 리팩토링 필요할 듯 함 (추상화)

  //--email
  const debounceEmailCheck = useDebounce((email: string) => {
    setCheckEmail(() => {
      const regex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regex.test(email);
    });
  }, DEBOUNCE_DELAY);
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    debounceEmailCheck(event.target.value);
  };
  //--password
  const debouncePasswordCheck = useDebounce((password: string) => {
    setCheckPassowrd(() => {
      const regex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
      return regex.test(password);
    });
  }, DEBOUNCE_DELAY);
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    debouncePasswordCheck(event.target.value);
  };
  //--confirmPassword
  const debounceConfirmedPasswordCheck = useDebounce(
    (confirmedPassword: string) => {
      setCheckConfirmedPassword(() => {
        return confirmedPassword === password;
      });
    },
    DEBOUNCE_DELAY
  );
  const handleChangeConfirmedPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmedPassword(event.target.value);
    debounceConfirmedPasswordCheck(event.target.value);
  };
  //--name
  const debounceNameCheck = useDebounce((name: string) => {
    setCheckName(() => {
      const regex = /^[가-힣a-zA-Z0-9]{2,8}$/;
      return regex.test(name);
    });
  }, DEBOUNCE_DELAY);
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    debounceNameCheck(event.target.value);
  };
  //--introduction
  const handleChangeIntroduction = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstroduction(event.target.value);
  };
  //--tags
  const handleChangeTags = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setTags((prev) => {
      const newTags = [...prev];
      newTags[index] = event.target.value;
      return newTags;
    });
  };

  // 프로필 업로드
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageRef = useRef<HTMLImageElement | null>(null);
  const inputProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    // 이미지 프리뷰
    if(!e.target.files) return;
    const file = e.target.files[0] || '';

    // 파일 용량 검사
    if(file.size > LIMITS_FILE_SIZE) {
      alert(`이미지는 ${LIMITS_FILE_SIZE / 1024 ** 2}MB 이하여야 합니다.`);
      return;
    }

    // File 객체를 base64로 인코딩해주는 유틸 사용
    if(profileImageRef.current)
      profileImageRef.current.src = await encodeFileToBase64(file) || '';

  }

  // 폼 제출 함수
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 유효성 검사 체크
    if(checkEmail === true &&
      checkPassword === true &&
      checkConfirmedPassword === true &&
      checkName === true) {
      // 폼 데이터 정의
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);

      try {
        // API 요청
        await postUser(formData);
      } catch(error) {
        console.error(error);
      }
      
      setStep(FINISH_STEP);
    }
  };

  // 로그인 이동 버튼
  const router = useRouter(); // 라우터
  const goLoginPage = () => {
    router.push('/login');
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
                checked={isAllcheck()}
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
                  value={managementContent?.termsOfService}
                  readOnly={true}
                />
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
                <textarea
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  value={managementContent?.personalInformationAgreement}
                  readOnly={true}
                />
              )}
            </li>
          </ul>
          <button
            className={styles.agreeButton}
            disabled={!isAllcheck()}
            onClick={goEnterInformationStep}
          >
            동의합니다.
          </button>
        </div>
      )}

      {/* 정보입력 폼 */}
      {step == SECOND_STEP && (
        <form
          className={styles.informationForm}
          onSubmit={handleFormSubmit}                           
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // 엔터 키에 대한 기본 동작을 막음
            }
          }}
        >
          <p className={styles.titleLine}>
            <span>필수사항 *</span>
          </p>
          <p>이메일</p>
          <div
            className={`${styles.inputBox} ${
              checkEmail !== null
                ? checkEmail
                  ? styles.greenOutline
                  : styles.redOutline
                : ''
            }`}
          >
            <input
              className={styles.input}
              placeholder="@를 포함한 이메일 주소를 입력해주세요."
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          {checkEmail !== null && !checkEmail && (
            <p className={styles.notification}>
              올바른 이메일 주소 형태가 아니에요.
            </p>
          )}
          <p>비밀번호</p>
          <div
            className={`${styles.inputBox} ${
              checkPassword !== null
                ? checkPassword
                  ? styles.greenOutline
                  : styles.redOutline
                : ''
            }`}
          >
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 입력해주세요. (영문+숫자+특수문자 8자 이상)"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
          {checkPassword !== null && !checkPassword && (
            <p className={styles.notification}>
              비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.
            </p>
          )}
          <div
            className={`${styles.inputBox} ${
              checkConfirmedPassword !== null
                ? checkConfirmedPassword
                  ? styles.greenOutline
                  : styles.redOutline
                : ''
            }`}
          >
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 다시 입력해주세요."
              value={confirmedPassword}
              onChange={handleChangeConfirmedPassword}
            />
          </div>
          {checkConfirmedPassword !== null && !checkConfirmedPassword && (
            <p className={styles.notification}>
              위에서 입력한 비밀번호와 같도록 입력해주세요.
            </p>
          )}
          <p>닉네임</p>
          <div
            className={`${styles.inputBox} ${
              checkName !== null
                ? checkName
                  ? styles.greenOutline
                  : styles.redOutline
                : ''
            }`}
          >
            <input
              className={styles.input}
              placeholder="닉네임을 정해주세요. (8자 이내)"
              value={name}
              onChange={handleChangeName}
            />
          </div>
          {checkName !== null && !checkName && (
            <p className={styles.notification}>
              닉네임은 두 글자 이상, 한글, 숫자, 영어를 포함한 조합 8자 이내만
              가능합니다.
            </p>
          )}
          <p className={styles.titleLine}>
            <span>선택사항</span>
          </p>
          <p>프로필이미지</p>
          <div className={styles.profileBox}>
            <div className={styles.profileImageBox}>
              <img className={styles.profileImage} ref={profileImageRef}/>
            </div>
            <button
              className={styles.profileUploadButton}
              type="button"
              onClick={() => {
                profileInputRef.current?.click();
              }}
            >
              프로필 업로드
              <input
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                ref={profileInputRef}
                onChange={inputProfileImage}
                style={{ display: 'none' }}
              />
            </button>
          </div>
          <p>소개글 (100자 이내)</p>
          <div className={styles.inputBox}>
            <input
              className={styles.input}
              maxLength={100}
              placeholder="여러분을 소개해주세요. (100글자 이내)"
              value={introduction}
              onChange={handleChangeIntroduction}
            />
          </div>
          <p>선호 태그 (5개 이내, 각 12자 이내)</p>
          <div className={styles.tagsBox}>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                maxLength={10}
                placeholder="태그"
                value={tags[0]}
                onChange={(event) => {
                  handleChangeTags(event, 0);
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                maxLength={10}
                placeholder="태그"
                value={tags[1]}
                onChange={(event) => {
                  handleChangeTags(event, 1);
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                maxLength={10}
                placeholder="태그"
                value={tags[2]}
                onChange={(event) => {
                  handleChangeTags(event, 2);
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                maxLength={10}
                placeholder="태그"
                value={tags[3]}
                onChange={(event) => {
                  handleChangeTags(event, 3);
                }}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                maxLength={10}
                placeholder="태그"
                value={tags[4]}
                onChange={(event) => {
                  handleChangeTags(event, 4);
                }}
              />
            </div>
          </div>
          <button className={styles.registerButton} type="submit">
            가입할래요.
          </button>
        </form>
      )}

      {/* 가입완료 메시지 */}
      {step == FINISH_STEP && (
        <div>
          <div className={styles.finishContainer}>
            <div className={styles.finishComment}>
              <div className={styles.airplaneBox}>
                <Image
                  className={styles.congratsAirplane}
                  src="/image/paper_airplane_congrats.png"
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  sizes="100%"
                  alt="둥둥 떠다니는 비행기"
                />
              </div>
              <div className={styles.commentBox}>
                <p>환영합니다 !</p>
                <p>
                  <span>회원가입</span>이 완료되었습니다.
                </p>
                <p>이제 여러분의 캐릭터와 굿즈를 알릴 수 있어요 !</p>
              </div>
            </div>
            <button className={styles.loginButton} onClick={goLoginPage}>
              로그인하러 갈래요.
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
