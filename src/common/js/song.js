
// import { Base64 } from 'js-base64'
// import { resolve } from 'dns'
// import { reject } from 'when'

export default class Song {
  constructor ({ id, mid, author, title, album, duration, pic }) {
    this.id = id
    this.mid = mid
    this.author = author
    this.title = title
    this.album = album
    this.duration = duration
    this.pic = pic
  }
}

export function createSong (musicData) { // 对数据进行一层封装转化，good
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    author: filterSinger(musicData.singer),
    title: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
  })
}

export function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
