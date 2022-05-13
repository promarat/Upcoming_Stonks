export default interface Event {
  name: string
  short_description: string
  hero_url: string
  partner: {
      name: string
      logo_url: string
  }
  starts_at: Date
  ends_at: Date
}