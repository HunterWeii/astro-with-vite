import wait from "@src/utils/wait";
import { QueryFunctionContext } from "@tanstack/react-query";

function generateMyFeedItem() {
  const myFeeds = [];

  for (let i = 0; i < 15; i++) {
    myFeeds.push({
      id: Math.random().toString(16).slice(2),
      imageUrl: 'https://d3lbfr570u7hdr.cloudfront.net/stadiumastro/media/sa-images/2023/01-jan/31/lionel-messi-argentina-v-france-final-fifa-world-cup-qatar.jpg?ext=.jpg',
      title: 'Messi harap Maradona dapat lihat dirinya julang Piala Dunia',
      description: 'Lionel Messi berkata dia berharap Diego Maradona dapat menyampaikan trofi Piala Dunia kepada dirinya bulan lalu.',
      publishDate: Date.now(),
    })
  }

  return myFeeds;
}

export default async function getMyFeed({ pageParam }: QueryFunctionContext) {

  const myFeeds = pageParam === 10 ? [] : generateMyFeedItem();

  return wait(5000, myFeeds);
}