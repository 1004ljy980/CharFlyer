import bcrypt from 'bcryptjs';

export async function generatePassword(saltRounds: number, password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  hashedPassword: string,
  password: string
) {
  return await bcrypt.compare(hashedPassword, password);
}
