// // backend/services/auth.service.ts
// // import { OAuth2Client, UserRefreshClient } from 'google-auth-library';

// import dotenv from 'dotenv';

// dotenv.config();

// const oAuth2Client = new OAuth2Client(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   'postmessage',
// );

// export const googleAuthService = async (code: string) => {
//   const { tokens } = await oAuth2Client.getToken(code);
//   return tokens;
// };

// export const googleRefreshTokenService = async (refreshToken: string) => {
//   const user = new UserRefreshClient(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     refreshToken,
//   );
//   const { credentials } = await user.refreshAccessToken();
//   return credentials;
// };
