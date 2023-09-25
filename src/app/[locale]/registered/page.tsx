import AuthLayout from '@features/authentication/layout';
import UserService from '@features/authentication/services/user';
import { SearchParams } from 'api';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: SearchParams;
};

async function Registered({ searchParams }: Props) {
  const userId = searchParams['user-id'] as string | undefined;
  if (!userId) {
    redirect('/sign-up', RedirectType.replace);
  }
  const registeredUser = await UserService.getUserById(userId);

  return (
    <AuthLayout size='lg'>
      <div className='card w-full'>
        <h3 className='text-lg font-bold'>Welcome, {registeredUser.name}!</h3>
        <p>You have just registered successfully.</p>
        <p>
          Please check your verification email on{' '}
          <span className='text-blue-700 font-bold underline'>
            {registeredUser.email}
          </span>{' '}
          to active full account feature.
        </p>
      </div>
    </AuthLayout>
  );
}

export default Registered;
