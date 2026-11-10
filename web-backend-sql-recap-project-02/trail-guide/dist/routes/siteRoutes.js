import { Router } from 'express';
import * as site from '../controllers/siteController.js';
const router = Router();
router.get('/', site.home);
router.get('/trails', site.trailList);
router.get('/trails/:id', site.trailDetail);
router.get('/regions/:id', site.regionDetail);
export default router;
//# sourceMappingURL=siteRoutes.js.map