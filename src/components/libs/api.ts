import { INews } from './types';

type ResponseType = {
  id: number;
  title: string;
  summary: string;
}[];

export async function getNews(): Promise<INews> {
  try {
    const resp = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
    const data: ResponseType = await resp.json();

    const AlineNews = data
      .map(({ summary }) => summary)
      .reduce(
        (acc, current) => {
          acc.news += current; // split all the news to one line
          return acc;
        },
        { news: '' }
      );
    return AlineNews;
  } catch (error) {
    return { news: error.toString() };
  }
}