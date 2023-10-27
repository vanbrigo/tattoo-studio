export { }

export interface TokenDecoded {
  id: number,
  role: string
}

declare global {
    namespace Express {
        export interface Request {
            token: TokenDecoded
        }
    }
}