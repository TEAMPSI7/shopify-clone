import User, { IUser } from '../models/user.model';
import { IProductRepository } from '../repositories/Product/product.repository';
import UserRepository from '../repositories/User/mongodb.user.repository';
import { IUserRepository } from '../repositories/User/user.repository.interface';
import bcrypt from 'bcrypt';
import AppError from '../utils/AppError';

class UserService {
    
    private userRepository: IUserRepository;
    private productRepository: IProductRepository;
    constructor(userRepository: IUserRepository, productRepository: IProductRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }
    
    public async createUser(username: string, name: string, password: string): Promise<IUser | null> {
        const passwordHash = await bcrypt.hash(password, 10);
        const userData = { username, name, passwordHash };
        return await this.userRepository.createUser(userData);
    }

    public async getAllUsers(): Promise<IUser[] | null> {
        return await this.userRepository.findAllUsers();
    }

    public async addToCart(userId: string, productId: string, quantity: number): Promise<IUser | null> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        await this.userRepository.addOrUpdateCart(userId, productId, quantity);
        return await this.userRepository.findById(userId); 
    }

    public async removeFromCart(userId: string, productId: string): Promise<IUser | null> {
        const product = await this.productRepository.findById(productId)
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        await this.userRepository.removeFromCart(userId, productId);
        return await this.userRepository.findById(userId); 
    }

    public async clearCart(userId: string): Promise<IUser | null> {
        await this.userRepository.clearCart(userId);
        return await this.userRepository.findById(userId);  
    }
}

export default UserService;