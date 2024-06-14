import cors from 'cors';
import express, {
  Express,
  NextFunction,
  Request,
  Response,
  json,
  urlencoded,
} from 'express';
import { PORT } from './config';
import { EmployeeRouter } from './routers/employee.router';
import { OutletRouter } from './routers/outlet.router';
import { PickupOrderRouter } from './routers/pickupOrder.router';
import { OrderRouter } from './routers/order.router';
import { LaundryItemRouter } from './routers/laundryItem.router';
import { AuthRouter } from './routers/auth.router';
import { DeliverOrderRouter } from './routers/deliverOrder.router';

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
    const deliverOrderRouter = new DeliverOrderRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use('/api/employee', employeeRouter.getRouter());
    this.app.use('/api/outlet', outletRouter.getRouter());
    this.app.use('/api/pickup-order', pickupOrderRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/laundryitem', laundryItemRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/deliver-order', deliverOrderRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
