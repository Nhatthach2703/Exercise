exports.isAuthenticated = async (req, res, next) => {
    try {
        console.log('o day');
        if (req.cookies.username) {
            console.log('o day 22');
            next(); // User is authenticated, procceed to the next middleware
        } else {
            res.status(401).json({
                message: 'You are not authenticated. Please login or signup',
                nextSteps: {
                    login: 'users/login',
                    signup: 'users/signup'
        }})}
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}