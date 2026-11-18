import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword) => {
  /*
  Hashes a plain text password using bcrypt with a specified number of salt rounds.
  @param {string} plainPassword - The plain text password to be hashed.
  @returns {Promise<string>} - A promise that resolves to the hashed password.
    */
  return await bcrypt.hash(plainPassword, process.env.SALT_ROUNDS | 4);
};

export const comparePassword = async (hashedPassword, plainPassword) => {
  /* 
    Compares a plain text password with a hashed password using bcrypt.
    @param {string} hashedPassword - The hashed password to compare against.
    @param {string} plainPassword - The plain text password to compare.
    @returns {Promise<boolean>} - A promise that resolves to a boolean indicating whether the passwords match.
    */
  return await bcrypt.compare(plainPassword, hashedPassword);
};
