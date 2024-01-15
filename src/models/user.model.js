import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,//cloudinary URL
            required: true,
        },
        coverImage: {
            type: String,//cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Vedio"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        refreshToken: {
            type: String,

        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const AccessToken = "helloworld123"
const RefreshToken = "helloWorld123"

userSchema.methods.genrateAcessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            fullName: this.fullName
        },
        AccessToken,
        {
            expiresIn: "10d"
        }
    )
}

userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id
        },
        RefreshToken,
        {
            expiresIn: "1d"
        }
    )
}

export const User = mongoose.model('User', userSchema)