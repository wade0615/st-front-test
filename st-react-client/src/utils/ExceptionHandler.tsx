const LEVEL = {
  INFO: 'INFO',
  WARRING: 'WARRING',
  ERROR: 'ERROR'
} as const;

interface ExceptionHandleOptions {
  _NAME?: string;
  _NOTICE?: string | null;
}

class ExceptionHandleService {
  private _NAME: string;
  private _NOTICE: string | null;
  public _LEVEL = LEVEL;

  constructor({ _NAME = 'unknown', _NOTICE = null }: ExceptionHandleOptions) {
    this._NAME = _NAME;
    this._NOTICE = _NOTICE;
  }

  logger(level: keyof typeof LEVEL, msg: string) {
    switch (level) {
      case LEVEL.INFO:
        console.info(msg);
        break;
      case LEVEL.WARRING:
        console.warn(msg);
        break;
      case LEVEL.ERROR:
        console.error(msg);
        console.log('=== error', msg);
        break;
      default:
        console.log(msg);
    }
  }

  errorReport(error: unknown, cusMsg: string, level: keyof typeof LEVEL) {
    console.log('=== errorReport');
    console.log('=== error', error);
    console.log('=== cusMsg', cusMsg);
    console.log('=== level', level);

    // api call
    this.logger(
      level,
      `
        >${this._NAME}<
        [NOTICE]: ${this._NOTICE}
        [訊息]: ${cusMsg}
        ${error}
      `
    );
  }
}

export default ExceptionHandleService;
