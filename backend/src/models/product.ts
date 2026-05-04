import mongoose from 'mongoose';

interface IFile {
    fileName: string,
    originalName: string
}

export interface IProduct {
    title: string,
    image: IFile,
    category: string,
    description: string,
    price: number | null
}

const fileScema = new mongoose.Schema<IFile>({
    fileName: {
        type: String
    },
    originalName: {
        type: String
    },
}, { _id: false })

const productSchema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        unique: true,
        required: [true, 'Поле "title" должно быть заполнено'],
        minlength: [2, 'Минимальная длина поля "title" - 2'],
        maxlength: [30, 'Максимальная длина поля "title" - 30'],
    },
    image: {
        type: fileScema,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: null
    }
}, { versionKey: false })

export default mongoose.model<IProduct>('product', productSchema); 