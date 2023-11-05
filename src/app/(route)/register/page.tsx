import styles from './page.module.scss';

import RegisterForm from './_components/RegisterForm';
import { getManagement } from '@/utils/api/Fetcher';

export default async function Register() {
  const response = await getManagement();
  const managementData = response.data;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <RegisterForm managementContent={managementData} />
    </div>
  );
}
