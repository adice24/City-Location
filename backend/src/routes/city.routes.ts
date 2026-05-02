import { Router } from 'express';
import * as CityController from '../controllers/city.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

router.get('/', CityController.getCities);
router.post('/', authenticate, authorize(['SUPER_ADMIN']), CityController.createCity);
router.put('/:id', authenticate, authorize(['SUPER_ADMIN', 'CITY_ADMIN']), CityController.updateCity);

export default router;
