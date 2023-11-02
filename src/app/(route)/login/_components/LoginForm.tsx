'use client';

import styles from './LoginForm.module.scss';

import * as Fetcher from '@/utils/api/Fetcher';

export default function LoginForm() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    if (!formData.get('email') || !formData.get('password')) {
      alert('이메일과 비밀번호를 전부 입력해 주세요.');
      return;
    }

    try {
      const response = await Fetcher.postLogin(formData);

      if (response.status === 200) {
        alert('로그인 정보 확인');
      } else if (response.status === 500) {
        alert(response.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleLogin}>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          name="email"
          placeholder="이메일을 입력해 주세요."
          type="email"
        />
      </div>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          name="password"
          placeholder="비밀번호 입력"
          type="password"
        />
      </div>
      <button className={styles.loginButton} type="submit">
        <span>로그인 하기</span>
      </button>
    </form>
  );
}
