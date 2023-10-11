import styles from './page.module.scss';

import RegisterForm from './components/RegisterForm';
import { getManagement } from '@/utils/api/Fetcher';

export default async function Register() {
  const managementContent = await getManagement();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <RegisterForm managementContent={managementContent} />
    </div>
  );
}
