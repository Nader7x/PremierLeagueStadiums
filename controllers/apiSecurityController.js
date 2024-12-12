import jwt from 'jsonwebtoken';
import {GoogleAuth} from 'google-auth-library';

/**
 * Middleware function to authenticate a JWT token and check the user's role.
 * @param {string} requiredRole - The role required to access the route (e.g., 'admin', 'user').
 * @returns {function} - Middleware function to authenticate the token and check the role.
 */
const authenticateToken = (requiredRole) => (req, res, next) => {
    let token;
    // Check if the token is in the Authorization header
    const authorizationHeader = req.header('Authorization');
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        token = authorizationHeader.substring(7);
    }

    // If the token is not in the header, check the cookies
    if (!token) {
        token = req.cookies.token;
    }
    if (!token) {
        return res.status(401).json({message: 'Unauthorized: Missing token'});
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Check if the user's role matches the required role
        if (decoded.role === requiredRole) {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({message: 'Forbidden: Insufficient role'});
        }
    } catch (err) {
        console.log(err)
        res.status(401).json({
            message: 'Unauthorized: Invalid token',
            error: err.message
        });
    }
};

/**
 * Function to get an access token for Firebase Cloud Messaging (FCM).
 * @returns {Promise<string>} - The access token for FCM.
 */
async function getFcmAccessToken() {
    const auth = new GoogleAuth({
        keyFile: 'premier-noti-6028058f5902.json',
        scopes: ['https://www.googleapis.com/auth/firebase.messaging']
    });
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    return accessToken.token
}

export {authenticateToken, getFcmAccessToken};
