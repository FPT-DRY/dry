import HomeLayout from '@features/home/components/layout';
import { SearchParams } from 'api';

type Props = {
  searchParams: SearchParams;
};

export default function Index({ searchParams }: Props) {
  return <HomeLayout fullSize searchParams={searchParams} />;
}
