import cors from 'cors';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
  static as static_,
} from 'express';
import { PORT } from './config';
import { join } from 'path';
import { EmployeeRouter } from './routers/employee.router';
import { OutletRouter } from './routers/outlet.router';
import { PickupOrderRouter } from './routers/pickupOrder.router';
import { OrderRouter } from './routers/order.router';
import { LaundryItemRouter } from './routers/laundryItem.router';
import { AuthRouter } from './routers/auth.router';
import { DeliveryOrderRouter } from './routers/deliveryOrder.router';
import { UserRouter } from './routers/user.router';
import { OrderWorkerRouter } from './routers/orderWorker.router';
import { OrderItemRouter } from './routers/orderItem.router';
import { AddressRouter } from './routers/address.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/assets', static_(join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const employeeRouter = new EmployeeRouter();
    const outletRouter = new OutletRouter();
    const pickupOrderRouter = new PickupOrderRouter();
    const orderRouter = new OrderRouter();
    const laundryItemRouter = new LaundryItemRouter();
    const authRouter = new AuthRouter();
    const deliveryOrderRouter = new DeliveryOrderRouter();
    const userRouter = new UserRouter();
    const orderWorkerRouter = new OrderWorkerRouter();
    const orderItemRouter = new OrderItemRouter();
    const addressRouter = new AddressRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student ! ${PORT}`);
    });

    this.app.use('/api/employees', employeeRouter.getRouter());
    this.app.use('/api/outlets', outletRouter.getRouter());
    this.app.use('/api/pickup-orders', pickupOrderRouter.getRouter());
    this.app.use('/api/orders', orderRouter.getRouter());
    this.app.use('/api/laundry-items', laundryItemRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/delivery-orders', deliveryOrderRouter.getRouter());
    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/order-workers', orderWorkerRouter.getRouter());
    this.app.use('/api/order-items', orderItemRouter.getRouter());
    this.app.use('/api/address', addressRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
