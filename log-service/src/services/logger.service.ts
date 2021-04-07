class LoggerService {
  public async writeLogs(log: any): Promise<void> {
    console.log('LOG - ', log);
  }
}

export default LoggerService;
