import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityControle from '../controllers/ProviderMonthAvailabilityControle';
import ProviderDayAvailabilityControle from '../controllers/ProviderDayAvailabilityControle';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityControle = new ProviderMonthAvailabilityControle();
const providerDayAvailabilityControle = new ProviderDayAvailabilityControle();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/month-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityControle.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityControle.index,
);

export default providersRouter;
