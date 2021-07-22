import {create} from 'apisauce';
import {UtahRealEstate_CONFIG} from "../core/config";

const api = create({
  baseURL: UtahRealEstate_CONFIG.BaseURL,
  headers: {
    Authorization: UtahRealEstate_CONFIG.Authorization,
  }
})

export const fetchMlsInfoByMlsId = async (mlsId) => {
  api.get(`${UtahRealEstate_CONFIG.Member}?$filter=(MemberMlsId eq '${mlsId}')`)
    .then(response => {
      console.log('fetch-mls', response);
      return {
        success: true,
        data: response
      };
    })
    .catch(e => {
      console.log('fetch-mls-ex:', e.message)
      return {
        success: false,
        error: e.message
      }
    })
}