'use client';
import { Button } from '@/components/ui/button';
import useResendVerifEmail from '@/hooks/api/auth/useResendVerifEmail';

const ResendVerifEmail = () => {
  const { resendVerifEmail } = useResendVerifEmail();
  return (
    <div>
      <Button
        type="submit"
        onClick={() => {
          resendVerifEmail();
        }}
      >
        resen
      </Button>
    </div>
  );
};

export default ResendVerifEmail;
