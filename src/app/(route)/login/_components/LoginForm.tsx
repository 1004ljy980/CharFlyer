'use client';

import styles from './LoginForm.module.scss';

export default function LoginForm() {
  return (
    <form className={styles.loginForm}>
      <div className={styles.inputBox}>
        <input
          className={styles.input}
          name="id"
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
