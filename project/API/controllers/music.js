const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./data/db.json');
const db = lowdb(adapter);

const {
  isAppOnlyToken,
  hasRequiredDelegatedPermissions,
  hasRequiredApplicationPermissions
} = require('../auth/permissionUtils');

const authConfig = require('../authConfig');

exports.getMusicLink = (req, res, next) => {
    if (isAppOnlyToken(req.authInfo)) {
        if (hasRequiredApplicationPermissions(req.authInfo, authConfig.protectedRoutes.music.applicationPermissions.read)) {
            try {
                const musicLink = db.get('musicLink').value();
                res.status(200).send({ musicLink });
            } catch (error) {
                next(error);
            }
        } else {
            next(new Error('Application does not have the required permissions'));
        }
    } else {
        if (hasRequiredDelegatedPermissions(req.authInfo, authConfig.protectedRoutes.music.delegatedPermissions.read)) {
            try {
                const musicLink = db.get('musicLink').value();
                res.status(200).send({ musicLink });
            } catch (error) {
                next(error);
            }
        } else {
            next(new Error('User does not have the required permissions'));
        }
    }
};

exports.updateMusicLink = (req, res, next) => {
    if (hasRequiredDelegatedPermissions(req.authInfo, authConfig.protectedRoutes.music.delegatedPermissions.write)
        || hasRequiredApplicationPermissions(req.authInfo, authConfig.protectedRoutes.music.applicationPermissions.write)) {
        try {
            const newLink = req.body.musicLink;
            db.set('musicLink', newLink).write();
            res.status(200).json({ message: 'Music link updated successfully', musicLink: newLink });
        } catch (error) {
            next(error);
        }
    } else {
        next(new Error('User or application does not have the required permissions'));
    }
};
