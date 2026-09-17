import { Registration, CreateRegistrationInput, RegistrationStatus, PaymentDetails } from "./types";
import { FileRegistrationRepository } from "./file-repository";
import { EdobaseRegistrationRepository } from "./edobase-client";

export interface IRegistrationRepository {
  create(input: CreateRegistrationInput, payeeOrderId: string): Promise<Registration>;
  findById(id: string): Promise<Registration | null>;
  findByPayeeOrderId(orderId: string): Promise<Registration | null>;
  findByEmail(email: string): Promise<Registration | null>;
  findByTeamName(teamName: string): Promise<Registration | null>;
  updateStatus(
    id: string,
    status: RegistrationStatus,
    paymentDetails?: PaymentDetails
  ): Promise<Registration>;
  listAll(): Promise<Registration[]>;
}

// Singleton repository instance
let repositoryInstance: IRegistrationRepository | null = null;

export function getRegistrationRepository(): IRegistrationRepository {
  if (repositoryInstance) {
    return repositoryInstance;
  }

  const edobaseUrl = process.env.EDOBASE_API_URL;
  const edobaseKey = process.env.EDOBASE_API_KEY;

  // If live Edobase credentials are provided, switch to the official Edobase adapter
  if (edobaseUrl && edobaseKey && edobaseKey !== "your_edobase_service_role_key_here") {
    repositoryInstance = new EdobaseRegistrationRepository({
      apiUrl: edobaseUrl,
      apiKey: edobaseKey,
      projectId: process.env.EDOBASE_PROJECT_ID || "edothon_live",
    });
  } else {
    // Default to production-grade persistent file-based JSON repository
    repositoryInstance = new FileRegistrationRepository();
  }

  return repositoryInstance;
}
