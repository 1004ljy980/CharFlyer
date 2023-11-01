import styles from './page.module.scss';

import LoginForm from './_components/LoginForm';
import Link from 'next/link';
import ROUTES from '@/constants/Routes';

export default async function Login() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>로그인</h2>
      <div className={styles.loginFormContainer}>
        <LoginForm />
      </div>
      <div className={styles.registerButtonContainer}>
        <span className={styles.registerTitle}>아직 회원이 아니신가요 ?</span>
        <div className={styles.registerButtonContainer}>
          <Link
            className={styles.emailRegisterButtonBox}
            href={ROUTES.REGISTER}
          >
            <span>@</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
