# WhatHot

**Whathot** is an mobile application built with react-native and thus, supported for both android and ios environment.


Installation && run
```bash
npm install
```

```bash
npm run ios
```

## What did i use?

- **Typescript**: for adding type definition to the project

- **Styled-components** for styling.

- **React-Navigation**: to achieve navigation between components, i used react-navigation library. setting up stack navigation and tab navigation and integrating them together using react-navigation was an amazing experience.

- **React-Query**: for state management and data fetching, i used react-query. Handling asynchronous http request with react-query made my code effective and easy to read.

### :confused: Before React-Query

```typescript
const [refreshing, setRefreshing] = useState(false);
const [loading, setLoading] = useState(true);
const [nowPlaying, setNowPlaying] = useState([]);
const [upcoming, setUpcoming] = useState([]);
const [trending, setTrending] = useState([]);
const getTrending = async () => {
const { results } = await (
  await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setUpcoming(results);
  };
const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
      )
    ).json();
    setNowPlaying(results);
  };
const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

useEffect(() => {
    getData();
  }, []);
```

### :smile: After React-Query


```typescript
const queryClient = useQueryClient();
const [refreshing, setRefreshing] = useState(false);
const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    ["movies", "nowPlaying"],
    moviesApi.nowPlaying
  );
const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    ["movies", "upcoming"],
    moviesApi.upcoming
  );
const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["movies", "trending"],
    moviesApi.trending
  );
```
