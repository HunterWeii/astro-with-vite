import { useEffect, useState } from 'react';
import './index.scss';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import getFeed from './api';
import { CONFIG_QUERY_KEY } from '@utils/queryKeys';
import {
	Response,
	selectCategoryFootballPageConfig,
} from '@utils/selectors/configSelector';
import FeedItem from '@components/FeedItem';
import FeedItemSkeleton from '@components/FeedItem/FeedItemSkeleton';
import { useInView } from 'react-intersection-observer';

interface FootballConfigItem {
	id: string,
	text: string,
	listAPI: {
		desktopPageSize: number,
		path: string,
		queryParams: {
			language: string,
			siteId: string,
			type: string,
			article ?: string,
			video ?: string,
			field ?: string  
		}
	}
}

interface FootballConfig {
	tabs: {
		items: FootballConfigItem[]
	}
}

function generateSkeleton(count = 0) {
	const skeleton = [];
	for(let i = 0; i < count; i++) {
		skeleton.push(<FeedItemSkeleton key={i} />)
	}

	return skeleton;
}

export default function Feed() {
	const queryClient = useQueryClient();
	const response = queryClient.getQueryData<Response>(CONFIG_QUERY_KEY);

	const footballConfig: FootballConfig = selectCategoryFootballPageConfig(response);
	const [tab, setTabs] = useState<string>('news');
	const tabItem = footballConfig?.tabs?.items.find(item => item.id === tab);
	const metaData = tabItem?.listAPI;
	const itemCount = metaData?.desktopPageSize ?? 10;

	const {
		ref,
		inView
	} = useInView({
		threshold: 0
	});

	const {
		data,
		isError,
		isLoading,
		fetchNextPage,
		isFetchingNextPage,
		isFetching,
	} = useInfiniteQuery({
		queryFn: getFeed,
		queryKey: ['football', tab],
		getNextPageParam: (_, pages) => pages.length + 1,
		meta: metaData,
		refetchOnWindowFocus: false,
		retry: 0,
	});

	const pages = (data?.pages ?? []).flat();

	useEffect(() => {
		if (isError) return;
		if (inView && !isFetching) {
			console.log('in view...')
			fetchNextPage();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, isFetching, isError]);

	return (
		<div className='astro-feed'>
			<h1>Football</h1>
			<div className='astro-feed-tabs'>
				{
					footballConfig?.tabs?.items.map(item => {
						const onClick = () => setTabs(item.id);
						const cls = tab === item.id ? 'astro-feed-tabs__btn-selected' : '';			
						
						return (
							<button
								key={item.id}
								onClick={onClick}
								className={cls}
							>
								{item.text}
							</button>
						)
					})
				}
			</div>
			<section>
				<div>
					{
						isLoading ? generateSkeleton(itemCount) : pages?.map(page => {
							return (
								<FeedItem 
									key={page.id}
									title={page.title}
									description={page.description}
									dateTime={page.publishDate}
									imgURL={page.imageUrl}
								/>
							)
						})
					}
					{
						isFetchingNextPage ? generateSkeleton(itemCount) : null
					}
				</div>			
				<div>
					{ isError ? <span>Some error occur</span> : null }
				</div>
				<div ref={ref}></div>
				<button onClick={ () => fetchNextPage() }>Load More</button>
			</section>
		</div>
	)
}