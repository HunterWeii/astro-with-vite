import {
  useQuery,
} from '@tanstack/react-query';

import { getConfig } from './api';
import { CONFIG_QUERY_KEY } from '@utils/queryKeys';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import BreakingNews from '@src/components/BreakingNews';
import Content from '@src/components/Content';
import BackgroundUpdate from '@src/components/BackgroundUpdate';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FootballFeed from '@src/containers/FootballFeed';
import MyFeed from '@containers/MyFeed';
import MySelector from '@containers/Selector';

export default function App() {
  const {
    isLoading,
    isError,
  } = useQuery({
    queryKey: CONFIG_QUERY_KEY,
    queryFn: getConfig,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error...</span>;

  return (
    <div>
      <BackgroundUpdate />
      <Header />
      <BreakingNews />
      <Content>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={FootballFeed}></Route>
            <Route path="/football" Component={FootballFeed}></Route>
            <Route path="/my-feed" Component={MyFeed}></Route>
            <Route path="/my-selector" Component={MySelector}></Route>
          </Routes>
        </BrowserRouter>
      </Content>
      <Footer />
    </div>
  )
}