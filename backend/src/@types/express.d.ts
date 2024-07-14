//  declarando o tipo do request do express para o userId do usuário logado no jwt
declare namespace Express {
  export interface Request {
    userId: string;
  }
}
