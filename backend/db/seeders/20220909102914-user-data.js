const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const testPass = process.env.TEST_USER_PASSWORD ?? '123';

    const hash = await bcrypt.hash(testPass, 10);

    const testUser = {
      login: 'admin',
      password: hash,
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert('Users', [testUser]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
