import FunctionBar from '@features/home/components/FunctionBar';
import Grid from '@features/home/components/Grid';
import Previewer from '@features/home/components/VideoPreviewer';
import CategoryService from '@features/home/service/categories';
import { SearchParams } from 'api';
import cx from 'classnames';

export type LayoutMode = 'grid' | 'stack';

type Props = {
  fullSize?: boolean;
  searchParams: SearchParams;
};

export default async function HomeLayout({ fullSize, searchParams }: Props) {
  const mode = (searchParams?.mode as LayoutMode) || 'grid';
  const page = (searchParams.page as string) || '1';
  const categories = await CategoryService.getCategories();
  const videos = new Array(12);

  const Layout = mode === 'grid' ? Grid : 'div';

  return (
    <div
      className={cx({
        ['w-full h-full']: fullSize,
      })}
    >
      <FunctionBar categoryList={categories} mode={mode} page={page} />
      <Layout>
        {videos.fill(0).map((video, idx) => (
          <Previewer key={idx} />
        ))}
      </Layout>
    </div>
  );
}
