import DynamicViewLayout from '@features/view/components/layout';
import { SearchParams } from 'api';

type Props = {
  searchParams: SearchParams;
};

export default function Index({ searchParams }: Props) {
  return (
    <>
      <DynamicViewLayout fullSize searchParams={searchParams} />
    </>
  );
}
