const Mee6LevelsApi = require('mee6-levels-api')
const mee6 = require('./meesix.js');
const guildId = '830201397974663229'


test('checks if mee6 API is working', () => {
  return Mee6LevelsApi.getLeaderboardPage(guildId)
    .then(leaderboard => {
      const list = leaderboard
      expect(mee6(list)).toBe(true);
    })
    .catch(err => {
      // You might want to fail the test if the promise is rejected
      throw err;
    });
});
