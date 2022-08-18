import {
  CommissionContact,
  CommissionMeta,
  CommissionStatus,
} from '@commission-site/commission-shared';

export class CommissionClient {
  constructor(private baseUrl: string) {}

  async sendContactMessage(contact: CommissionContact): Promise<string> {
    return fetch(`${this.baseUrl}/contact`, {
      method: 'POST',
      body: JSON.stringify(contact),
    })
      .then(this.parseOrThrow)
      .then((data) => data.id);
  }

  async getCommissionMeta(): Promise<CommissionMeta> {
    return fetch(`${this.baseUrl}/commission-meta`).then(this.parseOrThrow);
  }

  async getCommissionStatus(id: string): Promise<CommissionStatus> {
    return fetch(`${this.baseUrl}/commission-status/${id}`).then(
      this.parseOrThrow
    );
  }

  private parseOrThrow(response: Response) {
    if (response.status !== 200) {
      throw new Error();
    }

    return response.json();
  }
}
