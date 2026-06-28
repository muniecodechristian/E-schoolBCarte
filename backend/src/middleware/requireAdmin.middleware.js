export const requireSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "superadmin") {
      return res.status(403).json({ success: false, message: "Access denied: SuperAdmin only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requireStadiumAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "stadiumAdmin") {
      return res.status(403).json({ success: false, message: "Access denied: StadiumAdmin only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requireScanner = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "scanner") {
      return res.status(403).json({ success: false, message: "Access denied: Scanner only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const requireRolesofSuperAdminAndStadiumAdmin = (req, res, next) => {
  const allowedRoles = ["superadmin", "stadiumAdmin"];

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Non authentifié",
    });
  }

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: "Accès refusé : droits insuffisants",
    });
  }

  next();
};





export const requireStadiumAdminOrScanner = async (req, res, next) => {
  const allowedRoles = ["stadiumAdmin", "scanner"];
  const user = req.user;

  try {
    // Verification of identity and role presence in the authorized whitelist
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Accès refusé : Autorisation requise pour StadiumAdmin ou Scanner" 
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};