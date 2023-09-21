import AuthLayout from '@features/authentication/layout';
import { http } from '@lib/http';
import { UserResponse } from 'model/user';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

async function getRegisteredUser(userId: string) {
  return await http('GET')<UserResponse>(`/api/users/${userId}`);
  // return response.data;
}

async function Registered({ searchParams }: Props) {
  const userId = searchParams['user-id'] as string | undefined;
  if (!userId) {
    redirect('/sign-up', RedirectType.replace);
  }
  const registeredUser = await getRegisteredUser(userId);

  return (
    <AuthLayout>
      <div className='card'>
        <p>{registeredUser.name}</p>
      </div>
    </AuthLayout>
  );
}

export default Registered;
