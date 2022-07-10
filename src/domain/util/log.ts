export const log = (...message: any[]) => {
  if (process.env['REACT_APP_LOG_MODE'] === 'TEST') console.log(...message);
};
