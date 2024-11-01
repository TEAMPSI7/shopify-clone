import { NextFunction, Request, Response } from 'express';
import PaypalService from '../services/paypal.service';
import { MongoDbOrderRepository } from '../repositories/Order/mongodb.order.repository';
import { MongoDbProductRepository } from '../repositories/Product/mongodb.product.repository';

class PaypalController {
    private paypalService: PaypalService;

    constructor() {
        const mongoDbOrderRepository = new MongoDbOrderRepository();
        const mongoDbProductRepository = new MongoDbProductRepository();
        this.paypalService = new PaypalService(mongoDbOrderRepository, mongoDbProductRepository);
    }

    public createOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId, currency } = req.body;
            const order = await this.paypalService.createOrder(userId, currency);
            console.log("ORDER: ", order);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };

    public captureOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { orderID, userId } = req.body;
            const order = await this.paypalService.captureOrder(orderID, userId);
            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    }
}

export default new PaypalController();
