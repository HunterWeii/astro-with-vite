import convertQueryParams from "@src/utils/convertQueryParams";
import { QueryFunctionContext } from "@tanstack/react-query";

type QueryParams = {
	language: string,
	siteId: string,
	type: string,
	article ?: string,
	video ?: string,
	field ?: string  
}

interface ResponseDataItem {
	id: string | number,
	imageUrl: string,
	title: string,
	description: string,
	publishDate: string,
}

interface ResponseData {
	response: ResponseDataItem[]
}

const API = 'https://dce-vortals-api-stg.eco.astro.com.my/';

export default async function getFeed({ signal, pageParam, meta }: QueryFunctionContext) {
	try {
		const queryParams = convertQueryParams({
			pageNumber: pageParam ?? 1,
			pageSize: meta?.desktopPageSize ?? 15,
			...meta?.queryParams as QueryParams
		});

		const api = encodeURI(`${API}${meta?.path}${queryParams}`);

		const response = await fetch(api, {
			signal
		});

		if (response.status !== 200) throw new Error('network error');

		const responseData: ResponseData = await response.json();

		return responseData?.response ?? [];
	} catch(error) {
		return Promise.reject(error);
	}
}