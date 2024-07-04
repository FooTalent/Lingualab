import passport from "passport";
import Service from "../modules/users/logic/service.js";

const usersService = new Service()

// ? AUTH JWT BEARER - PASSPORT
export const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'TEACHER', 'STUDENT', 'ADMIN']
  return async (req, res, next) => {
    try {
      passport.authenticate('jwt', {session: false}, async function (err, user, info) {
        if (err) next(err)
        if (user) {
          const newuser = await usersService.getBy({_id: user.id})
          req.user = newuser
        }
        if(policies[0] === 'PUBLIC') return next();

        if (!user) return res.sendUserUnAuthorized('Invalid token')

        if(user.role.toUpperCase() === 'ADMIN') return next();
        if(!policies.includes(user.role.toUpperCase())) return res.sendUserForbidden('User not authorized')
        next();
      })(req, res, next);      
    } catch (error) {
      req.logger.error(error);
      next(error)
    }
  };
};