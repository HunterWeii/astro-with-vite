import { useInfiniteQuery, } from "@tanstack/react-query"
import getMyFeed from "./api";
import FeedItemSkeleton from '@components/FeedItem/FeedItemSkeleton';
import FeedItem from "@src/components/FeedItem";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function generateSkeleton(count = 0) {
	const skeleton = [];
	for(let i = 0; i < count; i++) {
		skeleton.push(<FeedItemSkeleton key={i} />)
	}

	return skeleton;
}

export default function MyFeed() {
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    isFetching
  } = useInfiniteQuery({
    queryKey: ['myfeed'],
    queryFn: getMyFeed,
    refetchOnWindowFocus: false,
    getNextPageParam: (_, pages) => {
      const lastPage = pages.at(-1);
      if ((lastPage as []).length === 0) {
        return undefined;
      }
      return (pages as []).length + 1;
    },
    staleTime: 0
  });

  useEffect(() => {
    if (isError) return;
    if (inView && !isFetching) {
      console.log('fetching next pages...');
      fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isError, isFetching]);

  const pages = (data?.pages ?? []).flat();

  if (isError) {
    return <div>Opps something went wrong...</div>
  }

  return (
    <div>
      <div>
        {
          isLoading ? generateSkeleton(15) : pages.map(page => {
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
      </div>
      { isFetchingNextPage ? generateSkeleton(15) : null }
      <div ref={ref}></div>
    </div>
  )
}