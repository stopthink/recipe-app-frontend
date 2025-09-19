import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CircleQuestionMark } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">
                Thank you for signing up!
              </CardTitle>
              <CardDescription>
                Please check your email to confirm your account before signing
                in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CircleQuestionMark />
                <AlertTitle>Don't see an email?</AlertTitle>
                <AlertDescription className="inline">
                  Check your spam folder, or{' '}
                  <Link href="/login/" className="link">
                    try logging in.
                  </Link>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
