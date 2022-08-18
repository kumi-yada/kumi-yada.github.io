import {
  CommissionContact,
  CommissionMeta,
} from '@commission-site/commission-shared';

export class CommissionClient {
  constructor(private baseUrl: string, private token?: string | null) {}

  async sendContactMessage(contact: CommissionContact): Promise<string> {
    return fetch(`${this.baseUrl}/contact`, {
      method: 'POST',
      body: JSON.stringify(contact),
    })
      .then((req) => req.json())
      .then((data) => data.id);
  }

  async getCommissionMeta(): Promise<CommissionMeta> {
    return fetch(`${this.baseUrl}/commission-meta`).then((r) => r.json());
  }

  async postCommissionMeta(meta: CommissionMeta): Promise<Response> {
    return fetch(`${this.baseUrl}/commission-meta`, {
      method: 'POST',
      body: JSON.stringify(meta),
      headers: this.baseHeaders(),
    });
  }

  private baseHeaders() {
    if (!this.token) {
      return undefined;
    }

    return new Headers({
      Authorization: this.token,
    });
  }
}
