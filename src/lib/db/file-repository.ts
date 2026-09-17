import fs from "fs";
import path from "path";
import { IRegistrationRepository } from "./repository";
import { Registration, CreateRegistrationInput, RegistrationStatus, PaymentDetails } from "./types";

export class FileRegistrationRepository implements IRegistrationRepository {
  private dataFilePath: string;

  constructor() {
    const dataDir = path.join(process.cwd(), ".data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    this.dataFilePath = path.join(dataDir, "registrations.json");
    if (!fs.existsSync(this.dataFilePath)) {
      fs.writeFileSync(this.dataFilePath, JSON.stringify([], null, 2), "utf-8");
    }
  }

  private readAll(): Registration[] {
    try {
      if (!fs.existsSync(this.dataFilePath)) return [];
      const content = fs.readFileSync(this.dataFilePath, "utf-8");
      return JSON.parse(content) as Registration[];
    } catch (err) {
      console.error("[FileRegistrationRepository] Failed to read data:", err);
      return [];
    }
  }

  private writeAll(data: Registration[]): void {
    try {
      const tempPath = `${this.dataFilePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
      fs.renameSync(tempPath, this.dataFilePath);
    } catch (err) {
      console.error("[FileRegistrationRepository] Failed to write data:", err);
      throw err;
    }
  }

  private generateId(): string {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `EDO-${randomDigits}`;
  }

  async create(input: CreateRegistrationInput, payeeOrderId: string): Promise<Registration> {
    const all = this.readAll();
    
    // Ensure unique ID
    let newId = this.generateId();
    while (all.some((r) => r.id === newId)) {
      newId = this.generateId();
    }

    const registration: Registration = {
      id: newId,
      teamName: input.teamName.trim(),
      track: input.track,
      members: input.members.map((m, idx) => ({
        ...m,
        isLeader: idx === 0,
      })),
      status: "pending",
      payeeOrderId,
      registeredAt: new Date().toISOString(),
    };

    all.push(registration);
    this.writeAll(all);
    return registration;
  }

  async findById(id: string): Promise<Registration | null> {
    const all = this.readAll();
    const item = all.find((r) => r.id.toLowerCase() === id.trim().toLowerCase());
    return item || null;
  }

  async findByPayeeOrderId(orderId: string): Promise<Registration | null> {
    const all = this.readAll();
    const item = all.find((r) => r.payeeOrderId === orderId.trim());
    return item || null;
  }

  async findByEmail(email: string): Promise<Registration | null> {
    const all = this.readAll();
    const targetEmail = email.trim().toLowerCase();
    const item = all.find((r) =>
      r.members.some((m) => m.email.toLowerCase() === targetEmail)
    );
    return item || null;
  }

  async findByTeamName(teamName: string): Promise<Registration | null> {
    const all = this.readAll();
    const targetName = teamName.trim().toLowerCase();
    const item = all.find((r) => r.teamName.toLowerCase() === targetName);
    return item || null;
  }

  async updateStatus(
    id: string,
    status: RegistrationStatus,
    paymentDetails?: PaymentDetails
  ): Promise<Registration> {
    const all = this.readAll();
    const index = all.findIndex((r) => r.id.toLowerCase() === id.trim().toLowerCase());
    if (index === -1) {
      throw new Error(`Registration not found with ID: ${id}`);
    }

    const existing = all[index];
    const updated: Registration = {
      ...existing,
      status,
      paidAt: status === "paid" ? new Date().toISOString() : existing.paidAt,
      paymentDetails: paymentDetails || existing.paymentDetails,
    };

    all[index] = updated;
    this.writeAll(all);
    return updated;
  }

  async listAll(): Promise<Registration[]> {
    return this.readAll();
  }
}
