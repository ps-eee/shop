import { ENVIRONMENT } from 'src/environments/environment';

const domain: string = ENVIRONMENT.isProduction ? 'https://ps-eee-functions.azurewebsites.net/api/' : 'http://localhost:7071/api/';

export const ENDPOINTS: {
  getTreatment: string;
} = {
  getTreatment: domain + 'getTreatment'
};
