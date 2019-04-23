export default class Singer {
  constructor ({ id, name }) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
export function createSinger (singer) { // 对数据进行一层封装转化，good
  return {
    id: singer.singer_mid,
    desc: singer.total,
    author: singer.singer_name,
    picUrl: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singer.singer_mid}.jpg?max_age=2592000`
  }
}
