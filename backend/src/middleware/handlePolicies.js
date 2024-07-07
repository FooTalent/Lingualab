import passport from "passport";
import Service from "../modules/users/logic/service.js";

const usersService = new Service()

// ? AUTH JWT BEARER - PASSPORT
export const handleAuth = (policies) => {
  // Policies => ['PUBLIC', 'TEACHER', 'STUDENT', 'ADMIN']
  return async (req, res, next) => {
    passport.authenticate('jwt', {session: false}, async function (err, user, info) {
      if (err) next(err)
      if (user) {
        const newuser = await usersService.getBy({_id: user.id})
        req.user = newuser
      }
      if(policies[0] === 'PUBLIC') return next();

      if (!user) return res.sendUserUnAuthorized('Token Invalido')

      if(user.role.toUpperCase() === 'ADMIN') return next();
      if(!policies.includes(user.role.toUpperCase())) return res.sendUserForbidden('Usuario no Autorizado')
      next();
    })(req, res, next);      
  };
};

export const isPublic = ["PUBLIC"]
export const users    = ["TEACHER", "STUDENT"]
export const clients  = ["TEACHER"]
