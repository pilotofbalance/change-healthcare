import { Header } from "swagger-jsdoc";
import { TransportStreamOptions } from "./transport.options.interface";
  
  export interface HttpTransportOptions extends TransportStreamOptions{
    url: string;
    hostname?: string;
    path?: string;
    protocol?: string;
    method?: 'POST' | 'PUT' | 'GET' | 'DELETE';
    port?: string;
    headers?: Header
  }