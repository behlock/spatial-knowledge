import YouTube from 'react-youtube'

export const YouTubePlayer = () => {
  const opts = {
    width: '304',
    height: '185',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 0,
      modestbranding: 1,
    },
  }

  // const _onReady = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo()
  // }

  return <YouTube videoId="2g811Eo7K8U" opts={opts} />
}
