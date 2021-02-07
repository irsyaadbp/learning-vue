export default {
  async contactCoach(context, payload) {
    const newReq = {
      userEmail: payload.email,
      message: payload.message
    };

    const response = await fetch(
      `https://find-a-coach-26f5b-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newReq)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to send request');
      throw error;
    }

    newReq.id = responseData.name;
    newReq.coachId = payload.coachId;

    context.commit('addRequest', newReq);
  },
  async getRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://find-a-coach-26f5b-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch request'
      );
      throw error;
    }

    const requests = [];
    for (const key in responseData) {
      const req = {
        id: key,
        coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };

      requests.push(req);
    }
    context.commit('setRequests', requests);
  }
};
