import Transport from 'winston-transport';
import { HttpTransportOptions } from '../interfaces/http.transfor.interface';
import { logger } from './logger';

class HttpTransport extends Transport {
    private options: HttpTransportOptions;
    public level: string;

    constructor (options: HttpTransportOptions, level: string) {
        super(options)
        const headers = {
            'Content-Type': 'application/json'
          }
          this.options = options
          this.level = level;
          if (!options.url) throw new Error('HttpStreamTransport: Missing URL')
          const parsedURL = new URL(options.url)
          this.options.hostname = parsedURL.hostname
          this.options.path = parsedURL.pathname
          this.options.protocol = parsedURL.protocol
          this.options.method = 'POST'
          if (typeof parsedURL.port !== 'undefined') this.options.port = parsedURL.port
          this.options.headers = typeof this.options.headers !== 'undefined' ? {...headers, ...this.options.headers} : headers
    }
   
    log (info, callback) {
        setImmediate(() => {
          this.emit('logged', info)
        })
        if(info.level === this.level){
            this.postData(this.options, info)
            .then(callback())
            .catch(error => logger.error(`HttpTransportStream: ${error.message}`))
        }
    }

    postData(options: HttpTransportOptions, data: any) {
        return new Promise((resolve, reject) => {
          const lib = options.protocol.startsWith('https') ? require('https') : require('http')
          const request = lib.request(options, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
              reject(new Error(`Request failed with status code ${response.statusCode}`))
            }
          })
          request.on('error', error => reject(new Error(error.message)))
          request.write(JSON.stringify({log: {data: JSON.parse(data.message), client_timestamp: data.timestamp}}))
          request.end()
        })
    }
  };

  export default HttpTransport;