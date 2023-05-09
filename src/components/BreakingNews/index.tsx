import './index.scss';

import { useQueryClient } from "@tanstack/react-query";
import { Response, selectGlobalConfig, selectHomePageConfig } from '@utils/selectors/configSelector';
import { CONFIG_QUERY_KEY } from '@utils/queryKeys';

interface GlobalConfig {
	globalNews: {
		title: string
	}
}

interface HomeConfig {
	breakingNews: {
		styles: {
			backgroundColor: string
		}
	}
}

export default function BreakingNews()	{
	const queryClient = useQueryClient();
	const response = queryClient.getQueryData<Response>(CONFIG_QUERY_KEY);
	
	if (response === undefined) return null;

	const globalConfig: GlobalConfig = selectGlobalConfig(response);
	const homeConfig: HomeConfig = selectHomePageConfig(response);

	if (!globalConfig?.globalNews) return null;
	
	const style = {
		backgroundColor: homeConfig?.breakingNews?.styles?.backgroundColor ?? '#fff',
	};
	
	return (
		<section className='astro-breaking-news' style={style}>
			this is breaking news
		</section>
	)
}