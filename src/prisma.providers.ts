import { PrismaClient } from '@prisma/client'
import { Provider} from '@nestjs/common';

export const PrismaProvider: Provider = {
  provide: PrismaClient,
  useValue: new PrismaClient()
};