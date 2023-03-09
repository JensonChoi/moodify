const SpotifyWebApi = require('spotify-web-api-node')

const AuthConfig = require('../config/auth')

const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.CLIENT_ID,
  clientSecret: AuthConfig.CLIENT_SECRET,
})

const MAX_SONGS_IN_PLAYLIST = 20

let access_token = null

// fetches a new token
const fetchNewToken = (callback) => {
  console.log('Fetching new token')
  spotifyApi
    .clientCredentialsGrant()
    .then((data) => {
      access_token = data.body['access_token']
      const expires_in = data.body['expires_in']
      spotifyApi.setAccessToken(access_token)
      callback && callback(access_token)
      setTimeout(() => {
        fetchNewToken()
      }, (expires_in - 10 * 60) * 1000) // refresh it in expires_in - 10 min
    })
    .catch((e) => {
      console.error('fetchNewToken > Error fetching new token', e)
    })
}

// returns a new token or the cached one if still valid
const getToken = (callback) => {
  if (access_token !== null) {
    callback && callback(access_token)
  } else {
    fetchNewToken(callback)
  }
}

exports.generatePlaylist = async (req, res) => {
  const { mood } = req.body
  getToken(() => {
    // get recommendations from songs
    spotifyApi
      .getRecommendations({
        seed_genres: mood,
        limit: MAX_SONGS_IN_PLAYLIST,
      })
      .then(
        (data) => {
          let recommendations = data.body
          res.status(200).json({ tracks: recommendations.tracks })
        },
        (err) => {
          res.status(500).json({ error: err })
        }
      )
  })
}
