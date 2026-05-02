import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getListings: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createListing: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateListingStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteListing: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=listing.controller.d.ts.map