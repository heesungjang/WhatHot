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

- **Typescript**: for adding type definition to the project.

- **Styled-components** for styling.

- **React-Navigation**: to navigate between components, i used react-navigation library.

- **React-Query**: for state management and data fetching, i used react-query. Handling asynchronous http request with react-query made my code not only effective but easy to read.

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


### Landing page
https://user-images.githubusercontent.com/68782077/147947081-f47c4ded-75b9-4527-b90b-6ef0672d21af.mp4

### TV show section
https://user-images.githubusercontent.com/68782077/147947360-c6a0655c-ed0f-44af-98a7-a18e02e4b74a.mp4

### Search page
https://user-images.githubusercontent.com/68782077/147947503-9e74e6ad-c890-4b87-aa3a-847fbc0b9970.mp4



