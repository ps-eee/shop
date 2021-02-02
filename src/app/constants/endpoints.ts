import { ENVIRONMENT } from 'src/environments/environment';

const domain: string = ENVIRONMENT.isProduction ? 'https://ps-eee-functions.azurewebsites.net/api/' : 'http://localhost:7071/api/';

export const ENDPOINTS: {
  GET_TREATMENT_STATISTIC: string;
  MARK_EXPOSURE_SUCCESSFUL: string;
  POST_EXPOSURE: string;
} = {
  GET_TREATMENT_STATISTIC: domain + 'getTreatmentStatistic',
  MARK_EXPOSURE_SUCCESSFUL: domain + 'markExposureSuccessful',
  POST_EXPOSURE: domain + 'postExposure'
};
