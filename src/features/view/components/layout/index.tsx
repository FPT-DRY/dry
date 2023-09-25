import FunctionBar from '@features/view/components/FunctionBar';
import Grid from '@features/view/components/Grid';
import Previewer from '@features/view/components/VideoPreviewer';
import CategoryService from '@features/view/service/categories';
import { SearchParams } from 'api';
import cx from 'classnames';

export type LayoutMode = 'grid' | 'stack';

type Props = {
  fullSize?: boolean;
  searchParams: SearchParams;
};

export default async function DynamicViewLayout({
  fullSize,
  searchParams,
}: Props) {
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
      <FunctionBar
        categoryList={categories}
        title='Category'
        mode={mode}
        page={page}
      />
      <Layout>
        {videos.fill(0).map((video, idx) => (
          <Previewer key={idx} />
        ))}
      </Layout>
    </div>
  );
}
