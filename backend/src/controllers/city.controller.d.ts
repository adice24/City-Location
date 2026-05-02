import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getCities: (req: Request, res: Response) => Promise<void>;
export declare const createCity: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCity: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=city.controller.d.ts.map