export const checkAccesLeagueCode = async (req, res, next) => {
  try {
    const accessCode = req.body?.accessCode;


    console.log(req.body);
    

    if (!accessCode) {
      return res.status(403).json({
        success: false,
        message: "Écrivez le code d'accès",
      });
    }

    if (accessCode !== process.env.APP_SECRET_PASS) {
      return res.status(403).json({
        success: false,
        message: "Le code est invalide",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};