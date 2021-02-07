export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coachData = {
      ...payload
      //   id: new Date().toISOString()
    };
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-a-coach-26f5b-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit('registerCoach', { ...responseData, id: userId });
  },
  async getCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://find-a-coach-26f5b-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
