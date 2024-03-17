import asyncHandler from 'express-async-handler';


export const checkRole = (roles) => asyncHandler(async (req, res, next) => {
    // const user = await User.findById(req.user.id);  This is when we do real use case
    const { id, role } = req.body.user; 
    if (!id || !role) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (!roles.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    else{
        return res.status(200).json({ message: 'You have permission to perform this action' });
    }
    next();
});