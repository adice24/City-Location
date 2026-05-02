import { Router } from 'express';
import * as ListingController from '../controllers/listing.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// NORMAL user can GET their own or create new
// CITY_ADMIN can GET their city and moderate
// SUPER_ADMIN can do everything
router.get('/', authenticate, ListingController.getListings);
router.post('/', authenticate, ListingController.createListing);
router.patch('/:id/status', authenticate, authorize(['SUPER_ADMIN', 'CITY_ADMIN']), ListingController.updateListingStatus);
router.delete('/:id', authenticate, ListingController.deleteListing);

export default router;
