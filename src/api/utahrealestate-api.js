import {create} from 'apisauce';
import {UtahRealEstate_CONFIG} from "../core/config";

const api = create({
  baseURL: UtahRealEstate_CONFIG.BaseURL,
  headers: {
    Authorization: UtahRealEstate_CONFIG.Authorization,
  }
})

export const fetchMlsInfoByMlsId = async (mlsId) => {
  return new Promise(async resolve => {
    api.get(`${UtahRealEstate_CONFIG.Member}?$filter=(MemberMlsId eq '${mlsId}')`)
      .then(response => {
        const { data, ok } = response;
        console.log('fetch-mls', data);
        if (ok && data.value) {
          const mlsValue = data.value[0];
          resolve({
            success: true,
            data: {
              mlsSubscription: mlsValue.MemberType,
              mlsId: mlsValue.MemberMlsId,
              firstName: mlsValue.MemberFirstName,
              lastName: mlsValue.MemberLastName,
              officeName: mlsValue.OfficeName,
            }
          })
        } else {
          resolve({
            success: false,
            error: 'data error'
          })
        }
      })
      .catch(e => {
        console.log('fetch-mls-ex:', e.message)
        resolve({
          success: false,
          error: e.message
        })
      })
  });
}
