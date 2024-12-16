const API_HOST = "https://qlodin-backend.onrender.com/api";
const USER_AUTH_ROUTES = `${API_HOST}/user/auth`

export const __endpoints = {
  auth: {
    login: `${USER_AUTH_ROUTES}/login`,
    register: `${USER_AUTH_ROUTES}/register`,
    registerVerify: `${USER_AUTH_ROUTES}/verify-email`,
    registerSetupProfile: `${USER_AUTH_ROUTES}/profile-setup`,
    resendResetCode: `${USER_AUTH_ROUTES}/resend-reset-code`,
  },
} as const;


/**
 * router.post('/register', registerUser);
router.post('/verify-email', verifyUserEmail );
router.post('/profile-setup', verifyUserToken, completeProfileSetup)
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/resend-reset-code', resendResetCode);
router.post('/reset-password', resetPassword);
 */