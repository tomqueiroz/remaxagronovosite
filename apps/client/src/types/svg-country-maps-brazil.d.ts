declare module '@svg-country-maps/brazil' {
  export type BrazilMapLocation = {
    id: string
    name: string
    path: string
  }

  export type BrazilMapData = {
    label: string
    viewBox: string
    locations: BrazilMapLocation[]
  }

  const brazilMap: BrazilMapData
  export default brazilMap
}
