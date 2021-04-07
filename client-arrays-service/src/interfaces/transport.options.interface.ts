export interface TransportStreamOptions {
    level?: string;
    silent?: boolean;
    handleExceptions?: boolean;
  
    log?(info: any, next: () => void): any;
    logv?(info: any, next: () => void): any;
    close?(): void;
  }