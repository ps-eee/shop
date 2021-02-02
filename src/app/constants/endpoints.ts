import { ENVIRONMENT } from 'src/environments/environment';

const domain: string = ENVIRONMENT.isProduction ? 'https://ps-eee-functions.azurewebsites.net/api/' : 'http://localhost:7071/api/';

export const ENDPOINTS: {
  GET_TREATMENT_STATISTIC: string;
  POST_EXPOSURE: string;
} = {
  GET_TREATMENT_STATISTIC: domain + 'getTreatmentStatistic',
  POST_EXPOSURE: domain + 'postExposure'
};
