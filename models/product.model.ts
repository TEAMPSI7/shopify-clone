import mongoose, { Schema, Document } from "mongoose";

export interface IProductVariation {
  variationId: string; 
  variationName: string;  
  size?: string;          
  color?: string;         
  price: number;          
  discountRate?: number;  
  productImage?: Buffer;         
  stock: number;          
}

interface IProduct extends Document {
  name: string;
  rating: number; 
  numOfReviews: number;
  productImage: Buffer;   
  basePrice: number;
  variations: IProductVariation[];  
  imagesVariation?: Buffer[];       
  defaultVariationIndex?: number;   
  productId?: string;
}

const productVariationSchema = new mongoose.Schema<IProductVariation>({
  variationName: { type: String, required: true },
  size: { type: String },            
  color: { type: String },          
  price: { type: Number, required: true }, 
  discountRate: { type: Number },     
  productImage: { type: Buffer },            
  stock: { type: Number, required: true, default: 0 }, 
});

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  rating: { type: Number, required: true, default: 0 },
  numOfReviews: { type: Number, required: true, default: 0 },
  productImage: { type: Buffer, required: true }, 
  variations: [productVariationSchema],           
  imagesVariation: [Buffer],                      
  defaultVariationIndex: { type: Number, default: 0 }, 
  basePrice: { type: Number, required: true, default: 0 },
});


productSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.productId = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

productVariationSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.variationId = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Product = mongoose.model<IProduct>('Product', productSchema);
export { IProduct };
export default Product;
