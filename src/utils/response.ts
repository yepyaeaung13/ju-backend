
export function responseSuccess<T>(data: T, meta: any = {}, message = 'Success') {
  return {
    success: true,
    message,
    data,
    meta,
  };
}

export function responseError(error: any, meta: any = {}, statusCode = 500) {
  return {
    success: false,
    message: error?.message || 'Error',
    error,
    meta,
    statusCode,
  };
}
