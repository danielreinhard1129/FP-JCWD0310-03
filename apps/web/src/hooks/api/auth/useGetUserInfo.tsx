// /* eslint-disable react-hooks/rules-of-hooks */
// 'use client';
// // import useGoogleLogin from './useGoogleLogin';
// import { axiosInstance } from '@/lib/axios';
// import { useGoogleLogin } from '@react-oauth/google';

// export default function useLoginByGoogle() {
//   const googleLogin = useGoogleLogin({
//     onSuccess: async (codeResponse) => {
//       console.log('ini coderesponse', codeResponse);

//       const tokens = await axiosInstance.post('/auth/google', {
//         // http://localhost:3001/auth/google backend that will exchange the code
//         code: codeResponse.code,
//       });
//     },
//     flow: 'auth-code',
//   });
//   return { googleLogin };
// }
