
const jwt = require('jsonwebtoken');

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
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.role === requiredRole) {
            req.user = decoded;
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Insufficient role' });
        }
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateToken;
