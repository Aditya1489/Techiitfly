export interface ClientLogo {
  name: string;
  logo: string;
  url?: string;
}

// Client logos: only real logos provided by client.
// Hide the client strip if fewer than 2 logos are provided.
export const CLIENT_LOGOS: ClientLogo[] = [];

export const hasClientLogos: boolean = CLIENT_LOGOS.length >= 2;
