import { IRegistrationRepository } from "./repository";
import { Registration, CreateRegistrationInput, RegistrationStatus, PaymentDetails } from "./types";

interface EdobaseConfig {
  apiUrl: string;
  apiKey: string;
  projectId: string;
}

export class EdobaseRegistrationRepository implements IRegistrationRepository {
  private config: EdobaseConfig;

  constructor(config: EdobaseConfig) {
    this.config = config;
  }

  private get headers(): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "X-Edobase-Project": this.config.projectId,
      "Authorization": `Bearer ${this.config.apiKey}`,
    };
  }

  private generateId(): string {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `EDO-${randomDigits}`;
  }

  async create(input: CreateRegistrationInput, payeeOrderId: string): Promise<Registration> {
    const id = this.generateId();
    const registration: Registration = {
      id,
      teamName: input.teamName.trim(),
      track: input.track,
      members: input.members.map((m, idx) => ({ ...m, isLeader: idx === 0 })),
      status: "pending",
      payeeOrderId,
      registeredAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${this.config.apiUrl}/collections/registrations`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(registration),
      });

      if (!res.ok) {
        throw new Error(`Edobase API error: ${res.status} ${res.statusText}`);
      }

      return registration;
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] create error:", err);
      throw err;
    }
  }

  async findById(id: string): Promise<Registration | null> {
    try {
      const res = await fetch(`${this.config.apiUrl}/collections/registrations/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: this.headers,
      });

      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Edobase API error: ${res.status}`);

      return await res.json();
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] findById error:", err);
      return null;
    }
  }

  async findByPayeeOrderId(orderId: string): Promise<Registration | null> {
    try {
      const res = await fetch(
        `${this.config.apiUrl}/collections/registrations?filter=payeeOrderId:eq:${encodeURIComponent(orderId)}`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] findByPayeeOrderId error:", err);
      return null;
    }
  }

  async findByEmail(email: string): Promise<Registration | null> {
    try {
      const res = await fetch(
        `${this.config.apiUrl}/collections/registrations?search=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] findByEmail error:", err);
      return null;
    }
  }

  async findByTeamName(teamName: string): Promise<Registration | null> {
    try {
      const res = await fetch(
        `${this.config.apiUrl}/collections/registrations?filter=teamName:eq:${encodeURIComponent(teamName)}`,
        {
          method: "GET",
          headers: this.headers,
        }
      );

      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] findByTeamName error:", err);
      return null;
    }
  }

  async updateStatus(
    id: string,
    status: RegistrationStatus,
    paymentDetails?: PaymentDetails
  ): Promise<Registration> {
    try {
      const patchData: Partial<Registration> = {
        status,
        ...(status === "paid" ? { paidAt: new Date().toISOString() } : {}),
        ...(paymentDetails ? { paymentDetails } : {}),
      };

      const res = await fetch(`${this.config.apiUrl}/collections/registrations/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify(patchData),
      });

      if (!res.ok) throw new Error(`Edobase API error on update: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] updateStatus error:", err);
      throw err;
    }
  }

  async listAll(): Promise<Registration[]> {
    try {
      const res = await fetch(`${this.config.apiUrl}/collections/registrations`, {
        method: "GET",
        headers: this.headers,
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error("[EdobaseRegistrationRepository] listAll error:", err);
      return [];
    }
  }
}
