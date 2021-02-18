import axios, { AxiosInstance } from 'axios';

interface LNBitsConfig {
  adminKey: string;
  invoiceReadKey: string;
}

interface Links {
  comment_chars: number;
  currency: string;
  description: string;
  id: number;
  lnurl: string;
  max: number;
  min: number;
  served_meta: number;
  served_pr: number;
  success_text: string;
  success_url: string;
  wallet: string;
  webhook_url: string;
}

export class LNBitsPaylinkClass {
  private adminKey = '';
  private invoiceReadKey = '';
  private api: AxiosInstance;

  constructor(params: LNBitsConfig) {
    this.adminKey = params.adminKey;
    this.invoiceReadKey = params.invoiceReadKey;
    this.api = axios.create({
      baseURL: 'https://lnbits.com/lnurlp/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getLinks = async (): Promise<Links[]> => {
    this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey;
    return await this.api
      .get(`/links`)
      .then((res: { data: Links[] }) => {
        return res.data;
      })
      .catch((err: { response: { data: { message: string } } }) => {
        console.log(err.response.data);
        throw err.response.data.message;
      });
  };

  getLink = async (params: { pay_id: string }): Promise<Links> => {
    this.api.defaults.headers['X-Api-Key'] = this.invoiceReadKey;
    return await this.api
      .get(`/links/${params.pay_id}`)
      .then((res: { data: Links }) => {
        return res.data;
      })
      .catch((err: { response: { data: { message: string } } }) => {
        console.log(err.response.data);
        throw err.response.data.message;
      });
  };

  createPayLink = async (params: {
    description: string;
    amount: number;
    comment_chars: number;
    min: number;
    max: number;
  }): Promise<Links> => {
    this.api.defaults.headers['X-Api-Key'] = this.adminKey;
    return await this.api
      .post(`/links`, params)
      .then((res: { data: Links }) => {
        return res.data;
      })
      .catch((err: { response: { data: { message: string } } }) => {
        console.log(err.response.data);
        throw err.response.data.message;
      });
  };

  updatePayLink = async (params: {
    pay_id: number;
    description: string;
    amount: number;
    comment_chars: number;
    min: number;
    max: number;
  }): Promise<Links> => {
    this.api.defaults.headers['X-Api-Key'] = this.adminKey;
    return await this.api
      .put(`/links/${params.pay_id}`, params)
      .then((res: { data: Links }) => {
        return res.data;
      })
      .catch((err: { response: { data: { message: string } } }) => {
        console.log(err.response.data);
        throw err.response.data.message;
      });
  };

  deletePayLink = async (params: { pay_id: number }): Promise<boolean> => {
    this.api.defaults.headers['X-Api-Key'] = this.adminKey;
    return await this.api
      .delete(`/links/${params.pay_id}`)
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  };
}
