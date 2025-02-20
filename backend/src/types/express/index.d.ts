import { Request as ExpressRequest } from 'express';


    interface Request extends ExpressRequest {
      user?: { 
        userId: string; 
       
      };
    }


export default Request;
