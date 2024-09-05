require('dotenv').config();

const PORT: string = process.env.PORT || "3001";

const MONGODB_URI: string = process.env.NODE_ENV === 'test' 
    ? (process.env.TEST_MONGODB_URI || "your_default_test_mongodb_uri")
    : (process.env.MONGODB_URI || "your_default_mongodb_uri");

export default {
    MONGODB_URI,
    PORT
};